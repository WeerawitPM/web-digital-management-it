import Image from "next/image";

export default function Table3({ user1, ITStaff1 }: { user1: any, ITStaff1: any }) {
    return (
        <>
            <table className="table-auto w-full text-sm text-black mt-5">
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
                            <div>({user1?.user?.firstname} {user1?.user?.lastname})</div>
                        </td>
                        <td className="text-center">
                            <Image
                                src={ITStaff1?.user?.license === null ? "" : ITStaff1?.user?.license}
                                alt='license'
                                height={50}
                                width={50}
                                className='mx-auto my-2'
                            />
                            <div>ลงชื่อ เจ้าหน้าที่ไอที</div>
                            <div>({ITStaff1?.user?.firstname} {ITStaff1?.user?.lastname})</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}