'use client'

import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Chip, Divider, Textarea } from "@nextui-org/react";
import { Button } from '@chakra-ui/react'
import { DeleteIcon } from "../../components/DeleteIcon";
import Link from "next/link";
import ModalAddRequestItem from "./ModalAddRequestItem";

const rows = [
    {
        key: "1",
        asset: "QF4030001",
        description: "Adipisicing adipisicing incididunt voluptate...",
        qty: "1",
    },
    {
        key: "2",
        asset: "QF4030001",
        description: "Adipisicing adipisicing incididunt voluptate...",
        qty: "1",
    },
    {
        key: "3",
        asset: "QF4030001",
        description: "Adipisicing adipisicing incididunt voluptate...",
        qty: "1",
    },
    {
        key: "4",
        asset: "QF4030001",
        description: "Adipisicing adipisicing incididunt voluptate...",
        qty: "1",
    },
];

const columns = [
    {
        key: "id",
        label: "#",
    },
    {
        key: "asset",
        label: "Asset",
    },
    {
        key: "description",
        label: "DESCRIPTION",
    },
    {
        key: "qty",
        label: "QTY",
    },
    {
        key: "id",
        label: "#",
    },
];

export default function Home() {

    return (
        <>
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between flex-wrap">
                        <div className="justify-start">
                            <span className="font-semibold text-md text-gray-800 leading-tight">
                                แบบฟอร์มใบร้องขออุปกรณ์สารสนเทศ
                            </span>
                        </div>
                    </div>
                </div>
            </header>
            <main>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6 mb-5">
                    <div className="p-4 sm:p-8 bg-white border shadow-sm sm:rounded-lg w-75 mt-5">
                        <div className="pb-4">
                            <section className="">
                                <header>
                                    <h2 className="text-lg font-medium text-gray-900">
                                        Profile Information
                                    </h2>
                                </header>
                                <div className="flex w-full flex-wrap md:flex-wrap gap-4 pt-4">
                                    <div className="flex justify-start items-start space-x-4">
                                        <div>
                                            Name:{" "}
                                            <Chip color="success" size="xs">
                                                test
                                            </Chip>
                                        </div>
                                        <div>
                                            Emp ID.:{" "}

                                            <Chip color="success" size="xs">
                                                test
                                            </Chip>

                                        </div>
                                    </div>
                                </div>
                                <div className="flex w-full flex-wrap md:flex-nowrap gap-4 pt-4">
                                    <div className="flex justify-start items-start space-x-4 flex-wrap">
                                        <div>
                                            Company:{" "}
                                            <Chip color="success" size="xs">
                                                test
                                            </Chip>
                                        </div>
                                        <div>
                                            Position:{" "}
                                            <Chip color="success" size="xs">
                                                test
                                            </Chip>
                                        </div>
                                        <div>
                                            Department/Section:{" "}
                                            <Chip color="success" size="xs">
                                                test
                                            </Chip>
                                        </div>
                                        <div>
                                            Telephone/Mobile No.:{" "}
                                            <Chip color="success" size="xs">
                                                test
                                            </Chip>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                        <div className="pt-4">
                            <h2 className="text-lg font-medium text-gray-900">Purpose Of Usage</h2>
                            <Textarea
                                required
                                placeholder="Please write in detail."
                                size="md"
                            />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <ModalAddRequestItem />
                    </div>
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
                                        {item.asset}
                                    </TableCell>
                                    <TableCell>
                                        {item.description}
                                    </TableCell>
                                    <TableCell>
                                        {item.qty}
                                    </TableCell>
                                    <TableCell>
                                        <Tooltip color="danger" content="Delete user">
                                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                                <DeleteIcon />
                                            </span>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div className="flex justify-center">
                        <Link href="/">
                            <Button colorScheme="green" className="text-white">
                                ยืนยันการร้องขอ
                            </Button>
                        </Link>
                    </div>
                </div>
            </main>
        </>
    )
}
