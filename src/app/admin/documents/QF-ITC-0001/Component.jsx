"use client"

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Button, Card } from "@nextui-org/react";
import hourglass from "@/images/hourglass.png";
import rejected from "@/images/rejected.png";
import stamp from "@/images/stamp.png";
import axios from "axios";
import Link from "next/link";
import { Navbar } from "@nextui-org/react";
import HeaderMain from "@/components/documents/QF-ITC-0001/HeaderMain";

export default function Component() {
    const [data, setData] = useState(null); // เก็บข้อมูลที่ได้จาก API

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
            const response = await axios.get('/api/admin/documents/QF-ITC-0001'); // เรียกใช้งาน API ที่เส้นทาง '/api'
            const data = response.data;
            setData(data); // เก็บข้อมูลที่ได้จาก API ลงใน state
            console.log(data);
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
            <HeaderMain title="1.QF-TC-0001 ใบร้องขออุปกรณ์สารสนเทศ" />
            <main className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6 py-12 min-h-screen">
                <div className="flex flex-col gap-4">
                    <h1 className="font-bold">สถานะคำร้องขออุปกรณ์</h1>
                    <div className="flex flex-row flex-wrap justify-center items-center gap-5">
                        <Card className="p-5 rounded shadow-md">
                            <div className="flex flex-col">
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center justify-center w-12 h-12 rounded-full">
                                        <Image
                                            src={hourglass}
                                            alt="1"
                                            width={100}
                                            height={100}
                                            priority
                                        />
                                    </div>
                                    <div>
                                        <div className="text-gray-400 text-lg">รอแนบใบเสนอราคา</div>
                                        <div className="text-4xl font-bold text-foreground">
                                            {
                                                data ? data?.waitAttach : "0"
                                            }
                                        </div>
                                    </div>
                                </div>
                                <Link
                                    href="/admin/documents/QF-ITC-0001/attach_document"
                                    className="font-medium ms-40"
                                >
                                    <Button radius="full" color="primary" variant="flat">Detail</Button>
                                </Link>
                            </div>
                        </Card>
                        <Card className="p-5 rounded shadow-md">
                            <div className="flex flex-col">
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center justify-center w-12 h-12 rounded-full">
                                        <Image
                                            src={stamp}
                                            alt="1"
                                            width={100}
                                            height={100}
                                            priority
                                        />
                                    </div>
                                    <div>
                                        <div className="text-gray-400 text-lg">รอการอนุมัติ</div>
                                        <div className="text-4xl font-bold text-foreground">
                                            {
                                                data ? data?.waitApprove : "0"
                                            }
                                        </div>
                                    </div>
                                </div>
                                <Link
                                    href="/admin/documents/QF-ITC-0001/approve"
                                    className="font-medium ms-40"
                                >
                                    <Button radius="full" color="success" variant="flat">Detail</Button>
                                </Link>
                            </div>
                        </Card>
                        <Card className="p-5 rounded shadow-md">
                            <div className="flex flex-col">
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center justify-center w-12 h-12 rounded-full">
                                        <Image
                                            src={rejected}
                                            alt="1"
                                            width={100}
                                            height={100}
                                            priority
                                        />
                                    </div>
                                    <div>
                                        <div className="text-gray-400 text-lg">คำร้องขอที่ปฏิเสธ</div>
                                        <div className="text-4xl font-bold text-foreground">
                                            {
                                                data ? data?.rejected : "0"
                                            }
                                        </div>
                                    </div>
                                </div>
                                <Link
                                    href="/admin/documents/QF-ITC-0001/reject"
                                    className="font-medium ms-40"
                                >
                                    <Button radius="full" color="danger" variant="flat">Detail</Button>
                                </Link>
                            </div>
                        </Card>
                        <Card className="p-5 rounded shadow-md">
                            <div className="flex flex-col">
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center justify-center w-12 h-12 rounded-full">
                                        <Image
                                            src={stamp}
                                            alt="1"
                                            width={100}
                                            height={100}
                                            priority
                                        />
                                    </div>
                                    <div>
                                        <div className="text-gray-400 text-lg">คำขอทั้งหมด</div>
                                        <div className="text-4xl font-bold text-foreground">
                                            {
                                                data ? data?.allDocuments : "0"
                                            }
                                        </div>
                                    </div>
                                </div>
                                <Link
                                    href="/admin/documents/QF-ITC-0001/all"
                                    className="font-medium ms-40"
                                >
                                    <Button radius="full" color="warning" variant="flat">Detail</Button>
                                </Link>
                            </div>
                        </Card>
                    </div>
                </div>
                {/* <Divider /> */}
            </main>
        </>
    );
}