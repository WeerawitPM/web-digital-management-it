import Image from "next/image";

export default function Table4({ ITStaff, AccountingStaff }: { ITStaff: any, AccountingStaff: any }) {
    return (
        <>
            <table className="table-auto border-collapse border-1 border-black w-full text-sm text-black">
                <tbody>
                    <tr>
                        <td className="text-center">
                            <div className="text-start font-bold">ตรวจสอบข้อมูลเรียบร้อย</div>
                            <div className="flex">
                                <div className="flex flex-col flex-1">
                                    <Image
                                        src={ITStaff?.user?.license === null ? "" : ITStaff?.user?.license}
                                        alt='license'
                                        height={50}
                                        width={50}
                                        className='mx-auto my-2'
                                    />
                                    <div>ลงชื่อ</div>
                                    <div>({ITStaff?.user?.firstname} {ITStaff?.user?.lastname})</div>
                                    <div>{ITStaff?.end_date && new Date(ITStaff.end_date).toLocaleDateString('th-TH')}</div>
                                    <div>เจ้าหน้าที่ส่วนเทคโนโลยีสารสนเทศ</div>
                                </div>
                                <div className="flex flex-col flex-1">
                                    <Image
                                        src={AccountingStaff?.user?.license === null ? "" : AccountingStaff?.user?.license}
                                        alt='license'
                                        height={50}
                                        width={50}
                                        className='mx-auto my-2'
                                    />
                                    <div>ลงชื่อ</div>
                                    <div>({AccountingStaff?.user?.firstname} {AccountingStaff?.user?.lastname})</div>
                                    <div>{AccountingStaff?.end_date && new Date(AccountingStaff.end_date).toLocaleDateString('th-TH')}</div>
                                    <div>เจ้าหน้าที่บัญชี</div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}