"use client"

import Image from "next/image";
import React from "react";
import { Card, CardBody } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import asset from "@/images/asset.png";
import mechanic from "@/images/mechanic.png";
import system from "@/images/system.png";

export default function HomeComponent({ role }: { role: string }) {
    return (
        <main className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6 py-12 min-h-screen">
            <div className="flex flex-row flex-wrap justify-center gap-10">
                {role === "admin" ?
                    <div className="d-flex text-center">
                        <Card>
                            <CardBody>
                                <Image src={system} width={200} height={200} unoptimized className="mb-5" alt='image' />
                                <Link href={`/${role}/manage/company`}>
                                    <Button radius="sm" color="primary" variant="flat" className="font-medium w-[200px] text-base">Go to page</Button>
                                </Link>
                            </CardBody>
                        </Card>
                        <h1 className="text-xl font-bold mt-3">จัดการระบบ</h1>
                    </div>
                    : ""}
                <div className="d-flex text-center">
                    <Card>
                        <CardBody>
                            <Image src={asset} width={200} height={200} unoptimized className="mb-5" alt='image' />
                            <Link href={`/${role}/documents/QF-ITC-0001`}>
                                <Button radius="sm" color="primary" variant="flat" className="font-medium w-[200px] text-base">Go to page</Button>
                            </Link>
                        </CardBody>
                    </Card>
                    <h1 className="text-xl font-bold mt-3">ใบคำร้องขออุปกรณ์</h1>
                </div>
                <div className="d-flex text-center">
                    <Card>
                        <CardBody>
                            <Image src={mechanic} width={200} height={200} unoptimized className="mb-5" alt='image' />
                            <Link href={`/${role}/documents/QF-ITC-0001`}>
                                <Button radius="sm" color="primary" variant="flat" className="font-medium w-[200px] text-base">Go to page</Button>
                            </Link>
                        </CardBody>
                    </Card>
                    <h1 className="text-xl font-bold mt-3">แจ้งซ่อม</h1>
                </div>
            </div>
        </main>
    );
}