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
} from '@chakra-ui/react'
import { EditIcon } from "@/components/EditIcon";

export default function ModalEditItem(data) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Tooltip content="Attach Document" color="warning">
                <NextButton isIconOnly variant="light" onClick={onOpen} className=" w-10">
                    <EditIcon className="text-lg text-yellow-500" />
                </NextButton>
            </Tooltip>
            <Modal
                closeOnOverlayClick={false}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Item</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Asset</FormLabel>
                            <Input
                                isReadOnly
                                value={data.asset}
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Purpose of Usage</FormLabel>
                            <Textarea
                                placeholder='Purpose of Usage'
                                isReadOnly
                                value={data.purpose}
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Device Specification/Software version</FormLabel>
                            <Textarea
                                placeholder='Device Specification/Software version'
                                isReadOnly
                                value={data.spec_detail}
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Quantity</FormLabel>
                            <Input
                                isReadOnly
                                value={data.qty}
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Price</FormLabel>
                            <Input
                                isReadOnly
                                value={data.qty}
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Refer to Quotation No</FormLabel>
                            <Input
                                isReadOnly
                                value={data.qty}
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={onClose} colorScheme='blue'>Exit</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}