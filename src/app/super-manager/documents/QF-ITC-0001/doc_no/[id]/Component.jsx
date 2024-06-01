'use client'

import React, { useState } from "react";
import { Card, Textarea } from "@nextui-org/react";
import { Button, useToast } from "@chakra-ui/react";
import ModalViewItem from "./ModalViewItem";
import axios from "axios";
import ProfileInformation from "@/components/ProfileInformation";
import TableAsset from "@/components/documents/QF-ITC-0001/TableAsset";
import HeaderDoc from "@/components/documents/QF-ITC-0001/HeaderDoc";
import StepsComponent from "@/components/documents/QF-ITC-0001/Steps";

export default function Component({ data, steps, statusStep, totalPrice, trackStatus, fetchData, doc_no }) {
    const [remark, setRemark] = useState(null);
    const toast = useToast();

    const saveData = (status) => {
        const formData = new FormData();
        formData.append("document_head_id", data?.ref_no);
        formData.append("step", data?.step);
        formData.append("status", status);
        formData.append("remark", remark);
        formData.append("price", totalPrice);

        axios.patch('/api/super-manager/documents/QF-ITC-0001/doc_no', formData, {
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

    const handleConfirmSave = (status) => {
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
            <main className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6 min-h-screen py-5">
                {data === null ? "" :
                    <>
                        <StepsComponent current={data.step} status={statusStep} items={steps} />
                        <ProfileInformation data={data} />
                        <TableAsset data={data} totalPrice={totalPrice} ModalView={ModalViewItem} />
                        {data?.step == 5 && trackStatus == 0 ?
                            <Card className="p-4 sm:p-8 sm:rounded-lg w-75">
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
                            </Card>
                            : ""}
                    </>
                }
            </main>
        </>
    );
}