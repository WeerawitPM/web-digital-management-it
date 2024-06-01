import Image from "next/image";

export default function Table5({ ITStaff, ITManager, SuperManager }) {
    return (
        <table className="table-auto border-collapse border border-black border-t-0 text-sm w-full text-black">
            <tbody>
                <tr>
                    <td className='border-x-1 border-black font-bold text-center'>
                        {ITStaff?.user?.license === "" || ITStaff?.user?.license === null ? "" :
                            <Image
                                src={ITStaff?.user?.license}
                                alt='license'
                                height={80}
                                width={80}
                                className='mx-auto my-2'
                            />
                        }
                        <div>{ITStaff?.end_date && new Date(ITStaff.end_date).toLocaleDateString('th-TH')}</div>
                        <div>IT STAFF</div>
                    </td>
                    <td className='border-x-1 border-black font-bold text-center'>
                        {ITManager?.user?.license === "" || ITManager?.user?.license === null ? "" :
                            <Image
                                src={ITManager?.user?.license}
                                alt='license'
                                height={80}
                                width={80}
                                className='mx-auto my-2'
                            />
                        }
                        <div>{ITManager?.end_date && new Date(ITManager.end_date).toLocaleDateString('th-TH')}</div>
                        <div>IT DEPT MGR</div>
                    </td>
                    <td className='border-x-1 border-black font-bold text-center'>
                        {SuperManager?.user?.license === "" || SuperManager?.user?.license === null ? "" :
                            <Image
                                src={SuperManager?.user?.license}
                                alt='license'
                                height={80}
                                width={80}
                                className='mx-auto my-2'
                            />
                        }
                        <div>{SuperManager?.end_date && new Date(SuperManager.end_date).toLocaleDateString('th-TH')}</div>
                        <div>IT DIV MGR</div>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}