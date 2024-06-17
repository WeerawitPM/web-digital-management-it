import React, { useRef, useContext } from 'react';
import { Button } from '@chakra-ui/react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Navbar, NavbarContent } from '@nextui-org/react';
import { ThemeContext } from "@/context/ThemeContext";  // Import ThemeContext
import Table1 from './Table1';
import Table2 from './Table2';
import Table3 from './Table3';

export default function Component({ data, doc_no }: { data: any, doc_no: string }) {
    const requestFor = data?.Table_ITC_0006[0];
    const user1 = data?.Track_Doc[0];
    const ITStaff1 = data?.Track_Doc[1];

    const componentRef = useRef(null);
    const { theme } = useContext<any>(ThemeContext);

    const exportToPDF = () => {
        const input = componentRef.current as any;

        // html2canvas(input, {useCORS:true})
        html2canvas(input, {
            scale: 2
        })
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF({
                    orientation: "portrait",
                    unit: "mm",
                    format: "a4",
                    compress: true
                });
                const imgWidth = 210;
                const imgHeight = (canvas.height * imgWidth) / canvas.width;

                pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight, "FAST");
                pdf.save(`document_${doc_no}.pdf`);
            });
    };

    return (
        <>
            <Navbar position="static" isBordered maxWidth="xl">
                <NavbarContent justify="start">
                    แบบคำร้องขอใช้งานระบบ Join Domain {doc_no}
                </NavbarContent>
                <NavbarContent justify="end">
                    <Button size="md" onClick={exportToPDF}>Export to PDF.</Button>
                </NavbarContent>
            </Navbar>
            <div className={`${theme === "dark" ? "" : "bg-gray-100"} flex justify-center items-center min-h-screen overflow-x-auto`}>
                <div className="a4 bg-white shadow-lg p-8 my-5" ref={componentRef}>
                    <Table1 requestFor={requestFor} />
                    <Table2 />
                    <Table3 user1={user1} ITStaff1={ITStaff1} />
                </div>
            </div>
        </>
    );
}
