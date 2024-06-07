import React from "react";
import ProfileInformation from "@/components/documents/QF-ITC-0003/ProfileInformation";
import HeaderDoc from "@/components/documents/QF-ITC-0003/HeaderDoc";
import StepsComponent from "@/components/documents/Steps";
import Detail from "@/components/documents/QF-ITC-0003/Detail";

export default function Component(
    { data, steps, statusStep, doc_no }:
        { data: any, steps: any, statusStep: string, doc_no: string }
) {
    return (
        <>
            <HeaderDoc doc_no={doc_no} />
            <main className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6 min-h-screen py-5">
                {data === null ? "" :
                    <>
                        <StepsComponent current={data.step} status={statusStep} items={steps} />
                        <ProfileInformation data={data} />
                        <Detail data={data?.Table_ITC_0003[0]} />
                    </>
                }
            </main>
        </>
    );
}