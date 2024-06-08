"use client"

import React, { useState } from "react";
import ProfileInformation from "@/components/documents/QF-ITC-0003/ProfileInformation";
import HeaderDoc from "@/components/documents/QF-ITC-0003/HeaderDoc";
import StepsComponent from "@/components/documents/Steps";
import Detail from "@/components/documents/QF-ITC-0003/Detail";
import { Card, CardBody, Textarea } from "@nextui-org/react";
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

        axios.patch('/api/admin/documents/QF-ITC-0003/accept/doc_no', formData)
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
                        <Detail data={data?.Table_ITC_0003[0]} />
                        {data?.step === 1 && trackStatus === 0 ?
                            <Card className="p-4 sm:p-8 sm:rounded-lg w-75">
                                <CardBody>
                                    <div className=" font-medium">Remark</div>
                                    <Textarea
                                        placeholder="Remark"
                                        variant="bordered"
                                        size="lg"
                                        onChange={(e) => setRemark(e.target.value)}
                                    />
                                    <div className="mx-auto text-center mt-2">
                                        <Button colorScheme="green" className="mr-1" onClick={() => handleConfirmSave(1)}>Approve</Button>
                                        <Button colorScheme="red" onClick={() => handleConfirmSave(2)}>Reject</Button>
                                    </div>
                                </CardBody>
                            </Card>
                            : ""}
                    </>
                }
            </main>
        </>
    );
}