"use client"

import Image from "next/image";
import React from "react";
import { Button } from "@nextui-org/react";
import hourglass from "@/images/hourglass.png"
import rejected from "@/images/rejected.png"
import stamp from "@/images/stamp.png"

export default function ManagerPage() {
    return (
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
                                        data ? data.requestEquipment.waitApprove : "0"
                                    }
                                </div>
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
                                    src={rejected}
                                    alt="1"
                                    width={100}
                                    height={100}
                                    priority
                                />
                            </div>
                            <div>
                                <div className="text-gray-400 text-lg">คำร้องขอถูกปฏิเสธ</div>
                                <div className="text-4xl font-bold text-gray-900">
                                    {
                                        data ? data.requestEquipment.rejected : "0"
                                    }
                                </div>
                            </div>
                        </div>
                        <Button radius="full" color="danger" variant="flat" className="font-medium ms-40">Detail</Button>
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
                                <div className="text-gray-400 text-lg">คำร้องขอได้รับการอนุมัติ</div>
                                <div className="text-4xl font-bold text-gray-900">
                                    {
                                        data ? data.requestEquipment.approved : "0"
                                    }
                                </div>
                            </div>
                        </div>
                        <Button radius="full" color="success" variant="flat" className="font-medium ms-40">Detail</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}