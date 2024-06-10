import React, { useState, useEffect, useRef } from "react";
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
import { EyeFilledIcon } from "@/components/icon/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/components/icon/EyeSlashFilledIcon";
import { useForm } from "react-hook-form"; //ง่ายต่อการดึงข้อมูลจากฟอร์ม
import axios from "axios";

export default function ModalAdd({ fetchData }: { fetchData: any }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [company, setCompany] = useState<any>();
    const [department, setDepartment] = useState<any>();
    const [position, setPosition] = useState<any>();
    const [role, setRole] = useState<any>();
    const toast = useToast();
    const { register, handleSubmit } = useForm();

    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const [isVisible2, setIsVisible2] = useState(false);
    const toggleVisibility2 = () => setIsVisible2(!isVisible2);

    const [file, setFile] = useState<any>(null);
    const [license, setLicense] = useState<any>(null);

    useEffect(() => {
        fetchFormData();
    }, []);

    const fetchFormData = async () => {
        try {
            const response = await axios.get('/api/admin/user/form'); // เรียกใช้งาน API ที่เส้นทาง '/api'
            if (response.status !== 200) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.data;
            setCompany(data.company);
            setDepartment(data.department);
            setPosition(data.position);
            setRole(data.role);
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
            const data = new FormData();

            data.append('email', formData.email);
            data.append('username', formData.username);
            data.append('password', formData.password);
            data.append('firstname', formData.firstname);
            data.append('lastname', formData.lastname);
            data.append('tel', formData.tel);
            data.append('image', file);
            data.append('license', license);
            data.append('role_id', formData.role_id);
            data.append('emp_id', formData.emp_id);
            data.append('company_id', formData.company_id);
            data.append('department_id', formData.department_id);
            data.append('position_id', formData.position_id);
            data.append('user_status_id', "1");

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
                            duration: 3000,
                            isClosable: true,
                        })
                        fetchData();
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
                        description: error,
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
                closeOnOverlayClick={false}
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
                                            type="number"
                                            {...register("emp_id", { required: true })}
                                        />
                                    </div>
                                    <div>
                                        <FormLabel>Tel</FormLabel>
                                        <Input
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
                                    onChange={({ target }) => {
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