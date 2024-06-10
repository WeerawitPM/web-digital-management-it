import Image from "next/image";
import uncheck from "@/images/uncheck.png";
import checked from "@/images/check-mark.png";

export default function Table2({ requestFor, user1, ITStaff1 }: { requestFor: any, user1: any, ITStaff1: any }) {
    return (
        <>
            <table className="table-auto border-collapse border-x-1 border-black w-full text-sm text-black">
                <tbody>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td>
                            <div className="flex flex-row gap-20">
                                <div>ชื่อ-สกุล {requestFor?.request_by?.firstname} {requestFor?.request_by?.lastname}</div>
                                <div>ตำแหน่ง {requestFor?.request_by?.position?.name}</div>
                                <div>ส่วน/แผนก {requestFor?.request_by?.department?.name}</div>
                                <div>โทร {requestFor?.request_by?.tel}</div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>มีความประสงค์ {requestFor?.purpose}</td>
                    </tr>
                    <tr>
                        <td>รายละเอียดความต้องการ {requestFor?.requirement_detail}</td>
                    </tr>
                    <tr>
                        <td>รายละเอียดข้อมูล (เอกสารแนบต้องมี Proposal เป็นอย่างน้อย 1 รายการร)</td>
                    </tr>
                    <tr>
                        <td>
                            <div className="flex flex-row gap-3">
                                <div className="flex flex-row gap-1">
                                    <Image
                                        src={requestFor?.proposal_detail === "Proposal" ? checked : uncheck}
                                        alt='checkbox'
                                        height={20}
                                        width={20}
                                        unoptimized
                                    />
                                    <div>Proposal</div>
                                </div>
                                <div className="flex flex-row gap-1">
                                    <Image
                                        src={requestFor?.proposal_detail === "MIFC" ? checked : uncheck}
                                        alt='checkbox'
                                        height={20}
                                        width={20}
                                        unoptimized
                                    />
                                    <div>MIFC</div>
                                </div>
                                <div className="flex flex-row gap-1">
                                    <Image
                                        src={requestFor?.proposal_detail === "WI" ? checked : uncheck}
                                        alt='checkbox'
                                        height={20}
                                        width={20}
                                        unoptimized
                                    />
                                    <div>WI</div>
                                </div>
                                <div className="flex flex-row gap-1">
                                    <Image
                                        src={requestFor?.proposal_detail === "Flowchart" ? checked : uncheck}
                                        alt='checkbox'
                                        height={20}
                                        width={20}
                                        unoptimized
                                    />
                                    <div>Flowchart</div>
                                </div>
                                <div className="flex flex-row gap-1">
                                    <Image
                                        src={requestFor?.proposal_detail === "Other" ? checked : uncheck}
                                        alt='checkbox'
                                        height={20}
                                        width={20}
                                        unoptimized
                                    />
                                    <div>อื่น ๆ</div>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                </tbody>
            </table>
            <table className="table-auto border-collapse border-x-1 border-black w-full text-sm text-black">
                <tbody>
                    <tr>
                        <td className="text-center">
                            <Image
                                src={user1?.user?.license === null ? "" : user1?.user?.license}
                                alt='license'
                                height={50}
                                width={50}
                                className='mx-auto my-2'
                            />
                            <div>ลงชื่อ ผู้ยื่นคำร้อง</div>
                            <div>วันที่ {user1?.start_date && new Date(user1?.start_date).toLocaleDateString('th-TH')}</div>
                        </td>
                        <td className="text-center">
                            <Image
                                src={ITStaff1?.user?.license === null ? "" : ITStaff1?.user?.license}
                                alt='license'
                                height={50}
                                width={50}
                                className='mx-auto my-2'
                            />
                            <div>ลงชื่อ ผู้รับคำร้อง</div>
                            <div>วันที่ {ITStaff1?.end_date && new Date(ITStaff1?.end_date).toLocaleDateString('th-TH')}</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}