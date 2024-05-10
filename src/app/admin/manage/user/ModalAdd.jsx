import React, { useState, useEffect } from "react";
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
    useDisclosure,
    useToast,
    Button,
    Select
} from '@chakra-ui/react'
import { AddIcon } from "@chakra-ui/icons";
import { Button as NextButton, Input, image } from "@nextui-org/react";
import { EyeFilledIcon } from "@/components/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/components/EyeSlashFilledIcon";
import { useForm } from "react-hook-form"; //ง่ายต่อการดึงข้อมูลจากฟอร์ม
import axios from "axios";

export default function ModalAdd({ fetchData }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [company, setCompany] = useState();
    const [department, setDepartment] = useState();
    const [position, setPosition] = useState();
    const [role, setRole] = useState();
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
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleConfirmSave = (formData) => {
        // สร้างข้อมูลที่จะส่งไปยัง API
        const data = new FormData();

        data.append('email', formData.email);
        data.append('username', formData.username);
        data.append('password', formData.password);
        data.append('firstname', formData.firstname);
        data.append('lastname', formData.lastname);
        data.append('tel', formData.tel);
        data.append('image', file);
        // data.append('license', "");
        data.append('roleId', formData.roleId);
        data.append('empId', formData.empId);
        data.append('companyId', formData.companyId);
        data.append('departmentId', formData.departmentId);
        data.append('positionId', formData.positionId);
        data.append('status', 1);

        axios.post('/api/admin/user', data, {
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
                    fetchData();
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
                    description: response.data.message,
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
            <NextButton
                onClick={onOpen}
                isIconOnly
                color="primary"
                size="lg"
                className="rounded-full fixed bottom-4 right-4 z-10"
            >
                <AddIcon />
            </NextButton>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                isCentered
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add user</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleSubmit(handleConfirmSave)}>
                        <ModalBody pb={6}>
                            <FormControl mt={4}>
                                <FormLabel>Email</FormLabel>
                                <Input
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
                                            variant="bordered"
                                            isRequired
                                            placeholder="Firstname"
                                            {...register("firstname", { required: true })}
                                        />
                                    </div>
                                    <div>
                                        <FormLabel>Lastname</FormLabel>
                                        <Input
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
                                            variant="bordered"
                                            isRequired
                                            placeholder="Emp ID"
                                            {...register("empId", { required: true })}
                                        />
                                    </div>
                                    <div>
                                        <FormLabel>Tel</FormLabel>
                                        <Input
                                            variant="bordered"
                                            isRequired
                                            placeholder="Tel"
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
                                    required
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