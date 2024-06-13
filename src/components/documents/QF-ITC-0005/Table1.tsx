import Image from "next/image";
import uncheck from "@/images/uncheck.png";
import checked from "@/images/check-mark.png";

export default function Table1({ requirement }: { requirement: string }) {
    return (
        <table className="table-auto border-collapse border border-black w-full text-sm text-black">
            <thead>
                <tr>
                    <th className='border border-black text-base' colSpan={4}>V.C.S. GROUP</th>
                </tr>
            </thead>
            <tbody>
                <tr className='text-center'>
                    <td className='border border-black' colSpan={4}>แบบฟอร์ม: แบบคำร้องขอเพิ่มระบบและแก้ไขปรับปรุงระบบ</td>
                </tr>
                <tr className='border border-black'>
                    <td>หมายเลขเอกสาร QF-ITC-0003</td>
                    <td>วันที่เริ่มใช้ : 21 กันยายน 2566</td>
                    <td className='border border-black text-center'>ครั้งที่จัดทำ 1</td>
                    <td className='border border-black'>หน้าที่ 1 จาก 1</td>
                </tr>
                <tr>
                    <td colSpan={2}>ส่วนที่ 1: รายละเอียด (ผู้ยื่นคำร้อง)</td>
                    <td className='border border-black'>ความต้องการ</td>
                    <td className='border border-black'>
                        <div className="flex flex-row gap-3">
                            <div className="flex flex-row gap-1">
                                <Image
                                    src={requirement === "Add" ? checked : uncheck}
                                    alt='checkbox'
                                    height={20}
                                    width={20}
                                    unoptimized
                                />
                                <div>เพิ่ม</div>
                            </div>
                            <div className="flex flex-row gap-1">
                                <Image
                                    src={requirement === "Edit" ? checked : uncheck}
                                    alt='checkbox'
                                    height={20}
                                    width={20}
                                    unoptimized
                                />
                                <div>แก้ไขปรับปรุง</div>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}