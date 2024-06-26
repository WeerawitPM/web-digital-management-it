"use client"

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Button, Divider } from "@nextui-org/react";
import hourglass from "@/images/hourglass.png"
import mechanic from "@/images/mechanic.png"
import done from "@/images/done.png"

export default function Component() {
    // const [data, setData] = useState(null); // เก็บข้อมูลที่ได้จาก API

    // useEffect(() => {
    //     // เรียกใช้งาน API เพื่อดึงข้อมูล
    //     fetchData();
    // }, []);

    // const fetchData = async () => {
    //     try {
    //         const response = await fetch('/api/dashboard'); // เรียกใช้งาน API ที่เส้นทาง '/api'
    //         if (!response.ok) {
    //             throw new Error('Failed to fetch data');
    //         }
    //         const data = await response.json();
    //         setData(data); // เก็บข้อมูลที่ได้จาก API ลงใน state
    //         // console.log(data);
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     }
    // };

    return (
        <>
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <div className="justify-start my-auto">
                        <span className="font-semibold text-md text-gray-800 leading-tight">
                            Dashboard | Admin
                        </span>
                    </div>
                </div>
            </header>
            <main className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6 py-12">
                <div className="flex flex-col gap-4">
                    <h1 className="font-bold">สถานะการแจ้งซ่อม</h1>
                    <div className="flex flex-row flex-wrap justify-center items-center gap-5 mb-5">
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
                                        <div className="text-gray-400 text-lg">รอรับเรื่อง</div>
                                        <div className="text-4xl font-bold text-gray-900">0</div>
                                    </div>
                                </div>
                                <Button radius="full" color="primary" variant="flat" className="font-medium ms-40">Detail</Button>
                            </div>
                        </div>
                        <div className="p-5 bg-white rounded shadow-md">
                            <div className="flex flex-col">
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center justify-center w-12 h-12 rounded-full">
                                        <Image
                                            src={mechanic}
                                            alt="1"
                                            width={100}
                                            height={100}
                                            priority
                                        />
                                    </div>
                                    <div>
                                        <div className="text-gray-400 text-lg">กำลังดำเนินการ</div>
                                        <div className="text-4xl font-bold text-gray-900">0</div>
                                    </div>
                                </div>
                                <Button radius="full" color="warning" variant="flat" className="font-medium ms-40">Detail</Button>
                            </div>
                        </div>
                        <div className="p-5 bg-white rounded shadow-md">
                            <div className="flex flex-col">
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center justify-center w-12 h-12 rounded-full">
                                        <Image
                                            src={done}
                                            alt="1"
                                            width={100}
                                            height={100}
                                            priority
                                        />
                                    </div>
                                    <div>
                                        <div className="text-gray-400 text-lg">ดำเนินการเสร็จสิ้น</div>
                                        <div className="text-4xl font-bold text-gray-900">0</div>
                                    </div>
                                </div>
                                <Button radius="full" color="success" variant="flat" className="font-medium ms-40">Detail</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}