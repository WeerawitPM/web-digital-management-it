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
import { Link } from "@nextui-org/react";
import ModalDelete from "./ModalDelete";

export default function ModalEdit(data: any) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const [price, setPrice] = useState(data.price);
    const [document, setDocument] = useState<any>(null);

    const handleConfirmSave = () => {
        if (!price) {
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
            formData.append("document", document);

            axios.patch('/api/admin/documents/QF-ITC-0001/attach_document/doc_no/action', formData, {
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
                    setDocument(null);
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
                                type="number"
                                placeholder="Price"
                                defaultValue={data?.price}
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
                                        setDocument(file);
                                    }
                                }}
                            />
                            {data.ref_quotation.map((quotation: any, index: number) => (
                                <div key={index} className="flex">
                                    <Link
                                        isExternal
                                        showAnchorIcon
                                        href={quotation.path}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        color="primary"
                                    >
                                        {quotation.name}
                                    </Link>
                                    <ModalDelete id={quotation.id} fetchData={data.fetchData} />
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