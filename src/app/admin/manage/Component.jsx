'use client'

import React, { useState, useEffect } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import ModalView from "./ModalView";
import ModalEdit from "./ModalEdit";
import axios from "axios";
import ModalDelete from "./ModalDelete";

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
            const response = await axios.get('/api/admin/company'); // เรียกใช้งาน API ที่เส้นทาง '/api'
            const data = await response.data;
            setData(data); // เก็บข้อมูลที่ได้จาก API ลงใน state
            // console.log(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Global error handling
    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            console.error('Error fetching data:', error);
            return Promise.reject(error);
        }
    );

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
                                            <ModalEdit id={item.id} name={item.name} onDataUpdate={fetchData} />
                                            <ModalDelete id={item.id} name={item.name} onDataDelete={fetchData} />
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
