import Image from "next/image";

export default function Table3({ ITStaff2, user2 }: { ITStaff2: any, user2: any }) {
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
                                src={ITStaff2?.user?.license === null ? "" : ITStaff2?.user?.license}
                                alt='license'
                                height={50}
                                width={50}
                                className='mx-auto my-2'
                            />
                            <div>ลงชื่อ เจ้าหน้าที่ไอที</div>
                            <div>วันที่ {ITStaff2?.end_date && new Date(ITStaff2?.end_date).toLocaleDateString('th-TH')}</div>
                        </td>
                        <td className="text-center">
                            <Image
                                src={user2?.user?.license === null ? "" : user2?.user?.license}
                                alt='license'
                                height={50}
                                width={50}
                                className='mx-auto my-2'
                            />
                            <div>ลงชื่อ ผู้รับคำร้อง</div>
                            <div>วันที่ {user2?.end_date && new Date(user2?.end_date).toLocaleDateString('th-TH')}</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}