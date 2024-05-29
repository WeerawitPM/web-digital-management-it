import Image from 'next/image';
import React from 'react';
import uncheck from "@/images/uncheck.png";
import check from "@/images/check-mark.png";
import Table1 from './Table1';
import Table2 from './Table2';
import Table3 from './Table3';
import Table4 from './Table4';
import Table5 from './Table5';

export default function Component({ data }) {
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

    return (
        <div className="bg-gray-100 flex justify-center items-center min-h-screen">
            <div className="a4 bg-white shadow-lg p-8 my-5">
                <Table1 />
                <Table2 requestBy={requestBy} />
                <Table3 requestBy={requestBy} requestFor={requestFor} data={data} userManager={userManager} refRo={refRo} />
                <Table4 ITStaff={ITStaff} processPOManager={processPOManager} />
                <Table5 ITStaff={ITStaff} ITManager={ITManager} SuperManager={SuperManager} />
            </div>
        </div>
    );
}
