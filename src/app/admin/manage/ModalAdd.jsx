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
import { AddIcon } from "@chakra-ui/icons";
import axios from "axios";
import { redirect } from "next/navigation";

export default function ModalAdd() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [companyName, setCompanyName] = useState();
    const toast = useToast();

    const handleConfirmSave = () => {
        // สร้างข้อมูลที่จะส่งไปยัง API
        const data = {
            name: companyName,
        };

        axios.post('/api/admin/company', data, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                if (response.data.status === "success") {
                    onClose();
                    toast({
                        title: 'Success',
                        description: "Company name has been saved.",
                        status: 'success',
                        duration: 9000,
                        isClosable: true,
                    })
                    location.reload();
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
                    description: "Failed to save company name.",
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
            <Button colorScheme="blue" leftIcon={<AddIcon />} size='sm' onClick={onOpen}>
                เพิ่มรายการร้องขอ
            </Button>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                isCentered
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Company</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl mt={4}>
                            <FormLabel>Name</FormLabel>
                            <Input
                                required
                                onChange={(event) => setCompanyName(event.target.value)}
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