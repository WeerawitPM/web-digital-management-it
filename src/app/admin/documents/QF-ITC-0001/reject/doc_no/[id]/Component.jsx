import React from "react";
import { Steps } from 'antd';
import ModalView from "./ModalView";
import ProfileInformation from "@/components/ProfileInformation";
import TableAsset from "@/components/documents/QF-ITC-0001/TableAsset";
import HeaderDoc from "@/components/documents/QF-ITC-0001/HeaderDoc";

export default function Component({ data, steps, statusStep, totalPrice, doc_no }) {
    return (
        <>
            <HeaderDoc doc_no={doc_no} />
            {data == null ? "" :
                <main>
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6 mb-5">
                        <Steps
                            current={data.step}
                            status={statusStep == "" ? "process" : statusStep}
                            items={steps}
                            className="mt-5"
                        />
                        <ProfileInformation data={data} />
                        <TableAsset data={data} totalPrice={totalPrice} ModalView={ModalView} />
                    </div>
                </main>
            }
        </>
    );
}
