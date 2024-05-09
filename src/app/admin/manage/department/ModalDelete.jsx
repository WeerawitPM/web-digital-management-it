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
    Button,
    useDisclosure,
    useToast
} from '@chakra-ui/react'
import { DeleteIcon } from "@/components/DeleteIcon";
import axios from "axios";

export default function ModalDelete({ id, onDataDelete }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const handleConfirmDelete = () => {
        axios.delete('/api/admin/department', {
            data: {
                id: id
            },
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                if (response.data.status === "success") {
                    onClose();
                    toast({
                        title: 'Success',
                        description: "Department has been delete.",
                        status: 'success',
                        duration: 9000,
                        isClosable: true,
                    })
                    onDataDelete();
                } else {
                    toast({
                        title: 'Error',
                        description: "Failed to delete department.",
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
                    description: "Failed to delete department.",
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
            <Tooltip content="Delete" color="danger">
                <NextButton isIconOnly variant="light" onClick={onOpen} className=" w-10">
                    <DeleteIcon className="text-lg text-red-500" />
                </NextButton>
            </Tooltip>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                isCentered
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Delete department</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        Are you sure you want to delete this department?
                        This action cannot be undone.
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => handleConfirmDelete()} colorScheme='green' className="me-2">Delete</Button>
                        <Button onClick={onClose} colorScheme='red'>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}