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
    Textarea
} from "@nextui-org/react";
import { useSearchParams } from 'next/navigation';
import ModalViewItem from "../doc/ModalViewItem";
import Approved from "@/images/Approved.png";
import Reject from "@/images/Reject.png";
import Image from "next/image";

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
        key: "manager1",
        label: "MANAGER1",
    },
    {
        key: "manager2",
        label: "MANAGER2",
    },
    {
        key: "manager3",
        label: "MANAGER3",
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
    const [requestData, setRequestData] = useState(null); // เก็บข้อมูลที่ได้จาก API
    useEffect(() => {
        // เรียกใช้งาน API เพื่อดึงข้อมูล
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/request_equipment/doc_no?doc_no=${doc_no}`); // เรียกใช้งาน API ที่เส้นทาง '/api'
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setRequestData(data); // เก็บข้อมูลที่ได้จาก API ลงใน state
            // console.log(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

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
            {requestData == null ? "" :
                <main>
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6 mb-5">
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
                                                    {requestData.requestBy.firstname}
                                                </Chip>
                                            </div>
                                            <div>
                                                Emp ID.:
                                                <Chip color="primary" size="xs" variant="flat">
                                                    {requestData.requestBy.empId}
                                                </Chip>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4 pt-4">
                                        <div className="flex justify-start items-start space-x-4 flex-wrap">
                                            <div>
                                                Company:
                                                <Chip color="primary" size="xs" variant="flat">
                                                    {requestData.requestBy.company.name}
                                                </Chip>
                                            </div>
                                            <div>
                                                Position:
                                                <Chip color="primary" size="xs" variant="flat">
                                                    {requestData.requestBy.position.name}
                                                </Chip>
                                            </div>
                                            <div>
                                                Department/Section:{" "}
                                                <Chip color="primary" size="xs" variant="flat">
                                                    {requestData.requestBy.department.name}
                                                </Chip>
                                            </div>
                                            <div>
                                                Telephone/Mobile No.:{" "}
                                                <Chip color="primary" size="xs" variant="flat">
                                                    {requestData.requestBy.tel}
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
                                    value={requestData.purpose}
                                />
                            </div>
                        </div>
                        <Table aria-label="table asset">
                            <TableHeader columns={columns1}>
                                {(column) => <TableColumn key={column.key} className="text-sm">{column.label}</TableColumn>}
                            </TableHeader>
                            <TableBody items={requestData.Equipment} emptyContent={"No rows to display."}>
                                {requestData.Equipment.map((item, index) => (
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

                        <Table aria-label="table approve" className="mx-auto">
                            <TableHeader columns={columns2} className="text-center">
                                {(column) => <TableColumn key={column.key} className="text-sm">{column.label}</TableColumn>}
                            </TableHeader>
                            <TableBody items={requestData} emptyContent={"No rows to display."}>
                                <TableRow key={requestData.id}>
                                    {[...Array(3)].map((_, index) => (
                                        <TableCell key={index}>
                                            {requestData.ApproveEquipment[index] ?
                                                (requestData.ApproveEquipment[index].status === "Approved" ? <Image width={25} height={25} src={Approved} alt="Image" className="mx-auto"/> :
                                                    requestData.ApproveEquipment[index].status === "Rejected" ? <Image width={25} height={25} src={Reject} alt="Image" className="mx-auto"/> : "") :
                                                null
                                            }
                                        </TableCell>
                                    ))}
                                    <TableCell>
                                        {requestData.status === "Approved" ? (
                                            <Chip color="success" size="xs" variant="flat">
                                                {requestData.status}
                                            </Chip>
                                        ) : requestData.status === "Wait Approve" ? (
                                            <Chip color="warning" size="xs" variant="flat">
                                                {requestData.status}
                                            </Chip>
                                        ) : requestData.status === "Rejected" ? (
                                            <Chip color="danger" size="xs" variant="flat">
                                                {requestData.status}
                                            </Chip>
                                        ) : (
                                            ""
                                        )}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </main>
            }
        </>
    )
}
