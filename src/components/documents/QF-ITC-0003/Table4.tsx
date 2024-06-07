import Image from "next/image";
import uncheck from "@/images/uncheck.png";

export default function Table4() {
    return (
        <>
            <table className="table-auto border-collapse border border-black w-full text-sm text-black">
                <thead>
                    <tr>
                        <td className='border border-black'>ส่วนที่ 3: สรุปผลการดำเนินงาน (IT)</td>
                        <td className='border border-black text-center'>การรับรองผลการดำเนินงาน</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div className="flex flex-col gap-2 ms-3 my-3">
                                <div className="flex flex-row gap-2">
                                    <Image
                                        src={uncheck}
                                        alt='checkbox'
                                        height={20}
                                        width={20}
                                        unoptimized
                                    />
                                    <div>สามารถดำเนินการได้</div>
                                </div>
                                <div className="flex flex-row gap-2">
                                    <Image
                                        src={uncheck}
                                        alt='checkbox'
                                        height={20}
                                        width={20}
                                        unoptimized
                                    />
                                    <div>ไม่สามารถดำเนินการได้</div>
                                </div>
                                <div>เนื่องจาก</div>
                            </div>
                        </td>
                        <td className="border-s-1 border-black">
                            <div className="flex flex-col gap-2 ms-3 my-3">
                                <div className="flex flex-row gap-2">
                                    <Image
                                        src={uncheck}
                                        alt='checkbox'
                                        height={20}
                                        width={20}
                                        unoptimized
                                    />
                                    <div>สามารถดำเนินการได้ และส่งมอบเรียบร้อย</div>
                                </div>
                                <div className="flex flex-row gap-2">
                                    <Image
                                        src={uncheck}
                                        alt='checkbox'
                                        height={20}
                                        width={20}
                                        unoptimized
                                    />
                                    <div>ไม่สามารถดำเนินการได้</div>
                                </div>
                                <div>เนื่องจาก</div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-center">
                            <Image
                                src={""}
                                alt='license'
                                height={50}
                                width={50}
                                className='mx-auto my-2'
                            />
                            <div>ลงชื่อ เจ้าหน้าที่ไอที</div>
                            <div>วันที่</div>
                        </td>
                        <td className="border-s-1 border-black text-center">
                            <Image
                                src={""}
                                alt='license'
                                height={50}
                                width={50}
                                className='mx-auto my-2'
                            />
                            <div>ลงชื่อ ผู้จัดการส่วนไอที</div>
                            <div>วันที่</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}