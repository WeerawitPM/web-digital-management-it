import React, { useState, useEffect } from "react";
import {
    Button as NextButton,
    Tooltip,
    Input
} from "@nextui-org/react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Button,
    useDisclosure,
    useToast,
    Select
} from '@chakra-ui/react'
import { EditIcon } from "@/components/EditIcon";
import { EyeFilledIcon } from "@/components/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/components/EyeSlashFilledIcon";
import axios from "axios";
import { useForm } from "react-hook-form"; //ง่ายต่อการดึงข้อมูลจากฟอร์ม
import Image from "next/image";

export default function ModalEdit(data) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [company, setCompany] = useState();
    const [department, setDepartment] = useState();
    const [position, setPosition] = useState();
    const [role, setRole] = useState();
    const [status, setStatus] = useState();

    const toast = useToast();
    const { register, handleSubmit } = useForm();

    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const [isVisible2, setIsVisible2] = useState(false);
    const toggleVisibility2 = () => setIsVisible2(!isVisible2);

    const [file, setFile] = useState();

    useEffect(() => {
        // เรียกใช้งาน API เพื่อดึงข้อมูล
        fetchFormData();
    }, []);

    const fetchFormData = async () => {
        try {
            const response = await axios.get('/api/admin/user/form'); // เรียกใช้งาน API ที่เส้นทาง '/api'
            if (response.status !== 200) {
                throw new Error('Failed to fetch data');
            }
            const data = response.data;
            setCompany(data.company);
            setDepartment(data.department);
            setPosition(data.position);
            setRole(data.role);
            setStatus(data.status);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleConfirmSave = (formData) => {
        // สร้างข้อมูลที่จะส่งไปยัง API
        const dataForm = new FormData();

        dataForm.append('id', data.id);
        dataForm.append('email', formData.email);
        dataForm.append('username', formData.username);
        dataForm.append('password', formData.password);
        dataForm.append('firstname', formData.firstname);
        dataForm.append('lastname', formData.lastname);
        dataForm.append('tel', formData.tel);
        dataForm.append('image', file);
        // data.append('license', "");
        dataForm.append('roleId', formData.roleId);
        dataForm.append('empId', formData.empId);
        dataForm.append('companyId', formData.companyId);
        dataForm.append('departmentId', formData.departmentId);
        dataForm.append('positionId', formData.positionId);
        dataForm.append('statusId', formData.statusId);

        axios.patch('/api/admin/user', dataForm, {
            // headers: {
            //     'Content-Type': 'application/json',
            // }
        })
            .then(response => {
                if (response.data.status === "success") {
                    onClose();
                    toast({
                        title: 'Success',
                        description: "User has been saved.",
                        status: 'success',
                        duration: 9000,
                        isClosable: true,
                    })
                    data.onDataUpdate();
                } else {
                    toast({
                        title: 'Error',
                        description: response.data.message,
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                    })
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                toast({
                    title: 'Error',
                    description: "Something went wrong",
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
            })
            .finally(() => {
                onClose();
            });
    }

    // Global error handling
    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            console.error('Error fetching data:', error);
            return Promise.reject(error);
        }
    );

    return (
        <>
            <Tooltip content="Edit" color="warning">
                <NextButton isIconOnly variant="light" onClick={onOpen} className=" w-10">
                    <EditIcon className="text-lg text-yellow-500" />
                </NextButton>
            </Tooltip>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                isCentered
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit user</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleSubmit(handleConfirmSave)}>
                        <ModalBody pb={6}>
                            <Image
                                src={!data.image || data.image === "" ? "/images/userProfile/user.png" : data.image}
                                width={150}
                                height={150}
                                className="mx-auto rounded-full text-center"
                                alt={data.username}
                            />
                            <div className="w-full">
                                <FormLabel>Status</FormLabel>
                                <Select
                                    defaultValue={data.status}
                                    placeholder='Select option'
                                    isRequired
                                    {...register("statusId", { required: true })}
                                >
                                    {status && status.map((item) => (
                                        <option key={item.id} value={item.id}>{item.name}</option>
                                    ))}
                                </Select>
                            </div>
                            <FormControl mt={4}>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    defaultValue={data.email}
                                    variant="bordered"
                                    isRequired
                                    type="email"
                                    placeholder="Email"
                                    {...register("email", { required: true })}
                                />
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Username</FormLabel>
                                <Input
                                    defaultValue={data.username}
                                    variant="bordered"
                                    isRequired
                                    placeholder="Username"
                                    {...register("username", { required: true })}
                                />
                            </FormControl>
                            <FormControl mt={4}>
                                <div className="flex flex-row gap-3">
                                    <div>
                                        <FormLabel>Password</FormLabel>
                                        <Input
                                            defaultValue={data.password}
                                            isRequired
                                            variant="bordered"
                                            placeholder="Password"
                                            endContent={
                                                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                                    {isVisible ? (
                                                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                                    ) : (
                                                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                                    )}
                                                </button>
                                            }
                                            type={isVisible ? "text" : "password"}
                                            {...register("password", { required: true })}
                                        />
                                    </div>
                                    <div>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <Input
                                            defaultValue={data.password}
                                            isRequired
                                            variant="bordered"
                                            placeholder="Confirm password"
                                            endContent={
                                                <button className="focus:outline-none" type="button" onClick={toggleVisibility2}>
                                                    {isVisible2 ? (
                                                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                                    ) : (
                                                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                                    )}
                                                </button>
                                            }
                                            type={isVisible2 ? "text" : "password"}
                                            {...register("confirmpassword", { required: true })}
                                        />
                                    </div>
                                </div>
                            </FormControl>
                            <FormControl mt={4}>
                                <div className="flex flex-row gap-3">
                                    <div>
                                        <FormLabel>Firstname</FormLabel>
                                        <Input
                                            defaultValue={data.firstname}
                                            variant="bordered"
                                            isRequired
                                            placeholder="Firstname"
                                            {...register("firstname", { required: true })}
                                        />
                                    </div>
                                    <div>
                                        <FormLabel>Lastname</FormLabel>
                                        <Input
                                            defaultValue={data.lastname}
                                            variant="bordered"
                                            isRequired
                                            placeholder="Lastname"
                                            {...register("lastname", { required: true })}
                                        />
                                    </div>
                                </div>
                            </FormControl>
                            <FormControl mt={4}>
                                <div className="flex flex-row gap-3">
                                    <div>
                                        <FormLabel>Emp ID</FormLabel>
                                        <Input
                                            defaultValue={data.empId}
                                            variant="bordered"
                                            isRequired
                                            placeholder="Emp ID"
                                            type="number"
                                            {...register("empId", { required: true })}
                                        />
                                    </div>
                                    <div>
                                        <FormLabel>Tel</FormLabel>
                                        <Input
                                            defaultValue={data.tel}
                                            variant="bordered"
                                            isRequired
                                            placeholder="Tel"
                                            type="number"
                                            {...register("tel", { required: true })}
                                        />
                                    </div>
                                </div>
                            </FormControl>
                            <FormControl mt={4}>
                                <div className="flex flex-row gap-3">
                                    <div className="w-full">
                                        <FormLabel>Company</FormLabel>
                                        <Select
                                            defaultValue={data.company}
                                            placeholder='Select option'
                                            isRequired
                                            {...register("companyId", { required: true })}
                                        >
                                            {company && company.map((item) => (
                                                <option key={item.id} value={item.id}>{item.name}</option>
                                            ))}
                                        </Select>
                                    </div>
                                    <div className="w-full">
                                        <FormLabel>Department</FormLabel>
                                        <Select
                                            defaultValue={data.department}
                                            placeholder='Select option'
                                            isRequired
                                            {...register("departmentId", { required: true })}
                                        >
                                            {department && department.map((item) => (
                                                <option key={item.id} value={item.id}>{item.name}</option>
                                            ))}
                                        </Select>
                                    </div>
                                </div>
                            </FormControl>
                            <FormControl mt={4}>
                                <div className="flex flex-row gap-3">
                                    <div className="w-full">
                                        <FormLabel>Position</FormLabel>
                                        <Select
                                            defaultValue={data.position}
                                            placeholder='Select option'
                                            isRequired
                                            {...register("positionId", { required: true })}
                                        >
                                            {position && position.map((item) => (
                                                <option key={item.id} value={item.id}>{item.name}</option>
                                            ))}
                                        </Select>
                                    </div>
                                    <div className="w-full">
                                        <FormLabel>Role</FormLabel>
                                        <Select
                                            defaultValue={data.role}
                                            placeholder='Select option'
                                            isRequired
                                            {...register("roleId", { required: true })}
                                        >
                                            {role && role.map((item) => (
                                                <option key={item.id} value={item.id}>{item.name}</option>
                                            ))}
                                        </Select>
                                    </div>
                                </div>
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Image</FormLabel>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="file-input file-input-bordered file-input-sm w-full max-w-xs"
                                    onChange={({ target }) => {
                                        if (target.files) {
                                            const file = target.files[0];
                                            setFile(file);
                                        }
                                    }}
                                />
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='green' className="me-2" type="submit">Save</Button>
                            <Button onClick={onClose} colorScheme='red'>Cancel</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal >
        </>
    )
}