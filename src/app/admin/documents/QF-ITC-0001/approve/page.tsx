'use client'

import React, { useState, useEffect } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Spinner } from "@nextui-org/react";
import Link from "next/link";
import axios from "axios";
import HeaderMain from "@/components/documents/QF-ITC-0001/HeaderMain";

const columns = [
    { key: "id", label: "#", },
    { key: "doc_no", label: "DOC NO.", },
    { key: "request_date", label: "REQUEST DATE", },
    { key: "request_by", label: "REQUEST BY", },
    { key: "title", label: "TITLE", },
];

export default function Home() {
    const [data, setData] = useState<any>(null); // เก็บข้อมูลที่ได้จาก API
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // เรียกใช้งาน API เพื่อดึงข้อมูล
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('/api/admin/documents/QF-ITC-0001/approve'); // เรียกใช้งาน API ที่เส้นทาง '/api'
            const data = response.data;
            setData(data); // เก็บข้อมูลที่ได้จาก API ลงใน state
            setIsLoading(false);
            // console.log(data);
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
            <HeaderMain title="| รอการอนุมัติ" />
            <main className="min-h-screen py-12 max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <Table aria-label="Example table with dynamic content">
                    <TableHeader columns={columns}>
                        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                    </TableHeader>
                    <TableBody
                        items={data}
                        emptyContent={"No rows to display."}
                        isLoading={isLoading}
                        loadingContent={<Spinner label="Loading..." />}
                    >
                        {data?.map((item: any, index: number) => (
                            <TableRow key={item.key}>
                                <TableCell>
                                    {index + 1}
                                </TableCell>
                                <TableCell>
                                    <Link href={`/admin/documents/QF-ITC-0001/approve/doc_no/${item.ref_no}`} className="text-blue-500">{item.ref_no}</Link>
                                </TableCell>
                                <TableCell>
                                    {item.start_date && new Date(item.start_date).toLocaleDateString('th-TH')}
                                </TableCell>
                                <TableCell>
                                    {item.Table_ITC_0001[0]?.request_by.username}
                                </TableCell>
                                <TableCell>
                                    <Chip color="primary" size="md" variant="flat">
                                        {item.Track_Doc[0].name}
                                    </Chip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </main>
        </>
    )
}
