"use client"
import React, { useState } from "react";
import ProfileInformation from "@/components/documents/QF-ITC-0005/ProfileInformation";
import HeaderDoc from "@/components/documents/QF-ITC-0005/HeaderDoc";
import StepsComponent from "@/components/documents/Steps";
import { Card, CardBody, Input, Radio, RadioGroup, Textarea } from "@nextui-org/react";
import { Button, useToast } from "@chakra-ui/react";
import axios from "axios";

export default function Component(
    { data, steps, statusStep, doc_no, trackStatus, fetchData }:
        { data: any, steps: any, statusStep: string, doc_no: string, trackStatus: number, fetchData: any }
) {
    const [remark, setRemark] = useState<any>(null);
    const toast = useToast();

    const saveData = (status: number) => {
        const formData = new FormData();
        formData.append("document_head_id", data?.ref_no);
        formData.append("step", data?.step);
        formData.append("status", String(status));
        formData.append("remark", remark);

        axios.patch('/api/admin/documents/QF-ITC-0005/approve', formData)
            .then(response => {
                if (response.data.status === "success") {
                    toast({
                        title: 'Success',
                        description: "Document has been saved.",
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                    })
                    fetchData();
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

    const handleConfirmSave = (status: number) => {
        if (status === 1) {
            saveData(1);
        }
        else {
            if (remark === null || remark === undefined || remark === "") {
                toast({
                    title: 'Warning',
                    description: "Please fill remark.",
                    status: 'warning',
                    duration: 3000,
                    isClosable: true,
                })
            }
            else {
                saveData(2);
            }
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
                                <div className="mb-3">ขอเข้าใช้งานอีเมลล์ของ</div>
                                <RadioGroup
                                    defaultValue={data?.Table_ITC_0005[0]?.email}
                                    orientation="horizontal"
                                    isReadOnly
                                >
                                    <Radio value="VCS">VCS</Radio>
                                    <Radio value="VCST">VCST</Radio>
                                    <Radio value="BVS">BVS</Radio>
                                    <Radio value="AAA">AAA</Radio>
                                    <Radio value="TKM">TKM</Radio>
                                </RadioGroup>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div>Username:</div>
                                <Input
                                    isReadOnly
                                    placeholder="Enter username"
                                    variant="bordered"
                                    size="lg"
                                    className="flex-1"
                                    defaultValue={data?.Table_ITC_0005[0]?.username}
                                />
                            </div>
                            <div>
                                <RadioGroup
                                    defaultValue={data?.Table_ITC_0005[0]?.type_email}
                                    orientation="horizontal"
                                    isReadOnly
                                >
                                    <Radio value="@vcsthai.com">@vcsthai.com</Radio>
                                    <Radio value="@vcsthailand.co.th">@vcsthailand.co.th</Radio>
                                    <Radio value="@bvs.co.th">@bvs.co.th</Radio>
                                    <Radio value="@aaa.co.th">@aaa.co.th</Radio>
                                    <Radio value="@tkm-thaikin.com">@tkm-thaikin.com</Radio>
                                </RadioGroup>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div>Password:</div>
                                <Input
                                    isReadOnly
                                    placeholder="Enter password"
                                    variant="bordered"
                                    size="lg"
                                    className="flex-1"
                                    defaultValue={data?.Table_ITC_0005[0]?.password}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <div>วันที่เริ่มใช้: {data?.Table_ITC_0005[0]?.start_date && new Date(data?.Table_ITC_0005[0]?.start_date).toLocaleDateString('th-TH')}</div>
                                <div>วันที่เลิกใช้งาน: {data?.Table_ITC_0005[0]?.end_date && new Date(data?.Table_ITC_0005[0]?.end_date).toLocaleDateString('th-TH')}</div>
                            </div>
                        </Card>
                        {data?.step === 1 && trackStatus === 0 ?
                            <Card className="p-4 sm:p-8 sm:rounded-lg w-75">
                                <CardBody>
                                    <div className="mx-auto text-center mt-2">
                                        <Button colorScheme="green" className="mr-1" onClick={() => handleConfirmSave(1)}>รับคำร้อง</Button>
                                        <Button colorScheme="red" onClick={() => handleConfirmSave(2)}>ปฏิเสธคำร้อง</Button>
                                    </div>
                                    <div className=" font-medium">Remark</div>
                                    <Textarea
                                        placeholder="หากปฏิเสธให้ใส่ Remark ด้วย"
                                        variant="bordered"
                                        size="lg"
                                        onChange={(e) => setRemark(e.target.value)}
                                    />
                                </CardBody>
                            </Card>
                            : ""}
                    </>
                }
            </main>
        </>
    );
}