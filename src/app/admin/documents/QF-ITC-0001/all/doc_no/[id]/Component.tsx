import React from "react";
import ModalView from "./ModalView";
import ProfileInformation from "@/components/documents/QF-ITC-0001/ProfileInformation";
import TableAsset from "@/components/documents/QF-ITC-0001/TableAsset";
import HeaderDoc from "@/components/documents/QF-ITC-0001/HeaderDoc";
import StepsComponent from "@/components/documents/Steps";

export default function Component(params: any) {
    const data = params.data;
    const steps = params.steps;
    const statusStep = params.statusStep;
    const totalPrice = params.totalPrice;
    const doc_no = params.doc_no;

    return (
        <>
            <HeaderDoc doc_no={doc_no} />
            <main className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6 min-h-screen py-5">
                {data == null ? "" :
                    <>
                        <StepsComponent current={data.step} status={statusStep} items={steps} />
                        <ProfileInformation data={data} />
                        <TableAsset data={data} totalPrice={totalPrice} ModalView={ModalView} trackStatus={undefined} ModalEdit={undefined} fetchData={undefined} />
                    </>
                }
            </main>
        </>
    )
}
