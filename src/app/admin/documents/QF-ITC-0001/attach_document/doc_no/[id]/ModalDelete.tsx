import React from "react";
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
import { DeleteIcon } from "@/components/icon/DeleteIcon";
import axios from "axios";

export default function ModalDelete(data: any) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const handleConfirmDelete = () => {
        axios.delete('/api/admin/documents/QF-ITC-0001/attach_document/doc_no/action', {
            data: {
                id: data?.id
            },
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                if (response.data.status === "success") {
                    toast({
                        title: 'Success',
                        description: "Document has been delete.",
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                    })
                    data.fetchData();
                } else {
                    toast({
                        title: 'Error',
                        description: "Failed to delete document.",
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
                    description: "Failed to delete document name.",
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
        <div className="ms-auto">
            <Tooltip content="Delete Attach Document" color="danger">
                <NextButton isIconOnly variant="light" onClick={onOpen} className="w-10">
                    <DeleteIcon className="text-lg text-red-500" />
                </NextButton>
            </Tooltip>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                isCentered
                closeOnOverlayClick={false}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Delete Attach Document</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        Are you sure you want to delete this document?
                        This action cannot be undone.
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => handleConfirmDelete()} colorScheme='green' className="me-2">Delete</Button>
                        <Button onClick={onClose} colorScheme='red'>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}