import Image from "next/image";
import uncheck from "@/images/uncheck.png";

export default function Table2() {
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
                                <div>ชื่อ-สกุล</div>
                                <div>ตำแหน่ง</div>
                                <div>ส่วน/แผนก</div>
                                <div>โทร</div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>มีความประสงค์</td>
                    </tr>
                    <tr>
                        <td>รายละเอียดความต้องการ</td>
                    </tr>
                    <tr>
                        <td>รายละเอียดข้อมูล (เอกสารแนบต้องมี Proposal เป็นอย่างน้อย 1 รายการร)</td>
                    </tr>
                    <tr>
                        <td>
                            <div className="flex flex-row gap-3">
                                <div className="flex flex-row gap-1">
                                    <Image
                                        src={uncheck}
                                        alt='checkbox'
                                        height={20}
                                        width={20}
                                        unoptimized
                                    />
                                    <div>Proposal</div>
                                </div>
                                <div className="flex flex-row gap-1">
                                    <Image
                                        src={uncheck}
                                        alt='checkbox'
                                        height={20}
                                        width={20}
                                        unoptimized
                                    />
                                    <div>MIFC</div>
                                </div>
                                <div className="flex flex-row gap-1">
                                    <Image
                                        src={uncheck}
                                        alt='checkbox'
                                        height={20}
                                        width={20}
                                        unoptimized
                                    />
                                    <div>WI</div>
                                </div>
                                <div className="flex flex-row gap-1">
                                    <Image
                                        src={uncheck}
                                        alt='checkbox'
                                        height={20}
                                        width={20}
                                        unoptimized
                                    />
                                    <div>Flowchart</div>
                                </div>
                                <div className="flex flex-row gap-1">
                                    <Image
                                        src={uncheck}
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
                                src={""}
                                alt='license'
                                height={50}
                                width={50}
                                className='mx-auto my-2'
                            />
                            <div>ลงชื่อ ผู้ยื่นคำร้อง</div>
                            <div>วันที่</div>
                        </td>
                        <td className="text-center">
                            <Image
                                src={""}
                                alt='license'
                                height={50}
                                width={50}
                                className='mx-auto my-2'
                            />
                            <div>ลงชื่อ ผู้รับคำร้อง</div>
                            <div>วันที่</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}