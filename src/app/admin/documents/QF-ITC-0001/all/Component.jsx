'use client'

import React, { useState, useEffect } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Spinner, Input } from "@nextui-org/react";
import Link from "next/link";
import axios from "axios";
import { SearchIcon } from "@chakra-ui/icons";

const columns = [
    { key: "id", label: "#" },
    { key: "doc_no", label: "DOC NO." },
    { key: "request_date", label: "REQUEST DATE" },
    { key: "request_by", label: "REQUEST BY" },
    { key: "title", label: "TITLE" },
];

export default function Component() {
    const [isLoading, setIsLoading] = useState(true);
    const [sortDescriptor, setSortDescriptor] = useState({ column: 'id', direction: 'ascending' });
    const [items, setItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // เก็บค่าที่ใช้ในการค้นหา
    const [filteredData, setFilteredData] = useState(null); // เก็บข้อมูลที่ผ่านการกรอง

    const fetchData = async () => {
        try {
            let res = await axios.get('/api/admin/documents/QF-ITC-0001/all');
            let json = await res.data;
            setItems(json);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const sortItems = (items, sortDescriptor) => {
        return items.sort((a, b) => {
            let first = a[sortDescriptor.column];
            let second = b[sortDescriptor.column];
            let cmp = (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

            if (sortDescriptor.direction === "descending") {
                cmp *= -1;
            }

            return cmp;
        });
    };

    const handleSortChange = (descriptor) => {
        setSortDescriptor(descriptor);
        setItems(sortItems([...items], descriptor));
    };

    useEffect(() => {
        // เมื่อมีการเปลี่ยนแปลงในคำค้นหา กรองข้อมูลและปรับปรุงข้อมูลที่แสดงในตาราง
        if (items) {
            const filtered = items.filter(item => {
                const doc_no = item.ref_no.toLowerCase();
                const requestDate = new Date(item.start_date).toLocaleDateString('th-TH').toLowerCase();
                const requestBy = item.Table_ITC_0001[0].request_by.username.toLowerCase();
                const title = item.Track_Doc
                    .filter(track => track.step === item.step)
                    .map(track => track.name)
                    .join(" ")
                    .toLowerCase();
                return doc_no.includes(searchTerm.toLowerCase())
                    || requestDate.includes(searchTerm.toLowerCase())
                    || requestBy.includes(searchTerm.toLowerCase())
                    || title.includes(searchTerm.toLowerCase());
            });
            setFilteredData(filtered);
        }
    }, [searchTerm, items]);

    return (
        <>
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between flex-wrap">
                        <div className="justify-start my-auto">
                            <span className="font-semibold text-md text-gray-800 leading-tight">
                                1.QF-TC-0001 ใบร้องขออุปกรณ์สารสนเทศ
                            </span>
                        </div>
                    </div>
                </div>
            </header>
            <main>
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
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
                        <Table
                            aria-label="Example table with dynamic content"
                            sortDescriptor={sortDescriptor}
                            onSortChange={handleSortChange}
                        >
                            <TableHeader columns={columns}>
                                {(column) => <TableColumn key={column.key} allowsSorting>{column.label}</TableColumn>}
                            </TableHeader>
                            <TableBody
                                emptyContent={"No rows to display."}
                                items={filteredData || items}
                                isLoading={isLoading}
                                loadingContent={<Spinner label="Loading..." />}
                            >
                                {(filteredData || items)?.map((item, index) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.sequenceNumber}</TableCell>
                                        <TableCell>
                                            <Link href={`/admin/documents/QF-ITC-0001/all/doc_no/${item.ref_no}`} className="text-blue-500">
                                                {item.ref_no}
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            {item.start_date && new Date(item.start_date).toLocaleDateString('th-TH')}
                                        </TableCell>
                                        <TableCell>{item.Table_ITC_0001[0].request_by.username}</TableCell>
                                        <TableCell>
                                            {item.status === 1 ?
                                                item.Track_Doc
                                                    .filter(track => track.step === item.step)
                                                    .map((track) => (
                                                        <Chip key={track.name} color="success" size="xs" variant="flat">
                                                            {track.name}
                                                        </Chip>
                                                    ))
                                                : item.Track_Doc
                                                    .filter(track => track.step === item.step)
                                                    .map((track) => (
                                                        <Chip key={track.name} color={track.status === 2 ? "danger" : "primary"} size="xs" variant="flat">
                                                            {track.name}
                                                        </Chip>
                                                    ))
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
    );
}
