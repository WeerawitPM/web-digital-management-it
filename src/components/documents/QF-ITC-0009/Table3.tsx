import Image from "next/image";

export default function Table3({ user, start_date, end_date }: { user: any, start_date: any, end_date: any }) {
    return (
        <>
            <table className="table-auto border-collapse border-x-1 border-black w-full text-sm text-black">
                <tbody>
                    <tr>
                        <td>
                            <div className="font-bold">ข้อมูลการยืม (ระยะเวลาสูงสุด 3 เดือน)</div>
                            <div>ระยะเวลาการยืมอุปกรณ์</div>
                            <div>จากวันที่ {start_date && new Date(start_date).toLocaleDateString('th-TH')} ถึงวันที่ {end_date && new Date(end_date).toLocaleDateString('th-TH')}</div>
                            <div className="font-bold">ข้อมูลผู้ใช้งาน</div>
                            <div>ชื่อ-นามสกุล {user?.user?.firstname} {user?.user?.lastname} แผนก {user?.user?.department.name}</div>
                            <div className="flex flex-row justify-end text-center">
                                <div className="flex flex-1"></div>
                                <div className="flex flex-col flex-1">
                                    <Image
                                        src={user?.user?.license === null ? "" : user?.user?.license}
                                        alt='license'
                                        height={50}
                                        width={50}
                                        className='mx-auto my-2'
                                    />
                                    <div>ลงชื่อ ผู้ใช้งาน</div>
                                    <div>({user?.user?.firstname} {user?.user?.lastname})</div>
                                    <div>{start_date && new Date(start_date).toLocaleDateString('th-TH')}</div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}