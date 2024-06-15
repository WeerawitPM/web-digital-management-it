"use client"
import React from "react";
import ProfileInformation from "@/components/documents/QF-ITC-0006/ProfileInformation";
import HeaderDoc from "@/components/documents/QF-ITC-0006/HeaderDoc";
import StepsComponent from "@/components/documents/Steps";
import { Card, Input, Radio, RadioGroup } from "@nextui-org/react";

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
                        <Card className="p-4 sm:p-8 sm:rounded-lg flex flex-col gap-5">
                            <div>
                                <div className="mb-3">ขอเข้าใช้งานอีเมลของ</div>
                                <RadioGroup
                                    defaultValue={data?.Table_ITC_0006[0]?.email}
                                    orientation="horizontal"
                                    isReadOnly
                                >
                                    <Radio value="VCS">VCS</Radio>
                                    <Radio value="VCST">VCST</Radio>
                                    <Radio value="BVS">BVS</Radio>
                                    <Radio value="AAA">AAA</Radio>
                                    <Radio value="TKM">TKM</Radio>
                                </RadioGroup>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div>Username:</div>
                                <Input
                                    isReadOnly
                                    placeholder="Enter username"
                                    variant="bordered"
                                    size="lg"
                                    className="flex-1"
                                    defaultValue={data?.Table_ITC_0006[0]?.username}
                                />
                            </div>
                            <div>
                                <RadioGroup
                                    defaultValue={data?.Table_ITC_0006[0]?.type_email}
                                    orientation="horizontal"
                                    isReadOnly
                                >
                                    <Radio value=".vcs.co.th">.vcs.co.th</Radio>
                                    <Radio value=".vcst.co.th">.vcst.co.th</Radio>
                                    <Radio value=".bvs.co.th">.bvs.co.th</Radio>
                                    <Radio value=".aaa.co.th">.aaa.co.th</Radio>
                                    <Radio value=".tkm.co.th">.tkm.co.th</Radio>
                                </RadioGroup>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div>Password:</div>
                                <Input
                                    isReadOnly
                                    placeholder="Enter password"
                                    variant="bordered"
                                    size="lg"
                                    className="flex-1"
                                    defaultValue={data?.Table_ITC_0006[0]?.password}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <div>วันที่เริ่มใช้: {data?.Table_ITC_0006[0]?.start_date && new Date(data?.Table_ITC_0006[0]?.start_date).toLocaleDateString('th-TH')}</div>
                            </div>
                        </Card>
                    </>
                }
            </main>
        </>
    );
}