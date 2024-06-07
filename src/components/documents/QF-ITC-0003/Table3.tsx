import Image from "next/image";
import uncheck from "@/images/uncheck.png";

export default function Table3() {
    return (
        <>
            <table className="table-auto border-collapse border-t-1 border-x-1 border-black w-full text-sm text-black">
                <thead>
                    <tr>
                        <td className='border border-black' colSpan={2}>ส่วนที่ 2: การส่งมอบระบบ</td>
                    </tr>
                </thead>
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
                            <div>ลงชื่อ เจ้าหน้าที่ไอที</div>
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