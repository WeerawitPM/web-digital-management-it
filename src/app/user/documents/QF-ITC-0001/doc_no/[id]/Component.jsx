import React from "react";
import { Steps } from 'antd';
import ProfileInformation from "@/components/ProfileInformation";
import TableAsset from "@/components/TableAsset";
import ModalViewItem from "./ModalViewItem";

export default function Component({ data, steps, statusStep, totalPrice }) {
    return (
        <>
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between flex-wrap">
                        <div className="justify-start">
                            <span className="font-semibold text-md text-gray-800 leading-tight">
                                แบบฟอร์มใบร้องขออุปกรณ์สารสนเทศ
                            </span>
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
                        <TableAsset data={data} totalPrice={totalPrice} ModalView={ModalViewItem} />
                    </div>
                </main>
            }
        </>
    );
}