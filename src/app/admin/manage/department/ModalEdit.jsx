import React, { useState } from "react";
import {
    Button as NextButton,
    Tooltip
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
    Input,
    FormLabel,
    Button,
    useDisclosure,
    useToast
} from '@chakra-ui/react'
import { EditIcon } from "@/components/EditIcon";
import axios from "axios";

export default function ModalEdit({ id, name, onDataUpdate }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [department, setDepartment] = useState(name);
    const toast = useToast();

    const handleConfirmSave = () => {
        // สร้างข้อมูลที่จะส่งไปยัง API
        const data = {
            id: id,
            name: department,
        };

        axios.patch('/api/admin/department', data, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                if (response.data.status === "success") {
                    onClose();
                    toast({
                        title: 'Success',
                        description: "Department has been saved.",
                        status: 'success',
                        duration: 9000,
                        isClosable: true,
                    })
                    onDataUpdate();
                } else {
                    toast({
                        title: 'Error',
                        description: "Failed to save department.",
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
                    description: "Failed to save department.",
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
                    <ModalHeader>Edit Department</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>ID</FormLabel>
                            <Input
                                isReadOnly
                                value={id}
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Name</FormLabel>
                            <Input
                                required
                                defaultValue={name}
                                onChange={(event) => setDepartment(event.target.value)}
                            />
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