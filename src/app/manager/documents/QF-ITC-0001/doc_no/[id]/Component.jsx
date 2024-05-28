'use client'

import React, { useState } from "react";
import { Textarea } from "@nextui-org/react";
import { Button, useToast } from "@chakra-ui/react";
import ModalViewItem from "./ModalViewItem";
import axios from "axios";
import { Steps } from 'antd';
import ProfileInformation from "@/components/ProfileInformation";
import TableAsset from "@/components/TableAsset";

export default function Component({ data, steps, statusStep, totalPrice, trackStatus, fetchData }) {
    const [remark, setRemark] = useState(null);
    const toast = useToast();

    const saveData = (status) => {
        const formData = new FormData();
        formData.append("document_head_id", data?.ref_no);
        formData.append("step", data?.step);
        formData.append("status", status);
        formData.append("remark", remark);

        axios.patch('/api/manager/documents/QF-ITC-0001/doc_no', formData, {
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
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between flex-wrap">
                        <div className="justify-start">
                            <span className="font-semibold text-md text-gray-800 leading-tight">
                                แบบฟอร์มใบร้องขออุปกรณ์สารสนเทศ
                            </span>
                        </div>
                    </div>
                </div>
            </header>
            {data === null ? "" :
                <main>
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6 mb-5">
                        <Steps
                            current={data.step}
                            status={statusStep == "" ? "process" : statusStep}
                            items={steps}
                            className="mt-5"
                        />
                        <ProfileInformation data={data} />
                        <TableAsset data={data} totalPrice={totalPrice} ModalView={ModalViewItem} />
                        {data?.step == 2 && trackStatus == 0 ?
                            <div className="p-4 sm:p-8 bg-white border shadow-sm sm:rounded-lg w-75 mt-5">
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
                            </div>
                            : ""}
                    </div>
                </main>
            }
        </>
    );
}