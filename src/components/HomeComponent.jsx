"use client"

import Image from "next/image";
import React from "react";
import { Card, CardBody, CardFooter, Heading, Text, CardHeader } from "@chakra-ui/react";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import asset from "@/images/asset.png";
import mechanic from "@/images/mechanic.png";
import system from "@/images/system.png";

export default function HomeComponent({ role }) {
    return (
        <main className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6 py-12">
            <div className="flex flex-row flex-wrap justify-center gap-10">
                {role === "admin" ?
                    <Card align='center' className="w-[250px]">
                        <CardHeader>
                            <Image src={system} width={200} height={200} unoptimized/>
                        </CardHeader>
                        <CardBody>
                            <Heading size='md'>จัดการระบบ</Heading>
                        </CardBody>
                        <CardFooter>
                            <Link href={`/${role}/manage/company`}>
                                <Button radius="sm" color="primary" variant="flat" className="font-medium w-[200px] text-base">Go to page</Button>
                            </Link>
                        </CardFooter>
                    </Card>
                    : ""}
                <Card align='center' className="w-[250px]">
                    <CardHeader>
                        <Image src={asset} width={200} height={200} unoptimized/>
                    </CardHeader>
                    <CardBody>
                        <Heading size='md'>เบิกอุปกรณ์</Heading>
                    </CardBody>
                    <CardFooter>
                        <Link href={`/${role}/documents/QF-ITC-0001`}>
                            <Button radius="sm" color="primary" variant="flat" className="font-medium w-[200px] text-base">Go to page</Button>
                        </Link>
                    </CardFooter>
                </Card>
                <Card align='center' className="w-[250px]">
                    <CardHeader>
                        <Image src={mechanic} width={200} height={200} unoptimized/>
                    </CardHeader>
                    <CardBody>
                        <Heading size='md'>แจ้งซ่อม</Heading>
                    </CardBody>
                    <CardFooter>
                        <Link href={`/${role}/documents/QF-ITC-0001`}>
                            <Button radius="sm" color="primary" variant="flat" className="font-medium w-[200px] text-base">Go to page</Button>
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        </main>
    );
}