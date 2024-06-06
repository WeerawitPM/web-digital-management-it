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
    { key: "status", label: "STATUS", },
];

export default function Home({ params }: { params: any }) {
    const [data, setData] = useState<any>(); // เก็บข้อมูลที่ได้จาก API
    const [step, setStep] = useState([]);
    const status = parseInt(params.id); // Get the 'status' query parameter
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // เรียกใช้งาน API เพื่อดึงข้อมูล
        fetchData();
        // ตั้ง interval ให้เรียก fetchData ทุกๆ 10 วินาที
        const intervalId = setInterval(fetchData, 10000);

        // เคลียร์ interval เมื่อ component จะ unmount
        return () => clearInterval(intervalId);
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('/api/user/documents/QF-ITC-0001/detail');
            const data = response.data;
            setData(data);
            setIsLoading(false);

            const filteredData = data.filter((item: { status: number; }) => item.status === status);
            const stepsArray = filteredData.map((item: { Track_Doc: any[]; step: any; }) => {
                const trackItem = item.Track_Doc.find(track => track.step === item.step);
                return trackItem ? trackItem.name : '';
            });
            setStep(stepsArray);

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
                        : status === 1 ? "| คำร้องขอได้รับการอนุมัติ"
                            : "| คำร้องขอถูกปฏิเสธ"
                }
            />
            <main className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6 min-h-screen">
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
                        {data?.filter((item: any) => item.status === status).map((item: any, index: number) => (
                            <TableRow key={item.key}>
                                <TableCell>
                                    {index + 1}
                                </TableCell>
                                <TableCell>
                                    <Link
                                        href={`/user/documents/QF-ITC-0001/doc_no/${item.ref_no}`}
                                        className="text-blue-500">{item.ref_no}</Link>
                                </TableCell>
                                <TableCell>
                                    {item.start_date && new Date(item.start_date).toLocaleDateString('th-TH')}
                                </TableCell>
                                <TableCell>
                                    {item.Table_ITC_0001[0].request_by.username}
                                </TableCell>
                                <TableCell>
                                    <Chip color="primary" size="md" variant="flat">
                                        {step[index]}
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
