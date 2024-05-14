import React, { useState, useEffect } from "react";
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
import { useDispatch } from 'react-redux'
import { addEquipment } from "@/lib/equipmentSlice";
import axios from "axios";

export default function ModalAdd() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useDispatch();

    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);

    const [assetData, setAssetData] = useState(null);
    const [selectedAssetType, setSelectedAssetType] = useState(null);
    const [selectedAssets, setSelectedAssets] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('/api/asset');
            if (response.status !== 200) {
                throw new Error('Failed to fetch data');
            }
            const data = response.data;
            setAssetData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleAssetTypeChange = (event) => {
        const selectedType = event.target.value;
        setSelectedAssetType(selectedType);
        const assets = assetData.find(assetType => assetType.id === parseInt(selectedType)).Asset;
        setSelectedAssets(assets);
    };

    const { register, handleSubmit } = useForm();

    const doSubmit = (data) => {
        dispatch(
            addEquipment({
                assetId: (selectedAssets.find((asset) => asset.name === data.name)).id,
                name: data.name,
                purpose: data.purpose,
                detail: data.detail,
                qty: parseInt(data.qty),
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
                                <FormLabel>Select Asset Type</FormLabel>
                                <Select
                                    placeholder='Select option'
                                    isRequired
                                    onChange={handleAssetTypeChange}
                                >
                                    {assetData && assetData.map((assetType) => (
                                        <option key={assetType.id} value={assetType.id}>{assetType.name}</option>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Select Asset</FormLabel>
                                <Select
                                    placeholder='Select option'
                                    isRequired
                                    {...register("name", { required: true })}
                                >
                                    {selectedAssets && selectedAssets.map((asset) => (
                                        <option key={asset.id} value={asset.name}>{asset.name}</option>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Purpose of Usage</FormLabel>
                                <Textarea
                                    required
                                    placeholder='Purpose of Usage'
                                    {...register("purpose", { required: true })}
                                />
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Device Specification/Software version</FormLabel>
                                <Textarea
                                    required
                                    placeholder='Device Specification/Software version'
                                    {...register("detail", { required: true })}
                                />
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Quantity</FormLabel>
                                <NumberInput
                                    defaultValue={1}
                                    min={1}
                                    isRequired
                                >
                                    <NumberInputField
                                        {...register("qty")} />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
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