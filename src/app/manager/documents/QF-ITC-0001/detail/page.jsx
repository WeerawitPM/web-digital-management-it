'use client'

import React, { useState, useEffect } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip } from "@nextui-org/react";
import Link from "next/link";
import axios from "axios";
import { useSearchParams } from "next/navigation";

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
        key: "status",
        label: "STATUS",
    },
];

export default function Home() {
    const [data, setData] = useState(null); // เก็บข้อมูลที่ได้จาก API
    const [step, setStep] = useState([]);
    const searchParams = useSearchParams();
    const status = parseInt(searchParams.get('status')); // Get the 'status' query parameter

    useEffect(() => {
        // เรียกใช้งาน API เพื่อดึงข้อมูล
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('/api/manager/documents/QF-ITC-0001/detail'); // เรียกใช้งาน API ที่เส้นทาง '/api'
            const data = response.data;

            setData(data); // เก็บข้อมูลที่ได้จาก API ลงใน state

            data.map((item) => {
                // วนลูปผ่าน Track_Doc ของแต่ละ item
                item.Track_Doc.map((trackItem) => {
                    // ตรวจสอบว่า status เป็น 1 หรือไม่ และ trackItem.step เท่ากับ status หรือไม่
                    if (trackItem.step === item.step) {
                        // ใช้ spread operator (...) ในการเพิ่มข้อมูลใน state อย่างถูกต้อง
                        setStep(prevStatus => [...prevStatus, trackItem.name]);
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
                    <div className="justify-start my-auto">
                        <span className="font-semibold text-md text-gray-800 leading-tight">
                            1.QF-TC-0001 ใบร้องขออุปกรณ์สารสนเทศ
                        </span>
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
                                    {data.filter((item) => item.Track_Doc[2].status === status).map((item, index) => (
                                        <TableRow key={item.key}>
                                            <TableCell>
                                                {index + 1}
                                            </TableCell>
                                            <TableCell>
                                                <Link href={{ pathname: '/manager/documents/QF-ITC-0001/doc_no', query: { doc_no: item.ref_no } }} className="text-blue-500">{item.ref_no}</Link>
                                            </TableCell>
                                            <TableCell>
                                                {item.start_date && new Date(item.start_date).toLocaleDateString('th-TH')}
                                            </TableCell>
                                            <TableCell>
                                                {item.Table_ITC_0001[0].request_by.username}
                                            </TableCell>
                                            <TableCell>
                                                <Chip color="primary" size="xs" variant="flat">
                                                    {step[index]}
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
