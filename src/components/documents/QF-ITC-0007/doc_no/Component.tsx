"use client"
import React from "react";
import ProfileInformation from "@/components/documents/QF-ITC-0007/ProfileInformation";
import HeaderDoc from "@/components/documents/QF-ITC-0007/HeaderDoc";
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
                            <div className="text-center text-xl font-bold">Domain</div>
                            <div>
                                <div className="mb-3">ขอเข้าใช้งานอีเมลของ</div>
                                <RadioGroup
                                    defaultValue={data?.Table_ITC_0007[0]?.domain_company}
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
                                    defaultValue={data?.Table_ITC_0007[0]?.domain_username}
                                />
                            </div>
                            <div>
                                <RadioGroup
                                    defaultValue={data?.Table_ITC_0007[0]?.domain_company_type}
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
                                <div>วันที่เลิกใช้งาน: {data?.Table_ITC_0007[0]?.domain_end_date && new Date(data?.Table_ITC_0007[0]?.domain_end_date).toLocaleDateString('th-TH')}</div>
                            </div>
                            <div className="text-center text-xl font-bold">Email</div>
                            <div>
                                <div className="mb-3">ขอเข้าใช้งานอีเมลของ</div>
                                <RadioGroup
                                    defaultValue={data?.Table_ITC_0007[0]?.email_company}
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
                                    defaultValue={data?.Table_ITC_0007[0]?.email_username}
                                />
                            </div>
                            <div>
                                <RadioGroup
                                    defaultValue={data?.Table_ITC_0007[0]?.email_company_type}
                                    orientation="horizontal"
                                    isReadOnly
                                >
                                    <Radio value="@vcsthai.com">@vcsthai.com</Radio>
                                    <Radio value="@vcsthailand.co.th">@vcsthailand.co.th</Radio>
                                    <Radio value="@bvs.co.th">@bvs.co.th</Radio>
                                    <Radio value="@aaa.co.th">@aaa.co.th</Radio>
                                    <Radio value="@tkm-thaikin.com">@tkm-thaikin.com</Radio>
                                </RadioGroup>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div>วันที่เลิกใช้งาน: {data?.Table_ITC_0007[0]?.email_end_date && new Date(data?.Table_ITC_0007[0]?.email_end_date).toLocaleDateString('th-TH')}</div>
                            </div>
                        </Card>
                    </>
                }
            </main>
        </>
    );
}