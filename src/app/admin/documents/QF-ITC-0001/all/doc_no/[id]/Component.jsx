import React from "react";
import { Steps } from 'antd';
import ModalView from "./ModalView";
import ProfileInformation from "@/components/ProfileInformation";
import TableAsset from "@/components/TableAsset";
import { Button } from "@chakra-ui/react";
import Link from "next/link";

export default function Component(params) {
    const data = params.data;
    const steps = params.steps;
    const statusStep = params.statusStep;
    const totalPrice = params.totalPrice;

    return (
        <>
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between flex-wrap">
                        <div className="justify-start">
                            <div className="font-semibold text-md text-gray-800">
                                ใบร้องขออุปกรณ์สารสนเทศ {data?.ref_no}
                            </div>
                        </div>
                        <div className="justify-end">
                            <Link href={`/admin/documents/QF-ITC-0001/pdf/${data?.ref_no}`}>
                                <Button size="md">Export to PDF.</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>
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
    )
}
