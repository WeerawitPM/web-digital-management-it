import React, { useState } from "react";
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
    useDisclosure,
    useToast,
    Button
} from '@chakra-ui/react'
import { AddIcon } from "@chakra-ui/icons";
import { Button as NextButton } from "@nextui-org/react";
import axios from "axios";

export default function ModalAdd({ fetchData }: { fetchData: any }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [department, setDepartment] = useState("");
    const toast = useToast();

    const handleConfirmSave = () => {
        // สร้างข้อมูลที่จะส่งไปยัง API
        const data = {
            name: department,
        };

        axios.post('/api/admin/department', data, {
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
                    description: "Failed to save department.",
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                })
            })
            .finally(() => {
                onClose();
            });
    }

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
                    <ModalHeader>Add department</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl mt={4}>
                            <FormLabel>Name</FormLabel>
                            <Input
                                required
                                onChange={(event) => setDepartment(event.target.value)}
                                placeholder="Department Name"
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