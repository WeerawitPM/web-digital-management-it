'use client'

import React, { useState, useEffect } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip } from "@nextui-org/react";
import Link from "next/link";
import axios from "axios";
import HeaderMain from "@/components/documents/QF-ITC-0001/HeaderMain";

const columns = [
    { key: "id", label: "#", },
    { key: "doc_no", label: "DOC NO.", },
    { key: "request_date", label: "REQUEST DATE", },
    { key: "request_by", label: "REQUEST BY", },
    { key: "status", label: "STATUS", },
];

export default function Home({ params }) {
    const [data, setData] = useState(null); // เก็บข้อมูลที่ได้จาก API
    const status = params.id;

    useEffect(() => {
        // เรียกใช้งาน API เพื่อดึงข้อมูล
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('/api/it-manager/documents/QF-ITC-0001/detail?status=' + status); // เรียกใช้งาน API ที่เส้นทาง '/api'
            const data = response.data;
            setData(data); // เก็บข้อมูลที่ได้จาก API ลงใน state
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
            <HeaderMain
                title={
                    status === 0 ? "| รอการอนุมัติ"
                        : status === 1 ? "| คำร้องขอที่อนุมัติ"
                            : "| คำร้องขอที่ปฏิเสธ"
                }
            />
            <main className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6 min-h-screen">
                <Table aria-label="Example table with dynamic content">
                    <TableHeader columns={columns}>
                        {(column) => <TableColumn key={column.key} className={column.textCenter}>{column.label}</TableColumn>}
                    </TableHeader>
                    {data == null ? <TableBody emptyContent={"No rows to display."} /> :
                        <TableBody items={data} emptyContent={"No rows to display."}>
                            {data.filter(item => item.step === 4).length === 0 ? (
                                data.map((item, index) => (
                                    <TableRow key={item.key}>
                                        <TableCell>
                                            {index + 1}
                                        </TableCell>
                                        <TableCell>
                                            <Link
                                                href={`/it-manager/documents/QF-ITC-0001/doc_no/${item.ref_no}`}
                                                className="text-blue-500">
                                                {item.ref_no}
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            {item.start_date && new Date(item.start_date).toLocaleDateString('th-TH')}
                                        </TableCell>
                                        <TableCell>
                                            {item.Table_ITC_0001[0].request_by.username}
                                        </TableCell>
                                        <TableCell>
                                            <Chip color="primary" size="xs" variant="flat">
                                                {item.Track_Doc.find(doc => doc.step === item.step)?.name || 'No matching step'}
                                            </Chip>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                data.filter(item => item.step === 4).map((item, index) => (
                                    <TableRow key={item.key}>
                                        <TableCell>
                                            {index + 1}
                                        </TableCell>
                                        <TableCell>
                                            <Link
                                                href={`/it-manager/documents/QF-ITC-0001/doc_no/${item.ref_no}`}
                                                className="text-blue-500">
                                                {item.ref_no}
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            {item.start_date && new Date(item.start_date).toLocaleDateString('th-TH')}
                                        </TableCell>
                                        <TableCell>
                                            {item.Table_ITC_0001[0].request_by.username}
                                        </TableCell>
                                        <TableCell>
                                            <Chip color="primary" size="xs" variant="flat">
                                                {item.Track_Doc.find(doc => doc.step === item.step)?.name || 'No matching step'}
                                            </Chip>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    }
                </Table>
            </main>
        </>
    )
}
