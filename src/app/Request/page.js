'use client'

import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@nextui-org/react";
import { AddIcon } from "@chakra-ui/icons";
import Link from "next/link";

const rows = [
    {
        key: "1",
        doc_no: "QF4030001",
        request_date: "20/04/2544",
        request_by: "User",
        title: "Title",
        description: "Adipisicing adipisicing incididunt voluptate...",
        status: "Approved",
    },
    {
        key: "2",
        doc_no: "QF4030001",
        request_date: "20/04/2544",
        request_by: "User",
        title: "Title",
        description: "Adipisicing adipisicing incididunt voluptate...",
        status: "Wait Approve",
    },
    {
        key: "3",
        doc_no: "QF4030001",
        request_date: "20/04/2544",
        request_by: "User",
        title: "Title",
        description: "Adipisicing adipisicing incididunt voluptate...",
        status: "Reject",
    },
    {
        key: "4",
        doc_no: "QF4030001",
        request_date: "20/04/2544",
        request_by: "User",
        title: "Title",
        description: "Adipisicing adipisicing incididunt voluptate...",
        status: "Draff",
    },
];

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
        key: "request_date",
        label: "REQUEST DATE",
    },
    {
        key: "request_by",
        label: "REQUEST BY",
    },
    {
        key: "title",
        label: "TITLE",
    },
    {
        key: "description",
        label: "DESCRIPTION",
    },
    {
        key: "status",
        label: "STATUS",
    },
];

export default function Home() {
    return (
        <>
            {/* <nav className="navbar navbar-expand-lg bg-light shadow-sm">
                <div className="container-fluid max-w-7xl">
                    <h2 className="navbar-brand my-auto">1.QF-ITC-001 ใบร้องขออุปกรณ์สารสนเทศ</h2>
                    <ul className="navbar-nav justify-content-end">
                        <li className="nav-item">
                            <button type="button" className="btn btn-primary">+ เพิ่มรายการร้องขอ</button>
                        </li>
                    </ul>
                </div>
            </nav> */}
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between flex-wrap">
                        <div className="justify-start">
                            <span className="font-semibold text-md text-gray-800 leading-tight">
                                1.QF-TC-0001 ใบร้องขออุปกรณ์สารสนเทศ
                            </span>
                        </div>
                        <div className="justify-end">
                            <Link href="/">
                                <Button color="primary" startContent={<AddIcon />}>
                                    เพิ่มรายการร้องขอ
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
                                            {item.doc_no}
                                        </TableCell>
                                        <TableCell>
                                            {item.request_date}
                                        </TableCell>
                                        <TableCell>
                                            {item.request_by}
                                        </TableCell>
                                        <TableCell>
                                            {item.title}
                                        </TableCell>
                                        <TableCell>
                                            {item.description}
                                        </TableCell>
                                        <TableCell className={
                                            item.status === "Approved" ? "text-success" :
                                                item.status === "Wait Approve" ? "text-warning" :
                                                    item.status === "Reject" ? "text-danger" :
                                                        item.status === "Draft" ? "text-info" : ""
                                        }>
                                            {item.status}
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
