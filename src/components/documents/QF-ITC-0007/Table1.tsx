import Image from "next/image";
import uncheck from "@/images/uncheck.png";
import checked from "@/images/check-mark.png";

export default function Table1({ requestFor }: { requestFor: any }) {
    return (
        <table className="w-full text-sm text-black">
            <thead>
                <tr>
                    <th className='text-base'>แบบคำร้องขอยกเลิกการใช้งานโดเมน/อีเมล</th>
                </tr>
            </thead>
            <tbody>
                <tr className='text-center'>
                    <td>
                        <div className="text-end">วันที่/Date: {requestFor?.created_at && new Date(requestFor?.created_at).toLocaleDateString('th-TH')}</div>
                    </td>
                </tr>
                <tr>
                    <td className="flex mt-10">
                        <div className="flex-1">ชื่อ {requestFor?.request_by?.firstname}</div>
                        <div className="flex-1">สกุล {requestFor?.request_by?.lastname}</div>
                        <div className="flex-1">เลขประจำตัว/ID No. {requestFor?.request_by?.emp_id}</div>
                    </td>
                </tr>
                <tr>
                    <td className="flex">
                        <div className="flex-1">ตำแหน่ง {requestFor?.request_by?.position?.name}</div>
                        <div className="flex-1">แผนก/ส่วน {requestFor?.request_by?.department?.name}</div>
                    </td>
                </tr>
                <tr>
                    <td><div className="mt-5 text-center font-bold text-base">โดเมน</div></td>
                </tr>
                <tr>
                    <td className="flex flex-row gap-5">
                        <div>ขอยกเลิกใช้งานโดเมนของ</div>
                        <div className="flex flex-row gap-1">
                            <Image
                                src={requestFor?.domain_company === "VCS" ? checked : uncheck}
                                alt='checkbox'
                                height={20}
                                width={20}
                                unoptimized
                            />
                            <div>VCS</div>
                        </div>
                        <div className="flex flex-row gap-1">
                            <Image
                                src={requestFor?.domain_company === "VCST" ? checked : uncheck}
                                alt='checkbox'
                                height={20}
                                width={20}
                                unoptimized
                            />
                            <div>VCST</div>
                        </div>
                        <div className="flex flex-row gap-1">
                            <Image
                                src={requestFor?.domain_company === "BVS" ? checked : uncheck}
                                alt='checkbox'
                                height={20}
                                width={20}
                                unoptimized
                            />
                            <div>BVS</div>
                        </div>
                        <div className="flex flex-row gap-1">
                            <Image
                                src={requestFor?.domain_company === "AAA" ? checked : uncheck}
                                alt='checkbox'
                                height={20}
                                width={20}
                                unoptimized
                            />
                            <div>AAA</div>
                        </div>
                        <div className="flex flex-row gap-1">
                            <Image
                                src={requestFor?.domain_company === "TKM" ? checked : uncheck}
                                alt='checkbox'
                                height={20}
                                width={20}
                                unoptimized
                            />
                            <div>TKM</div>
                        </div>
                        <div>โดยมีรายละเอียด ดังนี้</div>
                    </td>
                </tr>
                <tr>
                    <td className="flex">
                        <div className="mr-5">Username: {requestFor?.domain_username}</div>
                        <div className="flex gap-1">
                            <div className="flex flex-row gap-1">
                                <Image
                                    src={requestFor?.domain_company_type === ".vcs.co.th" ? checked : uncheck}
                                    alt='checkbox'
                                    height={20}
                                    width={20}
                                    unoptimized
                                />
                                <div>.vcs.co.th</div>
                            </div>
                            <div className="flex flex-row gap-1">
                                <Image
                                    src={requestFor?.domain_company_type === ".vcst.co.th" ? checked : uncheck}
                                    alt='checkbox'
                                    height={20}
                                    width={20}
                                    unoptimized
                                />
                                <div>.vcst.co.th</div>
                            </div>
                            <div className="flex flex-row gap-1">
                                <Image
                                    src={requestFor?.domain_company_type === ".bvs.co.th" ? checked : uncheck}
                                    alt='checkbox'
                                    height={20}
                                    width={20}
                                    unoptimized
                                />
                                <div>.bvs.co.th</div>
                            </div>
                            <div className="flex flex-row gap-1">
                                <Image
                                    src={requestFor?.domain_company_type === ".aaa.co.th" ? checked : uncheck}
                                    alt='checkbox'
                                    height={20}
                                    width={20}
                                    unoptimized
                                />
                                <div>.aaa.co.th</div>
                            </div>
                            <div className="flex flex-row gap-1">
                                <Image
                                    src={requestFor?.domain_company_type === ".tkm.co.th" ? checked : uncheck}
                                    alt='checkbox'
                                    height={20}
                                    width={20}
                                    unoptimized
                                />
                                <div>.tkm.co.th</div>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td className="font-bold">วันที่เลิกใช้งาน: {requestFor?.domain_end_date && new Date(requestFor?.domain_end_date).toLocaleDateString('th-TH')}</td>
                </tr>
            </tbody>
        </table>
    );
}