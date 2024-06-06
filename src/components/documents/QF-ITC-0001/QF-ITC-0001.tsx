import React, { useRef, useContext } from 'react';
import { Button } from '@chakra-ui/react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Table1 from './Table1';
import Table2 from './Table2';
import Table3 from './Table3';
import Table4 from './Table4';
import Table5 from './Table5';
import { Navbar, NavbarContent } from '@nextui-org/react';
import { ThemeContext } from "@/context/ThemeContext";  // Import ThemeContext

export default function Component({ data, doc_no }: { data: any, doc_no: string }) {
    const requestBy = data?.Track_Doc[0]?.user;
    const requestFor = data?.Table_ITC_0001;
    const refRo = data?.Table_ITC_0001[0]?.ref_ro;
    const userManager = data?.Track_Doc[2];
    const ITStaff = data?.Track_Doc[3];
    const ITManager = data?.Track_Doc[4];
    const SuperManager = data?.Track_Doc[5];
    let processPOManager
    const componentRef = useRef(null);
    const { theme } = useContext<any>(ThemeContext);

    if (data?.price >= 5000) {
        processPOManager = SuperManager;
    } else {
        processPOManager = ITManager;
    }

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
                    ใบร้องขออุปกรณ์สารสนเทศ {doc_no}
                </NavbarContent>
                <NavbarContent justify="end">
                    <Button size="md" onClick={exportToPDF}>Export to PDF.</Button>
                </NavbarContent>
            </Navbar>
            <div className={`${theme === "dark" ? "" : "bg-gray-100"} flex justify-center items-center min-h-screen`}>
                <div className="a4 bg-white shadow-lg p-8 my-5" ref={componentRef}>
                    <Table1 />
                    <Table2 requestBy={requestBy} />
                    <Table3 requestBy={requestBy} requestFor={requestFor} data={data} userManager={userManager} refRo={refRo} />
                    <Table4 ITStaff={ITStaff} processPOManager={processPOManager} />
                    <Table5 ITStaff={ITStaff} ITManager={ITManager} SuperManager={SuperManager} />
                </div>
            </div>
        </>
    );
}
