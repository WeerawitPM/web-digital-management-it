"use client"
import React, { useState } from "react";
import ProfileInformation from "@/components/documents/QF-ITC-0009/ProfileInformation";
import HeaderDoc from "@/components/documents/QF-ITC-0009/HeaderDoc";
import StepsComponent from "@/components/documents/Steps";
import { Button, Card, Checkbox, Input, Radio, RadioGroup, Textarea } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

export default function Component(
    { data, steps, statusStep, trackStatus, doc_no }:
        { data: any, steps: any, statusStep: string, trackStatus: number, doc_no: string }
) {
    const Table_ITC_0009 = data?.Table_ITC_0009[0];
    const { register, handleSubmit } = useForm();
    const toast = useToast();
    const [status, setStatus] = useState(0);
    let isReadOnly = false;

    if (data?.step === 2 || trackStatus === 2) {
        isReadOnly = true;
    }

    const handleSave = (e: any) => {
        if (status === 1) {
            handleConfirmSave(e);
        } else {
            if (e.remark === "") {
                toast({
                    title: 'Warning',
                    description: "Please fill remark.",
                    status: 'warning',
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                handleConfirmSave(e);
            }
        }
    };

    const handleConfirmSave = (e: any) => {
        // สร้างข้อมูลที่จะส่งไปยัง API
        const formData = new FormData();
        formData.append("document_head_id", data?.ref_no);
        formData.append("step", data?.step);
        formData.append("status", String(status));
        formData.append("remark", e.remark);
        formData.append("computer_brand", e.computer_brand);
        formData.append("computer_name", e.computer_name);
        formData.append("computer_ram", e.computer_ram);
        formData.append("computer_vga", e.computer_vga);
        formData.append("computer_dvd", e.computer_dvd);
        formData.append("computer_equipment_number", e.computer_equipment_number);
        formData.append("computer_serial_number", e.computer_serial_number);
        formData.append("computer_mb", e.computer_mb);
        formData.append("computer_hdd", e.computer_hdd);
        formData.append("computer_case", e.computer_case);
        formData.append("monitor_brand", e.monitor_brand);
        formData.append("monitor_size", e.monitor_size);
        formData.append("monitor_equipment_number", e.monitor_equipment_number);
        formData.append("monitor_serial_number", e.monitor_serial_number);
        formData.append("printer_brand", e.printer_brand);
        formData.append("printer_equipment_number", e.printer_equipment_number);
        formData.append("printer_serial_number", e.printer_serial_number);
        formData.append("ups_brand", e.ups_brand);
        formData.append("ups_equipment_number", e.ups_equipment_number);
        formData.append("ups_serial_number", e.ups_serial_number);

        axios.patch('/api/admin/documents/QF-ITC-0009/approve', formData)
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
    }

    return (
        <>
            <HeaderDoc doc_no={doc_no} />
            <main className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6 min-h-screen py-5">
                {data === null ? "" :
                    <>
                        <StepsComponent current={data.step} status={statusStep} items={steps} />
                        <ProfileInformation data={data} />
                        <form onSubmit={handleSubmit(handleSave)}>
                            <Card className="p-4 sm:p-8 sm:rounded-lg flex flex-col gap-5">
                                <div>
                                    <Checkbox
                                        isSelected={Table_ITC_0009.computer_type == "undefined" || Table_ITC_0009.computer_type == "" ? false : true}
                                        isReadOnly
                                    >
                                        คอมพิวเตอร์ (Computer)
                                    </Checkbox>
                                    <div className="flex flex-col gap-2">
                                        <RadioGroup
                                            isReadOnly
                                            value={Table_ITC_0009.computer_type}
                                            orientation="horizontal"
                                            className="ms-7 mt-2"
                                        >
                                            <Radio value="Computer">Computer</Radio>
                                            <Radio value="Laptop">Laptop</Radio>
                                        </RadioGroup>
                                        {Table_ITC_0009.computer_purpose == "undefined" ? ""
                                            : <div className="flex flex-col gap-2">
                                                <Textarea
                                                    isReadOnly
                                                    value={Table_ITC_0009.computer_purpose}
                                                    placeholder="*โปรดระบุว่านำไปใช้ทำอะไร*"
                                                    variant="bordered"
                                                    size="lg"
                                                    label="Purpose"
                                                    labelPlacement="outside"
                                                />
                                                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                                    <Input type="text" label="หมายเลขครุภัณฑ์" labelPlacement="outside" variant="bordered" isReadOnly={isReadOnly}
                                                        defaultValue={Table_ITC_0009.computer_equipment_number} {...register("computer_equipment_number")} />
                                                    <Input type="text" label="ยี่ห้อ/รุ่น" labelPlacement="outside" variant="bordered" isReadOnly={isReadOnly}
                                                        defaultValue={Table_ITC_0009.computer_brand} {...register("computer_brand")} />
                                                </div>
                                                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                                    <Input type="text" label="S/N" labelPlacement="outside" variant="bordered" isReadOnly={isReadOnly}
                                                        defaultValue={Table_ITC_0009.computer_serial_number} {...register("computer_serial_number")} />
                                                    <Input type="text" label="ชื่อเครื่อง" labelPlacement="outside" variant="bordered" isReadOnly={isReadOnly}
                                                        defaultValue={Table_ITC_0009.computer_name} {...register("computer_name")} />
                                                </div>
                                                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                                    <Input type="text" label="RAM" labelPlacement="outside" variant="bordered" isReadOnly={isReadOnly}
                                                        defaultValue={Table_ITC_0009.computer_ram} {...register("computer_ram")} />
                                                    <Input type="text" label="M/B" labelPlacement="outside" variant="bordered" isReadOnly={isReadOnly}
                                                        defaultValue={Table_ITC_0009.computer_mb} {...register("computer_mb")} />
                                                </div>
                                                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                                    <Input type="text" label="VGA" labelPlacement="outside" variant="bordered" isReadOnly={isReadOnly}
                                                        defaultValue={Table_ITC_0009.computer_vga} {...register("computer_vga")} />
                                                    <Input type="text" label="HDD" labelPlacement="outside" variant="bordered" isReadOnly={isReadOnly}
                                                        defaultValue={Table_ITC_0009.computer_hdd} {...register("computer_hdd")} />
                                                </div>
                                                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                                    <Input type="text" label="DVD R/W" labelPlacement="outside" variant="bordered" isReadOnly={isReadOnly}
                                                        defaultValue={Table_ITC_0009.computer_dvd} {...register("computer_dvd")} />
                                                    <Input type="text" label="Case" labelPlacement="outside" variant="bordered" isReadOnly={isReadOnly}
                                                        defaultValue={Table_ITC_0009.computer_case} {...register("computer_case")} />
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex">
                                        <Checkbox
                                            isReadOnly
                                            isSelected={Table_ITC_0009.monitor_type == "true" ? true : false}
                                        >
                                            จอภาพ (Monitor)
                                        </Checkbox>
                                    </div>
                                    {Table_ITC_0009.monitor_purpose == "undefined" ? ""
                                        : <div className="flex flex-col gap-2">
                                            <Textarea
                                                isReadOnly
                                                value={Table_ITC_0009.monitor_purpose}
                                                placeholder="*โปรดระบุว่านำไปใช้ทำอะไร*"
                                                variant="bordered"
                                                size="lg"
                                                label="Purpose"
                                                labelPlacement="outside"
                                            />
                                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                                <Input type="text" label="หมายเลขครุภัณฑ์" labelPlacement="outside" variant="bordered" isReadOnly={isReadOnly}
                                                    defaultValue={Table_ITC_0009.monitor_equipment_number} {...register("monitor_equipment_number")} />
                                                <Input type="text" label="ยี่ห้อ/รุ่น" labelPlacement="outside" variant="bordered" isReadOnly={isReadOnly}
                                                    defaultValue={Table_ITC_0009.monitor_brand} {...register("monitor_brand")} />
                                            </div>
                                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                                <Input type="text" label="S/N" labelPlacement="outside" variant="bordered" isReadOnly={isReadOnly}
                                                    defaultValue={Table_ITC_0009.monitor_serial_number} {...register("monitor_serial_number")} />
                                                <Input type="text" label="ขนาด" labelPlacement="outside" variant="bordered" isReadOnly={isReadOnly}
                                                    defaultValue={Table_ITC_0009.monitor_size} {...register("monitor_size")} />
                                            </div>
                                        </div>
                                    }
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex">
                                        <Checkbox
                                            isReadOnly
                                            isSelected={Table_ITC_0009.printer_type == "true" ? true : false}
                                        >
                                            เครื่องพิมพ์ (Printer)
                                        </Checkbox>
                                    </div>
                                    {Table_ITC_0009.printer_purpose == "undefined" ? ""
                                        : <div className="flex flex-col gap-2">
                                            <Textarea
                                                isReadOnly
                                                value={Table_ITC_0009.printer_purpose}
                                                placeholder="*โปรดระบุว่านำไปใช้ทำอะไร*"
                                                variant="bordered"
                                                size="lg"
                                                label="Purpose"
                                                labelPlacement="outside"
                                            />
                                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                                <Input type="text" label="หมายเลขครุภัณฑ์" labelPlacement="outside" variant="bordered" isReadOnly={isReadOnly}
                                                    defaultValue={Table_ITC_0009.printer_equipment_number} {...register("printer_equipment_number")} />
                                                <Input type="text" label="ยี่ห้อ/รุ่น" labelPlacement="outside" variant="bordered" isReadOnly={isReadOnly}
                                                    defaultValue={Table_ITC_0009.printer_brand} {...register("printer_brand")} />
                                            </div>
                                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                                <Input type="text" label="S/N" labelPlacement="outside" variant="bordered" isReadOnly={isReadOnly}
                                                    defaultValue={Table_ITC_0009.printer_serial_number} {...register("printer_serial_number")} />
                                            </div>
                                        </div>
                                    }
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex">
                                        <Checkbox
                                            isReadOnly
                                            isSelected={Table_ITC_0009.ups_type == "true" ? true : false}
                                        >
                                            เครื่องสำรองไฟ (UPS)
                                        </Checkbox>
                                    </div>
                                    {Table_ITC_0009.ups_purpose == "undefined" ? ""
                                        : <div className="flex flex-col gap-2">
                                            <Textarea
                                                isReadOnly
                                                value={Table_ITC_0009.ups_purpose}
                                                placeholder="*โปรดระบุว่านำไปใช้ทำอะไร*"
                                                variant="bordered"
                                                size="lg"
                                                label="Purpose"
                                                labelPlacement="outside"
                                            />
                                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                                <Input type="text" label="หมายเลขครุภัณฑ์" labelPlacement="outside" variant="bordered" isReadOnly={isReadOnly}
                                                    defaultValue={Table_ITC_0009.ups_equipment_number} {...register("ups_equipment_number")} />
                                                <Input type="text" label="ยี่ห้อ/รุ่น" labelPlacement="outside" variant="bordered" isReadOnly={isReadOnly}
                                                    defaultValue={Table_ITC_0009.ups_brand} {...register("ups_brand")} />
                                            </div>
                                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                                <Input type="text" label="S/N" labelPlacement="outside" variant="bordered" isReadOnly={isReadOnly}
                                                    defaultValue={Table_ITC_0009.ups_serial_number} {...register("ups_serial_number")} />
                                            </div>
                                        </div>
                                    }
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex">
                                        <Checkbox
                                            isReadOnly
                                            isSelected={Table_ITC_0009.etc != "undefined" ? true : false}
                                        >
                                            อื่น ๆ (Other)
                                        </Checkbox>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        {Table_ITC_0009.etc == "undefined" ? ""
                                            :
                                            <Textarea
                                                isReadOnly
                                                value={Table_ITC_0009.etc}
                                                placeholder="*โปรดระบุอุปกรณ์*"
                                                variant="bordered"
                                                size="lg"
                                                label="อุปกรณ์"
                                                labelPlacement="outside"
                                            />
                                        }
                                        {Table_ITC_0009.etc_purpose == "undefined" ? ""
                                            :
                                            <Textarea
                                                isReadOnly
                                                value={Table_ITC_0009.etc_purpose}
                                                placeholder="*โปรดระบุว่านำไปใช้ทำอะไร*"
                                                variant="bordered"
                                                size="lg"
                                                label="Purpose"
                                                labelPlacement="outside"
                                            />
                                        }
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div>ข้อมูลการยืม (ระยะเวลาสูงสุด 3 เดือน)</div>
                                    <div className="flex gap-2">
                                        <div>จากวันที่: {Table_ITC_0009?.start_date && new Date(Table_ITC_0009.start_date).toLocaleDateString('th-TH')}</div>
                                        <div>ถึงวันที่: {Table_ITC_0009?.end_date && new Date(Table_ITC_0009.end_date).toLocaleDateString('th-TH')}</div>
                                    </div>
                                </div>
                                {isReadOnly === false ?
                                    <div className="flex justify-center gap-2">
                                        <Button className="text-white bg-[#38A169]" size="lg" type="submit" onClick={() => setStatus(1)}>
                                            อนุมัติคำร้องขอ
                                        </Button>
                                        <Button className="text-white bg-[#E53E3E]" size="lg" type="submit" onClick={() => setStatus(2)}>
                                            ปฏิเสธคำร้องขอ
                                        </Button>
                                    </div>
                                    : ""}
                                <Textarea
                                    isReadOnly={isReadOnly}
                                    value={data.Track_Doc[1].remark}
                                    placeholder="*หากปฏิเสธให้ระบุ Remark ด้วย*"
                                    variant="bordered"
                                    size="lg"
                                    label="Remark"
                                    labelPlacement="outside"
                                    {...register("remark")}
                                />
                            </Card>
                        </form>
                    </>
                }
            </main >
        </>
    );
}