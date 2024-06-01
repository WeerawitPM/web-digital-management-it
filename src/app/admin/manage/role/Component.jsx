'use client'

import React, { useState, useEffect } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input } from "@nextui-org/react";
import ModalView from "./ModalView";
import ModalEdit from "./ModalEdit";
import axios from "axios";
import ModalDelete from "./ModalDelete";
import ModalAdd from "./ModalAdd";
import { SearchIcon } from "@chakra-ui/icons";

const columns = [
    { key: "id", label: "#", },
    { key: "name", label: "ROLE NAME", },
    { key: "action", label: "ACTION", },
];

export default function Component() {
    const [data, setData] = useState(null); // เก็บข้อมูลที่ได้จาก API
    const [searchTerm, setSearchTerm] = useState(""); // เก็บค่าที่ใช้ในการค้นหา
    const [filteredData, setFilteredData] = useState(null); // เก็บข้อมูลที่ผ่านการกรอง

    useEffect(() => {
        // เรียกใช้งาน API เพื่อดึงข้อมูล
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('/api/admin/role'); // เรียกใช้งาน API ที่เส้นทาง '/api'
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

    useEffect(() => {
        // เมื่อมีการเปลี่ยนแปลงในคำค้นหา กรองข้อมูลและปรับปรุงข้อมูลที่แสดงในตาราง
        if (data) {
            const filtered = data.filter(item =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredData(filtered);
        }
    }, [searchTerm, data]);

    return (
        <main className="p-4 sm:ml-64">
            <ModalAdd fetchData={fetchData} />
            <div className="mb-5">
                <Input
                    isClearable
                    radius="full"
                    variant="bordered"
                    placeholder="Type to search..."
                    size="lg"
                    startContent={
                        <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                    }
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onClear={() => setSearchTerm("")}
                />
            </div>
            <Table aria-label="Example table with dynamic content">
                <TableHeader columns={columns}>
                    {(column) => <TableColumn key={column.key} className={column.textCenter}>{column.label}</TableColumn>}
                </TableHeader>
                {data == null ? <TableBody emptyContent={"No rows to display."} /> :
                    <TableBody items={filteredData || data} emptyContent={"No rows to display."}>
                        {(filteredData || data).map((item, index) => (
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
        </main>
    )
}
