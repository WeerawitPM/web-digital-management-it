'use client'

import React, { useState, useEffect } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip } from "@nextui-org/react";
import { Button } from '@chakra-ui/react'
import { AddIcon } from "@chakra-ui/icons";
import Link from "next/link";
import Approved from "@/images/Approved.png";
import Reject from "@/images/Reject.png";
import Image from "next/image";
import axios from "axios";

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
    // {
    //     key: "manager1",
    //     label: "Manager1",
    //     textCenter: "text-center"
    // },
    // {
    //     key: "manager2",
    //     label: "Manager2",
    //     textCenter: "text-center"
    // },
    // {
    //     key: "manager3",
    //     label: "Manager3",
    //     textCenter: "text-center"
    // },
    {
        key: "status",
        label: "STATUS",
    },
];

export default function Home() {
    const [data, setData] = useState(null); // เก็บข้อมูลที่ได้จาก API
    const [status, setStatus] = useState([]);

    useEffect(() => {
        // เรียกใช้งาน API เพื่อดึงข้อมูล
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('/api/user/QF-ITC-0001'); // เรียกใช้งาน API ที่เส้นทาง '/api'
            const data = response.data;

            setData(data); // เก็บข้อมูลที่ได้จาก API ลงใน state

            data.map((item) => {
                // วนลูปผ่าน Track_Doc ของแต่ละ item
                item.Track_Doc.map((trackItem) => {
                    // ตรวจสอบว่า status เป็น 1 หรือไม่ และ trackItem.step เท่ากับ status หรือไม่
                    if (trackItem.step === item.status) {
                        // ใช้ spread operator (...) ในการเพิ่มข้อมูลใน state อย่างถูกต้อง
                        setStatus(prevStatus => [...prevStatus, trackItem.name]);
                    }
                });
            });

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Global error handling
    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            console.error('Error fetching data:', error);
            return Promise.reject(error);
        }
    );

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
                            <Link href="/user/QF-ITC-0001/add">
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
                            {data == null ? <TableBody emptyContent={"No rows to display."} /> :
                                <TableBody items={data} emptyContent={"No rows to display."}>
                                    {data.map((item, index) => (
                                        <TableRow key={item.key}>
                                            <TableCell>
                                                {index + 1}
                                            </TableCell>
                                            <TableCell>
                                                <Link href={{ pathname: '/user/QF-ITC-0001/doc_no', query: { doc_no: item.ref_no } }} className="text-blue-500">{item.ref_no}</Link>
                                            </TableCell>
                                            <TableCell>
                                                {item.start_date && new Date(item.start_date).toLocaleDateString('th-TH')}
                                            </TableCell>
                                            <TableCell>
                                                {item.Table_ITC_0001[0].request_by.username}
                                            </TableCell>
                                            {/* {[...Array(3)].map((_, index) => (
                                                <TableCell key={index}>
                                                    {item.ApproveEquipment[index] ?
                                                        (item.ApproveEquipment[index].status === "Approved" ? <Image width={25} height={25} src={Approved} alt="Image" className="mx-auto" /> :
                                                            item.ApproveEquipment[index].status === "Rejected" ? <Image width={25} height={25} src={Reject} alt="Image" className="mx-auto" /> : "") :
                                                        null
                                                    }
                                                </TableCell>
                                            ))} */}
                                            <TableCell>
                                                <Chip color="primary" size="xs" variant="flat">
                                                    {status[index]}
                                                </Chip>
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
