'use client'

import React, { useState, useEffect } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, Spinner } from "@nextui-org/react";
import ModalView from "./ModalView";
import ModalEdit from "./ModalEdit";
import axios from "axios";
import ModalDelete from "./ModalDelete";
import ModalAdd from "./ModalAdd";
import { SearchIcon } from "@chakra-ui/icons";

const columns = [
    { key: "id", label: "#", },
    { key: "name", label: "COMPANY NAME", },
    { key: "action", label: "ACTION", },
];

export default function Component() {
    const [data, setData] = useState<any>(null); // เก็บข้อมูลที่ได้จาก API
    const [searchTerm, setSearchTerm] = useState(""); // เก็บค่าที่ใช้ในการค้นหา
    const [filteredData, setFilteredData] = useState<any>(null); // เก็บข้อมูลที่ผ่านการกรอง
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // เรียกใช้งาน API เพื่อดึงข้อมูล
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('/api/admin/company'); // เรียกใช้งาน API ที่เส้นทาง '/api'
            const data = await response.data;
            setData(data); // เก็บข้อมูลที่ได้จาก API ลงใน state
            setIsLoading(false);
            // console.log(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        // เมื่อมีการเปลี่ยนแปลงในคำค้นหา กรองข้อมูลและปรับปรุงข้อมูลที่แสดงในตาราง
        if (data) {
            const filtered = data.filter((item: { name: string; }) =>
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
                    {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody
                    emptyContent={"No rows to display."}
                    items={filteredData || data}
                    isLoading={isLoading}
                    loadingContent={<Spinner label="Loading..." />}
                >
                    {(filteredData || data)?.map((item: any, index: number) => (
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
                                    <ModalDelete id={item.id} onDataDelete={fetchData} />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </main>
    )
}
