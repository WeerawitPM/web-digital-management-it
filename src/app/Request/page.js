'use client'

import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Divider } from "@nextui-org/react";

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
        <div className="d-flex flex-column justify-content-center align-items-center mx-auto">
            <nav className="navbar navbar-expand-lg bg-light w-100 shadow-sm">
                <div className="container-fluid mx-5">
                    <h2 className="navbar-brand my-auto">1.QF-ITC-001 ใบร้องขออุปกรณ์สารสนเทศ</h2>
                    <ul className="navbar-nav justify-content-end">
                        <li className="nav-item">
                            <button type="button" className="btn btn-primary">+ เพิ่มรายการร้องขอ</button>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="w-75 mt-5">
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
    )
}
