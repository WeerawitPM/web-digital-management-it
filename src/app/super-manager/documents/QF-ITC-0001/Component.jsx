"use client"

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import hourglass from "@/images/hourglass.png";
import rejected from "@/images/rejected.png";
import stamp from "@/images/stamp.png";
import axios from "axios";
import Link from "next/link";

export default function Component() {
    const [data, setData] = useState(null); // เก็บข้อมูลที่ได้จาก API

    useEffect(() => {
        // เรียกใช้งาน API เพื่อดึงข้อมูล
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('/api/super-manager/documents/QF-ITC-0001'); // เรียกใช้งาน API ที่เส้นทาง '/api'
            const data = response.data;
            setData(data); // เก็บข้อมูลที่ได้จาก API ลงใน state
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
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <div className="justify-start my-auto">
                        <span className="font-semibold text-md text-gray-800 leading-tight">
                            1.QF-TC-0001 ใบร้องขออุปกรณ์สารสนเทศ
                        </span>
                    </div>
                </div>
            </header>
            <main className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6 py-12">
                <div className="flex flex-col gap-4">
                    <h1 className="font-bold">สถานะคำร้องขออุปกรณ์</h1>
                    <div className="flex flex-row flex-wrap justify-center items-center gap-5">
                        <div className="p-5 bg-white rounded shadow-md">
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
                                        <div className="text-gray-400 text-lg">รอการอนุมัติ</div>
                                        <div className="text-4xl font-bold text-gray-900">
                                            {
                                                data ? data?.waitApprove : "0"
                                            }
                                        </div>
                                    </div>
                                </div>
                                <Link
                                    href={`/super-manager/documents/QF-ITC-0001/detail/${0}`}
                                    className="font-medium ms-40"
                                >
                                    <Button radius="full" color="primary" variant="flat">Detail</Button>
                                </Link>
                            </div>
                        </div>
                        <div className="p-5 bg-white rounded shadow-md">
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
                                        <div className="text-gray-400 text-lg">คำร้องขอที่อนุมัติ</div>
                                        <div className="text-4xl font-bold text-gray-900">
                                            {
                                                data ? data?.approved : "0"
                                            }
                                        </div>
                                    </div>
                                </div>
                                <Link
                                    href={`/super-manager/documents/QF-ITC-0001/detail/${1}`}
                                    className="font-medium ms-40"
                                >
                                    <Button radius="full" color="success" variant="flat">Detail</Button>
                                </Link>
                            </div>
                        </div>
                        <div className="p-5 bg-white rounded shadow-md">
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
                                        <div className="text-4xl font-bold text-gray-900">
                                            {
                                                data ? data?.rejected : "0"
                                            }
                                        </div>
                                    </div>
                                </div>
                                <Link
                                    href={`/super-manager/documents/QF-ITC-0001/detail/${2}`}
                                    className="font-medium ms-40"
                                >
                                    <Button radius="full" color="danger" variant="flat">Detail</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}