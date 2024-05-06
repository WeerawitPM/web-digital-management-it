'use client'

import React, { useState, useEffect } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip } from "@nextui-org/react";
import { Button } from '@chakra-ui/react'
import { AddIcon } from "@chakra-ui/icons";
import Link from "next/link";
import Approved from "@/images/Approved.png";
import Reject from "@/images/Reject.png";
import Image from "next/image";
import ModalView from "./ModalView";

const columns = [
    {
        key: "id",
        label: "#",
    },
    {
        key: "name",
        label: "COMPANY NAME",
    },
    {
        key: "action",
        label: "ACTION",
    },
];

export default function Component() {
    const [data, setData] = useState(null); // เก็บข้อมูลที่ได้จาก API
    useEffect(() => {
        // เรียกใช้งาน API เพื่อดึงข้อมูล
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('/api/admin/company'); // เรียกใช้งาน API ที่เส้นทาง '/api'
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setData(data); // เก็บข้อมูลที่ได้จาก API ลงใน state
            // console.log(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <main>
            <div class="p-4 sm:ml-64">
                <Table aria-label="Example table with dynamic content">
                    <TableHeader columns={columns}>
                        {(column) => <TableColumn key={column.key} className={column.textCenter}>{column.label}</TableColumn>}
                    </TableHeader>
                    {data == null ? <TableBody emptyContent={"No rows to display."} /> :
                        <TableBody items={data} emptyContent={"No rows to display."}>
                            {data.map((item, index) => (
                                <TableRow key={item.key}>
                                    <TableCell>
                                        {index + 1}
                                    </TableCell>
                                    <TableCell>
                                        {item.name}
                                    </TableCell>
                                    <TableCell>
                                        <div className="relative flex items-center gap-2">
                                            <ModalView id={item.id} name={item.name} />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    }
                </Table>
            </div>
        </main>
    )
}
