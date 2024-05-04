'use client'

import React, { useState, useEffect } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip } from "@nextui-org/react";
import { Button } from '@chakra-ui/react'
import { AddIcon } from "@chakra-ui/icons";
import Link from "next/link";
import Approved from "@/images/Approved.png";
import Reject from "@/images/Reject.png";
import Image from "next/image";

const columns = [
    {
        key: "id",
        label: "#",
    },
    {
        key: "doc_no",
        label: "DOC NO.",
    },
    {
        key: "request_date",
        label: "REQUEST DATE",
    },
    {
        key: "request_by",
        label: "REQUEST BY",
    },
    {
        key: "title",
        label: "TITLE",
    },
    {
        key: "manager1",
        label: "Manager1",
        textCenter: "text-center"
    },
    {
        key: "manager2",
        label: "Manager2",
        textCenter: "text-center"
    },
    {
        key: "manager3",
        label: "Manager3",
        textCenter: "text-center"
    },
    {
        key: "status",
        label: "STATUS",
    },
];

export default function Home() {
    const [requestData, setRequestData] = useState(null); // เก็บข้อมูลที่ได้จาก API
    useEffect(() => {
        // เรียกใช้งาน API เพื่อดึงข้อมูล
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('/api/request_equipment'); // เรียกใช้งาน API ที่เส้นทาง '/api'
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
                        <div className="justify-start my-auto">
                            <span className="font-semibold text-md text-gray-800 leading-tight">
                                1.QF-TC-0001 ใบร้องขออุปกรณ์สารสนเทศ
                            </span>
                        </div>
                        <div className="justify-end">
                            <Link href="/request_equipment/add">
                                <Button colorScheme="blue" leftIcon={<AddIcon />} size='sm'>
                                    เพิ่มรายการร้องขอ
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>
            <main>
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                        <Table aria-label="Example table with dynamic content">
                            <TableHeader columns={columns}>
                                {(column) => <TableColumn key={column.key} className={column.textCenter}>{column.label}</TableColumn>}
                            </TableHeader>
                            {requestData == null ? <TableBody emptyContent={"No rows to display."} /> :
                                <TableBody items={requestData} emptyContent={"No rows to display."}>
                                    {requestData.map((item, index) => (
                                        <TableRow key={item.key}>
                                            <TableCell>
                                                {index + 1}
                                            </TableCell>
                                            <TableCell>
                                                <Link href={{ pathname: '/request_equipment/doc', query: { doc_no: item.id } }} className="text-blue-500">{item.id}</Link>
                                            </TableCell>
                                            <TableCell>
                                                {item.requestDate && new Date(item.requestDate).toLocaleDateString('th-TH')}
                                            </TableCell>
                                            <TableCell>
                                                {item.requestBy.username}
                                            </TableCell>
                                            <TableCell>
                                                {item.purpose}
                                            </TableCell>
                                            {[...Array(3)].map((_, index) => (
                                                <TableCell key={index}>
                                                    {item.ApproveEquipment[index] ?
                                                        (item.ApproveEquipment[index].status === "Approve" ? <Image width={25} height={25} src={Approved} alt="Image" className="mx-auto" /> :
                                                            item.ApproveEquipment[index].status === "Reject" ? <Image width={25} height={25} src={Reject} alt="Image" className="mx-auto"/> : "") :
                                                        null
                                                    }
                                                </TableCell>
                                            ))}
                                            <TableCell>
                                                {
                                                    item.status === "Approved" ?
                                                        <Chip color="success" size="xs" variant="flat">
                                                            {item.status}
                                                        </Chip> :
                                                        item.status === "Wait Approve" ?
                                                            <Chip color="warning" size="xs" variant="flat">
                                                                {item.status}
                                                            </Chip> :
                                                            item.status === "Reject" ?
                                                                <Chip color="danger" size="xs" variant="flat">
                                                                    {item.status}
                                                                </Chip> : ""
                                                }
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            }
                        </Table>
                    </div>
                </div>
            </main>
        </>
    )
}
