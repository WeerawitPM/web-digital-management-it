import React, { useState, useEffect } from "react";
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
    Textarea,
    useToast
} from '@chakra-ui/react'
import { EditIcon } from "@/components/EditIcon";
import axios from "axios";
import Link from "next/link";

export default function ModalEditItem(data) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const [price, setPrice] = useState();

    const handleConfirmSave = () => {
        if (price === undefined) {
            toast({
                title: 'Warning',
                description: "Please fill price.",
                status: 'warning',
                duration: 9000,
                isClosable: true,
            })
        } else {
            const formData = new FormData();
            formData.append("id", data.id);
            formData.append("price", price);

            axios.patch('/api/admin/document/QF-ITC-0001/doc_no/attach_document', formData, {
                // headers: {
                //     'Content-Type': 'application/json',
                // }
            })
                .then(response => {
                    if (response.data.status === "success") {
                        toast({
                            title: 'Success',
                            description: "Document has been saved.",
                            status: 'success',
                            duration: 9000,
                            isClosable: true,
                        })
                        data.fetchData();
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
                        description: "Something went wrong",
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                    })
                })
                .finally(() => {
                    onClose();
                })
        }
    }

    return (
        <>
            <Tooltip content="Attach Document" color="warning">
                <NextButton isIconOnly variant="light" onClick={onOpen} className=" w-10">
                    <EditIcon className="text-lg text-yellow-500" />
                </NextButton>
            </Tooltip>
            <Modal
                isCentered
                closeOnOverlayClick={false}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Attach Document</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl mt={4}>
                            <FormLabel>Price</FormLabel>
                            <Input
                                placeholder="Price"
                                defaultValue={data.price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Refer to Quotation No.</FormLabel>
                            <input
                                type="file"
                                name="file-input"
                                id="file-input"
                                className="block w-full border border-gray-200 shadow-sm rounded-lg 
                                text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 
                                disabled:pointer-events-none file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4
                                mb-3"
                                onChange={({ target }) => {
                                    if (target.files) {
                                        const file = target.files[0];
                                        setFile(file);
                                    }
                                }}
                            />
                            {data.ref_quotation.map((quotation, index) => (
                                <div key={index}>
                                    <Link
                                        href={quotation.path}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500"
                                    >
                                        {quotation.name}
                                    </Link>
                                </div>
                            ))}
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={() => handleConfirmSave()} colorScheme='green' className="mr-2">Save</Button>
                        <Button onClick={onClose} colorScheme='red'>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}