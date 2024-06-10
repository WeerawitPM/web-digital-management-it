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
import { EditIcon } from "@/components/icon/EditIcon";
import { EyeFilledIcon } from "@/components/icon/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/components/icon/EyeSlashFilledIcon";
import axios from "axios";
import { useForm } from "react-hook-form"; //ง่ายต่อการดึงข้อมูลจากฟอร์ม
import Image from "next/image";

export default function ModalEdit(data: any) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [company, setCompany] = useState<any>();
    const [department, setDepartment] = useState<any>();
    const [position, setPosition] = useState<any>();
    const [role, setRole] = useState<any>();
    const [status, setStatus] = useState<any>();

    const toast = useToast();
    const { register, handleSubmit } = useForm();

    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const [isVisible2, setIsVisible2] = useState(false);
    const toggleVisibility2 = () => setIsVisible2(!isVisible2);

    const [file, setFile] = useState<any>(null);
    const [license, setLicense] = useState<any>();

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
            setStatus(data.user_status);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleConfirmSave = (formData: any) => {

        if (formData.password != formData.confirmPassword) {
            toast({
                title: 'Warning',
                description: "Password not match.",
                status: 'warning',
                duration: 3000,
                isClosable: true,
            })
        } else {
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
            dataForm.append('license', license);
            dataForm.append('role_id', formData.role_id);
            dataForm.append('emp_id', formData.emp_id);
            dataForm.append('company_id', formData.company_id);
            dataForm.append('department_id', formData.department_id);
            dataForm.append('position_id', formData.position_id);
            dataForm.append('user_status_id', formData.user_status_id);

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
                            duration: 3000,
                            isClosable: true,
                        })
                        data.onDataUpdate();
                    } else {
                        toast({
                            title: 'Error',
                            description: response.data.message,
                            status: 'error',
                            duration: 3000,
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
                        duration: 3000,
                        isClosable: true,
                    })
                })
                .finally(() => {
                    onClose();
                });
        }
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
                closeOnOverlayClick={false}
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
                            <div className="flex">
                                <Image
                                    src={!data.image || data.image === "" ? "/images/userProfile/user.png" : data.image + "?timestamp=" + Date.now()}
                                    width={150}
                                    height={150}
                                    className="mx-auto rounded-full text-center"
                                    alt={data.username}
                                />
                            </div>
                            <div className="w-full">
                                <FormLabel>Status</FormLabel>
                                <Select
                                    defaultValue={data.user_status}
                                    placeholder='Select option'
                                    isRequired
                                    {...register("user_status_id", { required: true })}
                                >
                                    {status && status.map((item: any) => (
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
                                            {...register("confirmPassword", { required: true })}
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
                                            defaultValue={data.emp_id}
                                            variant="bordered"
                                            isRequired
                                            placeholder="Emp ID"
                                            type="number"
                                            {...register("emp_id", { required: true })}
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
                                            {...register("company_id", { required: true })}
                                        >
                                            {company && company.map((item: any) => (
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
                                            {...register("department_id", { required: true })}
                                        >
                                            {department && department.map((item: any) => (
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
                                            {...register("position_id", { required: true })}
                                        >
                                            {position && position.map((item: any) => (
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
                                            {...register("role_id", { required: true })}
                                        >
                                            {role && role.map((item: any) => (
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
                            <FormControl mt={4}>
                                <FormLabel>License</FormLabel>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="file-input file-input-bordered file-input-sm w-full max-w-xs"
                                    onChange={({ target }: { target: any }) => {
                                        if (target.files) {
                                            const file = target.files[0];
                                            setLicense(file);
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