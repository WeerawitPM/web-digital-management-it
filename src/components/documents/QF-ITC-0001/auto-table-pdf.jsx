import React from 'react';
import Table1 from './Table1';
import Table2 from './Table2';
import Table3 from './Table3';
import Table4 from './Table4';
import Table5 from './Table5';
import { Button } from '@chakra-ui/react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function Component({ data, doc_no }) {
    const requestBy = data?.Track_Doc[0]?.user;
    const requestFor = data?.Table_ITC_0001;
    const refRo = data?.Table_ITC_0001[0]?.ref_ro;
    const userManager = data?.Track_Doc[2];
    const ITStaff = data?.Track_Doc[3];
    const ITManager = data?.Track_Doc[4];
    const SuperManager = data?.Track_Doc[5];
    let processPOManager

    if (data?.price >= 5000) {
        processPOManager = SuperManager;
    } else {
        processPOManager = ITManager;
    }

    // เพิ่มฟังก์ชันสร้าง PDF
    const generatePDF = () => {
        // สร้าง instance ของ jsPDF
        const doc = new jsPDF();

        // เริ่มเขียนเนื้อหาลงใน PDF
        // เรียกใช้ jsPDF-AutoTable เพื่อสร้างตารางข้อมูล
        // สร้างตารางสำหรับ Table1
        doc.autoTable({ html: '#table1' });
        // สร้างตารางสำหรับ Table2
        doc.autoTable({ html: '#table2' });
        // สร้างตารางสำหรับ Table3
        doc.autoTable({ html: '#table3' });
        // สร้างตารางสำหรับ Table4
        doc.autoTable({ html: '#table4' });
        // สร้างตารางสำหรับ Table5
        doc.autoTable({ html: '#table5' });

        // บันทึก PDF
        doc.save('document.pdf');
    };

    // แก้ไข return ใน Component เพื่อเพิ่มปุ่มหรือการกระทำสำหรับการสร้าง PDF
    return (
        <>
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between flex-wrap">
                        <div className="flex justify-start">
                            <div className="font-semibold text-md text-gray-800 my-auto">
                                ใบร้องขออุปกรณ์สารสนเทศ {doc_no}
                            </div>
                        </div>
                        <div className="justify-end">
                            <Button size="md" onClick={generatePDF}>Export to PDF.</Button>
                        </div>
                    </div>
                </div>
            </header>
            <div className="bg-gray-100 flex justify-center items-center min-h-screen">
                <div className="a4 bg-white shadow-lg p-8 my-5">
                    <Table1 id="table1" />
                    <Table2 id="table2" requestBy={requestBy} />
                    <Table3 id="table3" requestBy={requestBy} requestFor={requestFor} data={data} userManager={userManager} refRo={refRo} />
                    <Table4 id="table4" ITStaff={ITStaff} processPOManager={processPOManager} />
                    <Table5 id="table5" ITStaff={ITStaff} ITManager={ITManager} SuperManager={SuperManager} />
                </div>
            </div>
        </>
    );

}
