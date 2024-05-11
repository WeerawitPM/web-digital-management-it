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
import { EyeIcon } from "@/components/EyeIcon";

export default function ModalViewItem({ id, asset, detail, qty }) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Tooltip content="View" color="primary">
                <NextButton isIconOnly variant="light" onClick={onOpen} className=" w-10">
                    <EyeIcon className="text-lg text-blue-500" />
                </NextButton>
            </Tooltip>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>View Item</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Select Asset</FormLabel>
                            <Input
                                isReadOnly
                                value={asset}
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Device Specification/Software version </FormLabel>
                            <Textarea
                                placeholder='Device Specification/Software version'
                                isReadOnly
                                value={detail}
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Quantity</FormLabel>
                            <Input
                                isReadOnly
                                value={qty}
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