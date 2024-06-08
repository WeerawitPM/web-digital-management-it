import Image from "next/image";
import React from "react";
import { Button, Card } from "@nextui-org/react";
import hourglass from "@/images/hourglass.png";
import rejected from "@/images/rejected.png";
import stamp from "@/images/stamp.png";
import delivery from "@/images/delivery.png"
import dataAnalysis from "@/images/data-analysis.png"
import Link from "next/link";
import HeaderMain from "@/components/documents/QF-ITC-0003/HeaderMain";

export default function Component({ data }: { data: any }) {

    return (
        <>
            <HeaderMain title="" />
            <main className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6 py-12 min-h-screen">
                <div className="flex flex-col gap-4">
                    <h1 className="font-bold">สถานะคำร้องขออุปกรณ์</h1>
                    <div className="flex flex-row flex-wrap justify-center items-center gap-5">
                        <Card className="p-5 rounded">
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
                                        <div className="text-gray-400 text-lg">รอรับคำร้อง</div>
                                        <div className="text-4xl font-bold text-foreground">
                                            {
                                                data ? data?.waitAccept : "0"
                                            }
                                        </div>
                                    </div>
                                </div>
                                <Link
                                    href="/admin/documents/QF-ITC-0003/accept"
                                    className="font-medium ms-40"
                                >
                                    <Button radius="full" color="primary" variant="flat">Detail</Button>
                                </Link>
                            </div>
                        </Card>
                        <Card className="p-5 rounded">
                            <div className="flex flex-col">
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center justify-center w-12 h-12 rounded-full">
                                        <Image
                                            src={delivery}
                                            alt="1"
                                            width={100}
                                            height={100}
                                            priority
                                        />
                                    </div>
                                    <div>
                                        <div className="text-gray-400 text-lg">รอการส่งมอบ</div>
                                        <div className="text-4xl font-bold text-foreground">
                                            {
                                                data ? data?.waitDelivers : "0"
                                            }
                                        </div>
                                    </div>
                                </div>
                                <Link
                                    href="/admin/documents/QF-ITC-0003/approve"
                                    className="font-medium ms-40"
                                >
                                    <Button radius="full" color="success" variant="flat">Detail</Button>
                                </Link>
                            </div>
                        </Card>
                        <Card className="p-5 rounded">
                            <div className="flex flex-col">
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center justify-center w-12 h-12 rounded-full">
                                        <Image
                                            src={dataAnalysis}
                                            alt="1"
                                            width={100}
                                            height={100}
                                            priority
                                        />
                                    </div>
                                    <div>
                                        <div className="text-gray-400 text-lg">รอสรุปผลการดำเนินงาน</div>
                                        <div className="text-4xl font-bold text-foreground">
                                            {
                                                data ? data?.waitSummary : "0"
                                            }
                                        </div>
                                    </div>
                                </div>
                                <Link
                                    href="/admin/documents/QF-ITC-0003/reject"
                                    className="font-medium ms-40"
                                >
                                    <Button radius="full" color="secondary" variant="flat">Detail</Button>
                                </Link>
                            </div>
                        </Card>
                        <Card className="p-5 rounded">
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
                                    href="/admin/documents/QF-ITC-0003/reject"
                                    className="font-medium ms-40"
                                >
                                    <Button radius="full" color="danger" variant="flat">Detail</Button>
                                </Link>
                            </div>
                        </Card>
                        <Card className="p-5 rounded">
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
                                    href="/admin/documents/QF-ITC-0003/all"
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