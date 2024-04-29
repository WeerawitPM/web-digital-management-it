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
import { EyeIcon } from "@/app/components/EyeIcon";
import { useSelector } from 'react-redux'

export default function ModalViewItem({ id }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const repairListData = useSelector((state) => state.repair.data);
    const [asset, setAsset] = useState(null);
    const [detail, setDetail] = useState(null);

    useEffect(() => {
        const selectedAsset = repairListData.find(item => item.id === id);
        if (selectedAsset) {
            setAsset(selectedAsset.asset);
            setDetail(selectedAsset.detail);
        }
    }, [id, repairListData]);

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
                            <FormLabel>Problem</FormLabel>
                            <Textarea
                                placeholder='Problem'
                                isReadOnly
                                value={detail}
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