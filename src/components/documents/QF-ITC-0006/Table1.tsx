import Image from "next/image";
import uncheck from "@/images/uncheck.png";
import checked from "@/images/check-mark.png";

export default function Table1({requestFor}: {requestFor: any}) {
    return (
        <table className="w-full text-sm text-black">
            <thead>
                <tr>
                    <th className='text-base'>แบบคำร้องขอใช้งานระบบ Join Domain</th>
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
                    <td className="flex flex-row gap-3">
                        <div>ขอเข้าใช้งานอีเมลของ</div>
                        <div className="flex flex-row gap-1">
                            <Image
                                src={requestFor?.email === "VCS" ? checked : uncheck}
                                alt='checkbox'
                                height={20}
                                width={20}
                                unoptimized
                            />
                            <div>VCS</div>
                        </div>
                        <div className="flex flex-row gap-1">
                            <Image
                                src={requestFor?.email === "VCST" ? checked : uncheck}
                                alt='checkbox'
                                height={20}
                                width={20}
                                unoptimized
                            />
                            <div>VCST</div>
                        </div>
                        <div className="flex flex-row gap-1">
                            <Image
                                src={requestFor?.email === "BVS" ? checked : uncheck}
                                alt='checkbox'
                                height={20}
                                width={20}
                                unoptimized
                            />
                            <div>BVS</div>
                        </div>
                        <div className="flex flex-row gap-1">
                            <Image
                                src={requestFor?.email === "AAA" ? checked : uncheck}
                                alt='checkbox'
                                height={20}
                                width={20}
                                unoptimized
                            />
                            <div>AAA</div>
                        </div>
                        <div className="flex flex-row gap-1">
                            <Image
                                src={requestFor?.email === "TKM" ? checked : uncheck}
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
                        <div className="mr-5">Username: {requestFor?.username}</div>
                        <div className="text-xs my-auto">(ประกอบด้วยชื่อเต็มภาษาอังกฤษตามด้วย "." และนามสกุลภาษาอังกฤษตัวแรก)</div>
                    </td>
                </tr>
                <tr>
                    <td className="flex flex-row gap-3">
                        <div className="flex flex-row gap-1">
                            <Image
                                src={requestFor?.type_email === ".vcs.co.th" ? checked : uncheck}
                                alt='checkbox'
                                height={20}
                                width={20}
                                unoptimized
                            />
                            <div>.vcs.co.th</div>
                        </div>
                        <div className="flex flex-row gap-1">
                            <Image
                                src={requestFor?.type_email === ".vcst.co.th" ? checked : uncheck}
                                alt='checkbox'
                                height={20}
                                width={20}
                                unoptimized
                            />
                            <div>.vcst.co.th</div>
                        </div>
                        <div className="flex flex-row gap-1">
                            <Image
                                src={requestFor?.type_email === ".bvs.co.th" ? checked : uncheck}
                                alt='checkbox'
                                height={20}
                                width={20}
                                unoptimized
                            />
                            <div>.bvs.co.th</div>
                        </div>
                        <div className="flex flex-row gap-1">
                            <Image
                                src={requestFor?.type_email === ".aaa.co.th" ? checked : uncheck}
                                alt='checkbox'
                                height={20}
                                width={20}
                                unoptimized
                            />
                            <div>.aaa.co.th</div>
                        </div>
                        <div className="flex flex-row gap-1">
                            <Image
                                src={requestFor?.type_email === ".tkm.co.th" ? checked : uncheck}
                                alt='checkbox'
                                height={20}
                                width={20}
                                unoptimized
                            />
                            <div>.tkm.co.th</div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td className="flex">
                        <div className="mr-5">Password: {requestFor?.password}</div>
                        <div className="text-xs my-auto">(ประกอบด้วยตัวอักษรเล็ก/ใหญ่และตัวเลขไม่น้อยกว่า 6 ตัวอักษร)</div>
                    </td>
                </tr>
                <tr>
                    <td className="font-bold">วันที่เริ่มใช้งาน {requestFor?.start_date && new Date(requestFor?.start_date).toLocaleDateString('th-TH')}</td>
                </tr>
                <tr>
                    <td className="font-bold">วันที่เลิกใช้งาน: {requestFor?.end_date && new Date(requestFor?.end_date).toLocaleDateString('th-TH')}</td>
                </tr>
            </tbody>
        </table>
    );
}