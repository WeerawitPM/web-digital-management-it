'use client'

import React, { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form"; //ง่ายต่อการดึงข้อมูลจากฟอร์ม
import {
    Card,
    RadioGroup,
    Radio,
    DatePicker,
    Button,
    Checkbox,
    Textarea
} from "@nextui-org/react";
import {
    useToast,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogCloseButton,
    useDisclosure,
    Button as ChakraButton
} from "@chakra-ui/react"
import axios from 'axios';
import HeaderMain from "@/components/documents/QF-ITC-0009/HeaderMain";
import Profile from "./Profile";
import { parseAbsoluteToLocal } from "@internationalized/date";

export default function Component({ data }: { data: any }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef<any>();
    const toast = useToast();
    const { register, handleSubmit } = useForm();

    const [computerSelected, setComputerSelected] = useState(false);
    const [computerType, setComputerType] = useState("");
    const [monitorSelected, setMonitorSelected] = useState(false);
    const [printerSelected, setPrinterSelected] = useState(false);
    const [upsSelected, setUPSSelected] = useState(false);
    const [otherSelected, setOtherSelected] = useState(false);
    const [startDate, setStartDate] = useState<any>(parseAbsoluteToLocal(new Date().toISOString()));
    const [endDate, setEndDate] = useState<any>(parseAbsoluteToLocal(new Date().toISOString()));
    const [useFormData, setUseFormData] = useState<any>();

    const handleSave = (e: any) => {
        if (!startDate || !endDate) {
            toast({
                title: 'Error',
                description: "Please select date.",
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } else {
            const start = new Date(startDate.year, startDate.month - 1, startDate.day);
            const end = new Date(endDate.year, endDate.month - 1, endDate.day);
            
            // Calculate the date 3 months after the start date
            const threeMonthsLater = new Date(start);
            threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);

            // Check if end date is more than 3 months after start date
            if (end > threeMonthsLater) {
                toast({
                    title: 'Error',
                    description: "Dates must be within 3 months of each other.",
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                setUseFormData(e);
                onOpen();
            }
        }
    }

    const handleConfirmSave = () => {
        onClose();
        const start_date = new Date(startDate.year, startDate.month - 1, startDate.day, startDate.hour, startDate.minute, startDate.second, startDate.millisecond).toISOString();
        const end_date = new Date(endDate.year, endDate.month - 1, endDate.day, endDate.hour, endDate.minute, endDate.second, endDate.millisecond).toISOString();
        // สร้างข้อมูลที่จะส่งไปยัง API
        const formData = new FormData();
        formData.append("computer_type", computerType);
        formData.append("computer_purpose", useFormData.computer_purpose);
        formData.append("monitor_type", useFormData.monitor);
        formData.append("monitor_purpose", useFormData.monitor_purpose);
        formData.append("printer_type", useFormData.printer);
        formData.append("printer_purpose", useFormData.printer_purpose);
        formData.append("ups_type", useFormData.ups);
        formData.append("ups_purpose", useFormData.ups_purpose);
        formData.append("etc", useFormData.etc);
        formData.append("etc_purpose", useFormData.etc_purpose);
        formData.append("start_date", start_date);
        formData.append("end_date", end_date);

        axios.post('/api/user/documents/QF-ITC-0009/add', formData)
            .then(response => {
                if (response.data.status === "success") {
                    toast({
                        title: 'Success',
                        description: "Request has been saved.",
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                    });
                    // Reload the page after 3 seconds
                    setTimeout(() => {
                        location.reload();
                    }, 3000);
                } else {
                    toast({
                        title: 'Error',
                        description: "Failed to save request.",
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                    });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                toast({
                    title: 'Error',
                    description: "Failed to save request.",
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            })
            .finally(() => {
                onClose();
            });
    }

    return (
        <>
            <HeaderMain title={undefined} />
            <main className="max-w-7xl mx-auto s>m:px-6 lg:px-8 space-y-6 min-h-screen pb-5">
                <Profile data={data} />
                <Card className="p-4 sm:p-8 sm:rounded-lg flex gap-3">
                    <form onSubmit={handleSubmit(handleSave)} className="flex flex-col gap-5">
                        <div>
                            <Checkbox isSelected={computerSelected} onValueChange={setComputerSelected}>คอมพิวเตอร์ (Computer)</Checkbox>
                            {computerSelected ?
                                <div className="flex flex-col gap-2">
                                    <RadioGroup
                                        value={computerType}
                                        onValueChange={setComputerType}
                                        orientation="horizontal"
                                        isRequired
                                        className="ms-7 mt-2"
                                    >
                                        <Radio value="Computer">Computer</Radio>
                                        <Radio value="Laptop">Laptop</Radio>
                                    </RadioGroup>
                                    <Textarea
                                        isRequired
                                        placeholder="*โปรดระบุว่านำไปใช้ทำอะไร*"
                                        variant="bordered"
                                        size="lg"
                                        {...register("computer_purpose")}
                                    />
                                </div>
                                : ""}
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex">
                                <Checkbox value={"Monitor"} isSelected={monitorSelected} onValueChange={setMonitorSelected} {...register("monitor")}>จอภาพ (Monitor)</Checkbox>
                            </div>
                            {monitorSelected ?
                                <Textarea
                                    isRequired
                                    placeholder="*โปรดระบุว่านำไปใช้ทำอะไร*"
                                    variant="bordered"
                                    size="lg"
                                    {...register("monitor_purpose")}
                                />
                                : ""}
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex">
                                <Checkbox value={"Printer"} isSelected={printerSelected} onValueChange={setPrinterSelected} {...register("printer")}>เครื่องพิมพ์ (Printer)</Checkbox>
                            </div>
                            {printerSelected ?
                                <Textarea
                                    isRequired
                                    placeholder="*โปรดระบุว่านำไปใช้ทำอะไร*"
                                    variant="bordered"
                                    size="lg"
                                    {...register("printer_purpose")}
                                />
                                : ""}
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex">
                                <Checkbox value={"UPS"} isSelected={upsSelected} onValueChange={setUPSSelected} {...register("ups")}>เครื่องสำรองไฟ (UPS)</Checkbox>
                            </div>
                            {upsSelected ?
                                <Textarea
                                    isRequired
                                    placeholder="*โปรดระบุว่านำไปใช้ทำอะไร*"
                                    variant="bordered"
                                    size="lg"
                                    {...register("ups_purpose")}
                                />
                                : ""}
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex">
                                <Checkbox value={"Other"} isSelected={otherSelected} onValueChange={setOtherSelected} {...register("other")}>อื่น ๆ (Other)</Checkbox>
                            </div>
                            {otherSelected ?
                                <div className="flex flex-col gap-2">
                                    <Textarea
                                        isRequired
                                        placeholder="*โปรดระบุอุปกรณ์*"
                                        variant="bordered"
                                        size="lg"
                                        {...register("other")}
                                    />
                                    <Textarea
                                        isRequired
                                        placeholder="*โปรดระบุว่านำไปใช้ทำอะไร*"
                                        variant="bordered"
                                        size="lg"
                                        {...register("other_purpose")}
                                    />
                                </div>
                                : ""}
                        </div>
                        <div className="flex flex-col gap-2">
                            <div>ข้อมูลการยืม (ระยะเวลาสูงสุด 3 เดือน)</div>
                            <div className="flex gap-2">
                                <DatePicker
                                    isRequired
                                    label="จากวันที่"
                                    variant="bordered"
                                    hideTimeZone
                                    defaultValue={parseAbsoluteToLocal(new Date().toISOString())}
                                    value={startDate}
                                    onChange={setStartDate}
                                />
                                <DatePicker
                                    isRequired
                                    label="ถึงวันที่"
                                    variant="bordered"
                                    hideTimeZone
                                    defaultValue={parseAbsoluteToLocal(new Date().toISOString())}
                                    value={endDate}
                                    onChange={setEndDate}
                                />
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <Button className="text-white bg-[#38A169]" size="lg" type="submit">
                                ยืนยันการร้องขอ
                            </Button>
                        </div>
                    </form>
                </Card>
                <AlertDialog
                    motionPreset='slideInBottom'
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                    isOpen={isOpen}
                    isCentered
                >
                    <AlertDialogOverlay />

                    <AlertDialogContent>
                        <AlertDialogHeader>Are you sure save?</AlertDialogHeader>
                        <AlertDialogCloseButton />
                        <AlertDialogBody>
                            This operation cannot be reversed.
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <ChakraButton ref={cancelRef} onClick={onClose} colorScheme='red'>
                                No
                            </ChakraButton>
                            <ChakraButton colorScheme='green' ml={3} onClick={() => handleConfirmSave()}>
                                Yes
                            </ChakraButton>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </main>
        </>
    )
}
