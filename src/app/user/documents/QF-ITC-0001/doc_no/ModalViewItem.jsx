import React, { useState, useEffect } from "react";
import {
    Button as NextButton,
    Tooltip,
    Link
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

export default function ModalViewItem(data) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Tooltip content="View" color="primary">
                <NextButton isIconOnly variant="light" onClick={onOpen} className=" w-10">
                    <EyeIcon className="text-lg text-blue-500" />
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
                    <ModalHeader>View Item</ModalHeader>
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
                            <FormLabel>Device Specification/Software version </FormLabel>
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
                                value={data.price}
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Refer to Quotation No.</FormLabel>
                            {data.ref_quotation?.map((quotation, index) => (
                                <div key={index}>
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
                                </div>
                            ))}
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