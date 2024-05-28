'use client'

import React, { useState } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Chip,
    Textarea,
} from "@nextui-org/react";
import { useToast, Button } from "@chakra-ui/react";
import { Steps } from 'antd';
import ModalView from "./ModalView";
import axios from "axios";
import ModalEdit from "./ModalEdit";

const columns1 = [
    { key: "id", label: "#", },
    { key: "asset", label: "ASSET", },
    { key: "purpose", label: "PURPOSE OF USAGE", },
    { key: "device", label: "DEVICE SPECIFICATION", },
    { key: "qty", label: "QTY", },
    { key: "price", label: "PRICE", },
    { key: "action", label: "ACTION", },
];

export default function Component(params) {
    const data = params.data; // เก็บข้อมูลที่ได้จาก API
    const toast = useToast();
    const steps = params.steps;
    const statusStep = params.statusStep;
    const trackStatus = params.trackStatus;
    const totalPrice = params.totalPrice;
    const [remark, setRemark] = useState(null);

    const saveData = (status) => {
        const formData = new FormData();
        formData.append("document_head_id", data?.ref_no);
        formData.append("step", data?.step);
        formData.append("status", status);
        formData.append("remark", remark);

        axios.patch('/api/admin/documents/QF-ITC-0001/attach_document/doc_no', formData, {
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
                    params.fetchData();
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
                        <div className="p-4 sm:p-8 bg-white border shadow-sm sm:rounded-lg w-75 mt-5">
                            <div className="pb-4">
                                <section className="">
                                    <header>
                                        <h2 className="text-lg font-medium text-gray-900">
                                            Profile Information
                                        </h2>
                                    </header>
                                    <div className="flex w-full flex-wrap md:flex-wrap gap-4 pt-4">
                                        <div className="flex justify-start items-start space-x-4">
                                            <div>
                                                Name:{""}
                                                <Chip color="primary" size="xs" variant="flat">
                                                    {`${data.Table_ITC_0001[0].request_by.firstname} ${data.Table_ITC_0001[0].request_by.lastname}`}
                                                </Chip>
                                            </div>
                                            <div>
                                                Emp ID.:
                                                <Chip color="primary" size="xs" variant="flat">
                                                    {data.Table_ITC_0001[0].request_by.emp_id}
                                                </Chip>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4 pt-4">
                                        <div className="flex justify-start items-start space-x-4 flex-wrap">
                                            <div>
                                                Company:
                                                <Chip color="primary" size="xs" variant="flat">
                                                    {data.Table_ITC_0001[0].request_by.company.name}
                                                </Chip>
                                            </div>
                                            <div>
                                                Position:
                                                <Chip color="primary" size="xs" variant="flat">
                                                    {data.Table_ITC_0001[0].request_by.position.name}
                                                </Chip>
                                            </div>
                                            <div>
                                                Department/Section:{" "}
                                                <Chip color="primary" size="xs" variant="flat">
                                                    {data.Table_ITC_0001[0].request_by.department.name}
                                                </Chip>
                                            </div>
                                            <div>
                                                Telephone/Mobile No.:{" "}
                                                <Chip color="primary" size="xs" variant="flat">
                                                    {data.Table_ITC_0001[0].request_by.tel}
                                                </Chip>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                        <Table aria-label="table asset">
                            <TableHeader columns={columns1}>
                                {(column) => <TableColumn key={column.key} className="text-sm">{column.label}</TableColumn>}
                            </TableHeader>
                            <TableBody items={data.Equipment} emptyContent={"No rows to display."}>
                                {data?.Table_ITC_0001?.map((item, index) => (
                                    <TableRow key={item.id}>
                                        <TableCell className="text-base">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell className="text-base">
                                            {item.asset.name}
                                        </TableCell>
                                        <TableCell className="text-base">
                                            {item.purpose.length > 40 ?
                                                `${item.purpose.substring(0, 40)}...` : item.purpose
                                            }
                                        </TableCell>
                                        <TableCell className="text-base">
                                            {item.spec_detail.length > 40 ?
                                                `${item.spec_detail.substring(0, 40)}...` : item.spec_detail
                                            }
                                        </TableCell>
                                        <TableCell className="text-base">
                                            {item.qty}
                                        </TableCell>
                                        <TableCell className="text-base">
                                            {item.price}
                                        </TableCell>
                                        <TableCell>
                                            <ModalView
                                                id={item.id}
                                                asset={item.asset.name}
                                                purpose={item.purpose}
                                                spec_detail={item.spec_detail}
                                                qty={item.qty}
                                                price={item.price}
                                                ref_quotation={item.Table_Ref_Quotation}
                                            />
                                            {data?.step == 1 && trackStatus == 0 ?
                                                <ModalEdit
                                                    id={item.id}
                                                    price={item.price}
                                                    ref_quotation={item.Table_Ref_Quotation}
                                                    fetchData={params.fetchData}
                                                />
                                                : ""
                                            }
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <div className="text-center">
                            <Chip color="success" size="lg" variant="flat">
                                <div className="font-medium">Total Price: {totalPrice}</div>
                            </Chip>
                        </div>
                        {data.Track_Doc
                            .filter(index => index?.remark && index.remark !== "null" && index.remark.trim() !== "")
                            .map((index) => (
                                <div key={index.step} className="text-center">
                                    <Chip color="danger" size="lg" variant="flat">
                                        Remark : {index.remark}
                                    </Chip>
                                </div>
                            ))}
                        {data?.step == 1 && trackStatus == 0 ?
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
    )
}
