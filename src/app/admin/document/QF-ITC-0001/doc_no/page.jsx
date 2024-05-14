'use client'

import React, { useState, useEffect, Suspense } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Tooltip,
    Chip,
    Divider,
    Textarea,
    Input,
    Button
} from "@nextui-org/react";
import { useToast } from "@chakra-ui/react";
import { Steps } from 'antd';
import { useSearchParams } from 'next/navigation';
import ModalViewItem from "./ModalViewItem";
import Approved from "@/images/Approved.png";
import Reject from "@/images/Reject.png";
import Image from "next/image";
import axios from "axios";

const columns1 = [
    {
        key: "id",
        label: "#",
    },
    {
        key: "asset",
        label: "ASSET",
    },
    {
        key: "detail",
        label: "DETAIL",
    },
    {
        key: "qty",
        label: "QTY",
    },
    {
        key: "action",
        label: "ACTION",
    },
];

const columns2 = [
    {
        key: "user1",
        label: "USER REQUEST",
    },
    {
        key: "IT1",
        label: "IT ATTACH DOCUMENT",
    },
    {
        key: "user2",
        label: "USER MANAGER APPROVE",
    },
    {
        key: "IT2",
        label: "IT APPROVE",
    },
    {
        key: "IT3",
        label: "IT MANAGER APPROVE",
    },
    {
        key: "status",
        label: "STATUS",
    }
];

export default function Home() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <MainContent />
        </Suspense>
    );
}

function MainContent() {
    const searchParams = useSearchParams();
    const doc_no = searchParams.get('doc_no');
    const [data, setData] = useState(null); // เก็บข้อมูลที่ได้จาก API
    const [file, setFile] = useState();
    const [price, setPrice] = useState();
    const toast = useToast();
    const [steps, setStep] = useState();
    const [statusStep, setStatusStep] = useState("");

    useEffect(() => {
        // เรียกใช้งาน API เพื่อดึงข้อมูล
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`/api/admin/document/QF-ITC-0001/doc_no?doc_no=${doc_no}`);
            if (response.status !== 200) {
                throw new Error('Failed to fetch data');
            }
            const data = response.data;
            setData(data);
            //console.log(data);
            const steps = data.Step.map((step, index) => {
                let status;
                if (step.status === 1) {
                    status = index === data.step ? "current" : "finished";
                } else if (step.status === 0) {
                    status = "waiting";
                } else if (step.status === 2) {
                    status = "error";
                    setStatusStep(status);
                }

                return {
                    title: index === data.step ? "In Process" : status === "waiting" ? "Waiting" : "Finished",
                    description: step.process.name,
                };
            });
            setStep(steps);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleConfirmSave = (status) => {
        if (price === undefined) {
            toast({
                title: 'Warning',
                description: "Please fill price.",
                status: 'warning',
                duration: 9000,
                isClosable: true,
            })
        } else {
            const formData = new FormData();
            formData.append("id", data.id);
            formData.append("step", data.step);
            formData.append("price", price);
            formData.append("file", file);
            formData.append("status", status);

            axios.patch('/api/admin/document/QF-ITC-0001/doc_no', formData, {
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
            {data == null ? "" :
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
                                                    {data.requestBy.firstname}
                                                </Chip>
                                            </div>
                                            <div>
                                                Emp ID.:
                                                <Chip color="primary" size="xs" variant="flat">
                                                    {data.requestBy.empId}
                                                </Chip>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4 pt-4">
                                        <div className="flex justify-start items-start space-x-4 flex-wrap">
                                            <div>
                                                Company:
                                                <Chip color="primary" size="xs" variant="flat">
                                                    {data.requestBy.company.name}
                                                </Chip>
                                            </div>
                                            <div>
                                                Position:
                                                <Chip color="primary" size="xs" variant="flat">
                                                    {data.requestBy.position.name}
                                                </Chip>
                                            </div>
                                            <div>
                                                Department/Section:{" "}
                                                <Chip color="primary" size="xs" variant="flat">
                                                    {data.requestBy.department.name}
                                                </Chip>
                                            </div>
                                            <div>
                                                Telephone/Mobile No.:{" "}
                                                <Chip color="primary" size="xs" variant="flat">
                                                    {data.requestBy.tel}
                                                </Chip>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                            <div className="pt-4">
                                <h2 className="text-lg font-medium text-gray-900">Purpose Of Usage</h2>
                                <Textarea
                                    readOnly
                                    placeholder="Please write in detail."
                                    size="lg"
                                    variant="bordered"
                                    value={data.purpose}
                                />
                            </div>
                        </div>
                        <Table aria-label="table asset">
                            <TableHeader columns={columns1}>
                                {(column) => <TableColumn key={column.key} className="text-sm">{column.label}</TableColumn>}
                            </TableHeader>
                            <TableBody items={data.Equipment} emptyContent={"No rows to display."}>
                                {data.Equipment.map((item, index) => (
                                    <TableRow key={item.id}>
                                        <TableCell className="text-base">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell className="text-base">
                                            {item.asset.name}
                                        </TableCell>
                                        <TableCell className="text-base">
                                            {item.detail.length > 40 ?
                                                `${item.detail.substring(0, 40)}...` : item.detail
                                            }
                                        </TableCell>
                                        <TableCell className="text-base">
                                            {item.qty}
                                        </TableCell>
                                        <TableCell>
                                            <ModalViewItem id={item.id} asset={item.asset.name} detail={item.detail} qty={item.qty} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        {data.step == 1 && data.Step[1].status == 0 ?
                            <div className="p-4 sm:p-8 bg-white border shadow-sm sm:rounded-lg w-75 mt-5">
                                <div>Price</div>
                                <Input
                                    required
                                    type="number"
                                    variant="bordered"
                                    className=" mb-3"
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                                <label for="file-input" class="sr-only">Choose file</label>
                                <input
                                    type="file"
                                    name="file-input"
                                    id="file-input"
                                    className="block w-full border border-gray-200 shadow-sm rounded-lg 
                                text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 
                                disabled:pointer-events-none file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4
                                mb-3"
                                    onChange={({ target }) => {
                                        if (target.files) {
                                            const file = target.files[0];
                                            setFile(file);
                                        }
                                    }}
                                />
                                <div className="mx-auto text-center">
                                    <Button color="success" className="text-white mr-1" onClick={() => handleConfirmSave(1)}>Approve</Button>
                                    <Button color="danger" onClick={() => handleConfirmSave(2)}>Reject</Button>
                                </div>
                            </div>
                            : ""}
                    </div>
                </main>
            }
        </>
    )
}