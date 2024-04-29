import React from "react";
import { useForm } from "react-hook-form"; //ง่ายต่อการดึงข้อมูลจากฟอร์ม
import { AddIcon } from "@chakra-ui/icons";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    Button,
    useDisclosure,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Select,
    Textarea,
} from '@chakra-ui/react'
import { selectAsset } from "./SelectAsset";
import { useDispatch } from 'react-redux'
import { addRepair } from "@/lib/repairSlice";

export default function ModalAddRequestItem() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useDispatch();

    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);

    const { register, handleSubmit } = useForm();

    const doSubmit = (data) => {
        dispatch(
            addRepair({
                // problem: problemObj,
                asset: data.asset,
                detail: data.detail,
            })
        );
        onClose();
    };

    return (
        <>
            <Button colorScheme='blue' leftIcon={<AddIcon />} onClick={onOpen}>
                เพิ่มรายการร้องขอ
            </Button>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Item</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleSubmit((doSubmit))}>
                        <ModalBody pb={6}>
                            <FormControl>
                                <FormLabel>Select Asset</FormLabel>
                                <Select
                                    placeholder='Select option'
                                    isRequired
                                    {...register("asset", { required: true })}
                                >
                                    {selectAsset.map((asset) => (
                                        <option value={asset.value}>{asset.label}</option>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Problem</FormLabel>
                                <Textarea
                                    required
                                    placeholder='Problem'
                                    {...register("detail", { required: true })}
                                />
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} type="submit">
                                Save
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    )
}