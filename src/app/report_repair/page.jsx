'use client'

import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip } from "@nextui-org/react";
import { Button } from '@chakra-ui/react'
import { AddIcon } from "@chakra-ui/icons";
import Link from "next/link";
import Approved from "@/images/Approved.png";
import Reject from "@/images/Reject.png";
import Image from "next/image";
import { rows } from "./fakeData";

const columns = [
    {
        key: "id",
        label: "#",
    },
    {
        key: "doc_no",
        label: "DOC NO.",
    },
    {
        key: "device",
        label: "DEVICE",
    },
    {
        key: "request_date",
        label: "REQUEST DATE",
    },
    {
        key: "request_by",
        label: "REQUEST BY",
    },
    {
        key: "recive_date",
        label: "RECIVE DATE",
    },
    {
        key: "recive_by",
        label: "RECIVE BY",
    },
    {
        key: "return_date",
        label: "RETURN DATE",
    },
    {
        key: "status",
        label: "STATUS",
    },
];

export default function Home() {

    return (
        <>
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between flex-wrap">
                        <div className="justify-start my-auto">
                            <span className="font-semibold text-md text-gray-800 leading-tight">
                                แจ้งซ่อม
                            </span>
                        </div>
                        <div className="justify-end">
                            <Link href="/request/add">
                                <Button colorScheme="blue" leftIcon={<AddIcon />} size='sm'>
                                    เพิ่มรายการแจ้งซ่อม
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>
            <main>
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                        <Table aria-label="Example table with dynamic content">
                            <TableHeader columns={columns}>
                                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                            </TableHeader>
                            <TableBody items={rows} emptyContent={"No rows to display."}>
                                {rows.map((item, index) => (
                                    <TableRow key={item.key}>
                                        <TableCell>
                                            {index + 1}
                                        </TableCell>
                                        <TableCell>
                                            <Link href={{ pathname: '/request/doc', query: { doc_no: item.doc_no } }} className="text-blue-500">{item.doc_no}</Link>
                                        </TableCell>
                                        <TableCell>
                                            {item.device}
                                        </TableCell>
                                        <TableCell>
                                            {item.recive_date}
                                        </TableCell>
                                        <TableCell>
                                            {item.request_by}
                                        </TableCell>
                                        <TableCell>
                                            {item.recive_date}
                                        </TableCell>
                                        <TableCell>
                                            {item.recive_by}
                                        </TableCell>
                                        <TableCell>
                                            {item.return_date}
                                        </TableCell>
                                        <TableCell>
                                            {
                                                item.status === "Success" ?
                                                    <Chip color="success" size="xs" variant="flat">
                                                        {item.status}
                                                    </Chip> :
                                                    item.status === "Waiting" ?
                                                        <Chip color="warning" size="xs" variant="flat">
                                                            {item.status}
                                                        </Chip> :
                                                        item.status === "Repairing" ?
                                                            <Chip color="primary" size="xs" variant="flat">
                                                                {item.status}
                                                            </Chip> : ""
                                            }
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </main>
        </>
    )
}
