'use client'

import React, { useState } from "react";
import { Textarea, Card, CardBody } from "@nextui-org/react";
import { useToast, Button } from "@chakra-ui/react";
import ModalView from "./ModalView";
import axios from "axios";
import TableAsset from "@/components/documents/QF-ITC-0001/TableAsset";
import ProfileInformation from "@/components/documents/QF-ITC-0001/ProfileInformation";
import HeaderDoc from "@/components/documents/QF-ITC-0001/HeaderDoc";
import StepsComponent from "@/components/documents/Steps";

export default function Component(params: any) {
    const data = params.data; // เก็บข้อมูลที่ได้จาก API
    const toast = useToast();
    const steps = params.steps;
    const statusStep = params.statusStep;
    const trackStatus = params.trackStatus;
    const totalPrice = params.totalPrice;
    const [remark, setRemark] = useState<any>(null);
    const fetchData = params.fetchData;
    const doc_no = params.doc_no;

    const saveData = (status: number) => {
        const formData = new FormData();
        formData.append("document_head_id", data?.ref_no);
        formData.append("step", data?.step);
        formData.append("status", String(status));
        formData.append("remark", remark);
        formData.append("price", totalPrice);

        axios.patch('/api/admin/documents/QF-ITC-0001/approve/doc_no', formData, {
            // headers: {
            //     'Content-Type': 'application/json',
            // }
        })
            .then(response => {
                if (response.data.status === "success") {
                    toast({
                        title: 'Success',
                        description: "Document has been saved.",
                        status: 'success',
                        duration: 9000,
                        isClosable: true,
                    })
                    fetchData();
                } else {
                    toast({
                        title: 'Error',
                        description: response.data.message,
                        status: 'error',
                        duration: 9000,
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
                    duration: 9000,
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
                    duration: 9000,
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
            <main className="max-h-full max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6 py-5">
                {data == null ? "" :
                    <>
                        <StepsComponent current={data.step} status={statusStep} items={steps} />
                        <ProfileInformation data={data} />
                        <TableAsset data={data} totalPrice={totalPrice} trackStatus={trackStatus} ModalView={ModalView} ModalEdit={undefined} fetchData={undefined} />
                        {data?.step === 3 && trackStatus === 0 ?
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
    )
}
