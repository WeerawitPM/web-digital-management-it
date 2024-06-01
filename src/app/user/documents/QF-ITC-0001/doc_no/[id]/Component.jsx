import React from "react";
import ProfileInformation from "@/components/ProfileInformation";
import TableAsset from "@/components/documents/QF-ITC-0001/TableAsset";
import ModalViewItem from "./ModalViewItem";
import HeaderDoc from "@/components/documents/QF-ITC-0001/HeaderDoc";
import StepsComponent from "@/components/documents/QF-ITC-0001/Steps";

export default function Component({ data, steps, statusStep, totalPrice, doc_no }) {
    return (
        <>
            <HeaderDoc doc_no={doc_no} />
            <main className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6 min-h-screen py-5">
                {data === null ? "" :
                    <>
                        <StepsComponent current={data.step} status={statusStep} items={steps} />
                        <ProfileInformation data={data} />
                        <TableAsset data={data} totalPrice={totalPrice} ModalView={ModalViewItem} />
                    </>
                }
            </main>
        </>
    );
}