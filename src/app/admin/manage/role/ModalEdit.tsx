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
import { EditIcon } from "@/components/icon/EditIcon";
import axios from "axios";

export default function ModalEdit({ id, name, onDataUpdate }: { id: number, name: string, onDataUpdate: any }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [role, setrole] = useState(name);
    const toast = useToast();

    const handleConfirmSave = () => {
        // สร้างข้อมูลที่จะส่งไปยัง API
        const data = {
            id: id,
            name: role,
        };

        axios.patch('/api/admin/role', data, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                if (response.data.status === "success") {
                    onClose();
                    toast({
                        title: 'Success',
                        description: "Role has been saved.",
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                    })
                    onDataUpdate();
                } else {
                    toast({
                        title: 'Error',
                        description: "Failed to save role.",
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
                    description: "Failed to save role.",
                    status: 'error',
                    duration: 3000,
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
            <Tooltip content="View" color="warning">
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
                    <ModalHeader>Edit role</ModalHeader>
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
                                onChange={(event) => setrole(event.target.value)}
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