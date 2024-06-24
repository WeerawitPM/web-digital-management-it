"use client"
import React, { useState } from "react";
import ProfileInformation from "@/components/documents/QF-ITC-0009/ProfileInformation";
import HeaderDoc from "@/components/documents/QF-ITC-0009/HeaderDoc";
import StepsComponent from "@/components/documents/Steps";
import { Button, Card, Checkbox, Input, Radio, RadioGroup, Textarea } from "@nextui-org/react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useSession } from "next-auth/react";

export default function Component(
    { data, steps, statusStep, doc_no, trackStatus }:
        { data: any, steps: any, statusStep: string, doc_no: string, trackStatus: number }
) {
    const Table_ITC_0009 = data?.Table_ITC_0009[0];
    const toast = useToast();
    const [remark, setRemark] = useState("");
    const { data: session } = useSession();
    const department = session?.user?.department;

    const handleSubmit = (status: string) => {
        if (status === "1") {
            addData();
        } else {
            if (remark === "") {
                toast({
                    title: 'Error',
                    description: "Remark is required",
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                })
            } else {
                addData();
            }
        }

        function addData() {
            const formData = new FormData();
            formData.append("document_head_id", data?.ref_no);
            formData.append("remark", remark);
            formData.append("status", status);
            formData.append("step", data?.step);

            axios.patch('/api/user/documents/QF-ITC-0009/approve', formData)
                .then(response => {
                    if (response.data.status === "success") {
                        toast({
                            title: 'Success',
                            description: "Document has been saved.",
                            status: 'success',
                            duration: 3000,
                            isClosable: true,
                        })
                        window.location.reload();
                    } else {
                        toast({
                            title: 'Error',
                            description: response.data.message,
                            status: 'error',
                            duration: 3000,
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
                        duration: 3000,
                        isClosable: true,
                    })
                })
        }
    }

    return (
        <>
            <HeaderDoc doc_no={doc_no} />
            <main className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6 min-h-screen py-5">
                {data === null ? "" :
                    <>
                        <StepsComponent current={data.step} status={statusStep} items={steps} />
                        <ProfileInformation data={data} />
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
                                                <Input type="text" label="หมายเลขครุภัณฑ์" labelPlacement="outside" variant="bordered" isReadOnly
                                                    value={Table_ITC_0009.computer_equipment_number} />
                                                <Input type="text" label="ยี่ห้อ/รุ่น" labelPlacement="outside" variant="bordered" isReadOnly
                                                    value={Table_ITC_0009.computer_brand} />
                                            </div>
                                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                                <Input type="text" label="S/N" labelPlacement="outside" variant="bordered" isReadOnly
                                                    value={Table_ITC_0009.computer_serial_number} />
                                                <Input type="text" label="ชื่อเครื่อง" labelPlacement="outside" variant="bordered" isReadOnly
                                                    value={Table_ITC_0009.computer_name} />
                                            </div>
                                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                                <Input type="text" label="RAM" labelPlacement="outside" variant="bordered" isReadOnly
                                                    value={Table_ITC_0009.computer_ram} />
                                                <Input type="text" label="M/B" labelPlacement="outside" variant="bordered" isReadOnly
                                                    value={Table_ITC_0009.computer_mb} />
                                            </div>
                                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                                <Input type="text" label="VGA" labelPlacement="outside" variant="bordered" isReadOnly
                                                    value={Table_ITC_0009.computer_vga} />
                                                <Input type="text" label="HDD" labelPlacement="outside" variant="bordered" isReadOnly
                                                    value={Table_ITC_0009.computer_hdd} />
                                            </div>
                                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                                <Input type="text" label="DVD R/W" labelPlacement="outside" variant="bordered" isReadOnly
                                                    value={Table_ITC_0009.computer_dvd} />
                                                <Input type="text" label="Case" labelPlacement="outside" variant="bordered" isReadOnly
                                                    value={Table_ITC_0009.computer_case} />
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
                                            <Input type="text" label="หมายเลขครุภัณฑ์" labelPlacement="outside" variant="bordered" isReadOnly
                                                value={Table_ITC_0009.monitor_equipment_number} />
                                            <Input type="text" label="ยี่ห้อ/รุ่น" labelPlacement="outside" variant="bordered" isReadOnly
                                                value={Table_ITC_0009.monitor_brand} />
                                        </div>
                                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                            <Input type="text" label="S/N" labelPlacement="outside" variant="bordered" isReadOnly
                                                value={Table_ITC_0009.monitor_serial_number} />
                                            <Input type="text" label="ขนาด" labelPlacement="outside" variant="bordered" isReadOnly
                                                value={Table_ITC_0009.monitor_size} />
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
                                            <Input type="text" label="หมายเลขครุภัณฑ์" labelPlacement="outside" variant="bordered" isReadOnly
                                                value={Table_ITC_0009.printer_equipment_number} />
                                            <Input type="text" label="ยี่ห้อ/รุ่น" labelPlacement="outside" variant="bordered" isReadOnly
                                                value={Table_ITC_0009.printer_brand} />
                                        </div>
                                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                            <Input type="text" label="S/N" labelPlacement="outside" variant="bordered" isReadOnly
                                                value={Table_ITC_0009.printer_serial_number} />
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
                                            <Input type="text" label="หมายเลขครุภัณฑ์" labelPlacement="outside" variant="bordered" isReadOnly
                                                value={Table_ITC_0009.ups_equipment_number} />
                                            <Input type="text" label="ยี่ห้อ/รุ่น" labelPlacement="outside" variant="bordered" isReadOnly
                                                value={Table_ITC_0009.ups_brand} />
                                        </div>
                                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                            <Input type="text" label="S/N" labelPlacement="outside" variant="bordered" isReadOnly
                                                value={Table_ITC_0009.ups_serial_number} />
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
                            {data?.step === 2 && trackStatus === 0 && department === "Accounting" ?
                                <div>
                                    <div className="flex justify-center gap-2">
                                        <Button className="text-white bg-[#38A169]" size="lg" type="submit" onClick={() => handleSubmit("1")}>
                                            อนุมัติคำร้องขอ
                                        </Button>
                                        <Button className="text-white bg-[#E53E3E]" size="lg" type="submit" onClick={() => handleSubmit("2")}>
                                            ปฏิเสธคำร้องขอ
                                        </Button>
                                    </div>
                                    <Textarea
                                        defaultValue={data.Track_Doc[1].remark}
                                        placeholder="*หากปฏิเสธให้ระบุ Remark ด้วย*"
                                        variant="bordered"
                                        size="lg"
                                        label="Remark"
                                        labelPlacement="outside"
                                        onChange={(e) => setRemark(e.target.value)}
                                    />
                                </div>
                                : ""}
                        </Card>
                    </>
                }
            </main>
        </>
    );
}