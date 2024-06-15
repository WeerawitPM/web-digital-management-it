import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Spinner } from "@nextui-org/react";
import Link from "next/link";
import HeaderMain from "@/components/documents/QF-ITC-0005/HeaderMain";

const columns = [
    { key: "id", label: "#", },
    { key: "doc_no", label: "DOC NO.", },
    { key: "request_date", label: "REQUEST DATE", },
    { key: "request_by", label: "REQUEST BY", },
    { key: "status", label: "STATUS", },
];

export default function Component(
    { data, step, status, isLoading, role }:
        { data: any, step: any, status: number, isLoading: boolean, role: any }
) {

    return (
        <>
            <HeaderMain
                title={
                    status === 0 ? "| รอการอนุมัติ"
                        : status === 1 ? "| คำร้องขอได้รับการอนุมัติ"
                            : "| คำร้องขอถูกปฏิเสธ"
                }
            />
            <main className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6 min-h-screen">
                <Table aria-label="Example table with dynamic content">
                    <TableHeader columns={columns}>
                        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                    </TableHeader>
                    <TableBody
                        items={data}
                        emptyContent={"No rows to display."}
                        isLoading={isLoading}
                        loadingContent={<Spinner label="Loading..." />}
                    >
                        {data?.filter((item: any) => item.status === status).map((item: any, index: number) => (
                            <TableRow key={item.key}>
                                <TableCell>
                                    {index + 1}
                                </TableCell>
                                <TableCell>
                                    <Link
                                        href={`/${role}/documents/QF-ITC-0005/doc_no/${item.ref_no}`}
                                        className="text-blue-500">{item.ref_no}</Link>
                                </TableCell>
                                <TableCell>
                                    {item.start_date && new Date(item.start_date).toLocaleDateString('th-TH')}
                                </TableCell>
                                <TableCell>
                                    {item.Table_ITC_0005[0].request_by.username}
                                </TableCell>
                                <TableCell>
                                    <Chip color="primary" size="md" variant="flat">
                                        {step[index]}
                                    </Chip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </main>
        </>
    )
}
