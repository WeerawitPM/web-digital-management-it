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
import { Button as NextButton, Input } from "@nextui-org/react";
import { EyeFilledIcon } from "@/components/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/components/EyeSlashFilledIcon";
import { useForm } from "react-hook-form"; //ง่ายต่อการดึงข้อมูลจากฟอร์ม
import axios from "axios";

export default function ModalAdd({ fetchData }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [company, setCompany] = useState();
    const [department, setDepartment] = useState();
    const [user, setuser] = useState();
    const [role, setRole] = useState();
    const toast = useToast();
    const { register, handleSubmit } = useForm();

    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const [isVisible2, setIsVisible2] = useState(false);
    const toggleVisibility2 = () => setIsVisible2(!isVisible2);


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
            setuser(data.user);
            setRole(data.role);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleConfirmSave = () => {
        // สร้างข้อมูลที่จะส่งไปยัง API
        const data = {
            name: user,
        };

        axios.post('/api/admin/user', data, {
            headers: {
                'Content-Type': 'application/json',
            }
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
                    description: "Failed to save user.",
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
                    <ModalBody pb={6}>
                        <FormControl mt={4}>
                            <FormLabel>Email</FormLabel>
                            <Input
                                variant="bordered"
                                required
                                type="email"
                                placeholder="Email"
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Username</FormLabel>
                            <Input
                                variant="bordered"
                                required
                                placeholder="Username"
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <div className="flex flex-row gap-3">
                                <div>
                                    <FormLabel>Password</FormLabel>
                                    <Input
                                        required
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
                                    />
                                </div>
                                <div>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <Input
                                        required
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
                                        required
                                        placeholder="Firstname"
                                    />
                                </div>
                                <div>
                                    <FormLabel>Lastname</FormLabel>
                                    <Input
                                        variant="bordered"
                                        required
                                        placeholder="Lastname"
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
                                        required
                                        placeholder="Emp ID"
                                    />
                                </div>
                                <div>
                                    <FormLabel>Tel</FormLabel>
                                    <Input
                                        variant="bordered"
                                        required
                                        placeholder="Tel"
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
                                        {...register("company", { required: true })}
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
                                        {...register("department", { required: true })}
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
                                    <FormLabel>user</FormLabel>
                                    <Select
                                        placeholder='Select option'
                                        isRequired
                                        {...register("user", { required: true })}
                                    >
                                        {user && user.map((item) => (
                                            <option key={item.id} value={item.id}>{item.name}</option>
                                        ))}
                                    </Select>
                                </div>
                                <div className="w-full">
                                    <FormLabel>Role</FormLabel>
                                    <Select
                                        placeholder='Select option'
                                        isRequired
                                        {...register("role", { required: true })}
                                    >
                                        {role && role.map((item) => (
                                            <option key={item.id} value={item.id}>{item.name}</option>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={() => handleConfirmSave()} colorScheme='green' className="me-2">Save</Button>
                        <Button onClick={onClose} colorScheme='red'>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}