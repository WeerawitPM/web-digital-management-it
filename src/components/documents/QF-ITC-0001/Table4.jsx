import Image from "next/image";
import uncheck from "@/images/uncheck.png";
import check from "@/images/check-mark.png";

export default function Table4({ ITStaff, processPOManager }) {
    return (
        <table className="table-auto border-collapse border border-black text-sm mt-1 w-full text-black">
            <thead>
                <tr>
                    <th className='border border-black' colSpan="4">IT Center</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className='border border-black'>
                        <div className='flex flex-row gap-2 m-2'>
                            <div>
                                <Image
                                    src={ITStaff?.status === 0 ? uncheck : (ITStaff?.status === 1 ? check : uncheck)}
                                    alt='checkbox'
                                    height={20}
                                    width={20}
                                    className='mx-auto'
                                    unoptimized
                                />
                            </div>
                            <div className='font-bold'>Able to proceed PO. No. : </div>
                        </div>
                        <div className='flex flex-row gap-2 m-2'>
                            <div>
                                <Image
                                    src={ITStaff?.status === 2 ? check : uncheck}
                                    alt='checkbox'
                                    height={20}
                                    width={20}
                                    className='mx-auto'
                                    unoptimized
                                />
                            </div>
                            <div className='font-bold'>Unable to proceed</div>
                        </div>
                        <div className='font-bold mt-5'>Remark :
                            <span className='font-normal'>{ITStaff?.remark && ITStaff.remark !== "null" ? ITStaff.remark : null}</span>
                        </div>
                    </td>
                    <td className='border border-black'>
                        <div className='flex flex-row gap-2 m-2'>
                            <div>
                                <Image
                                    src={processPOManager?.status === 0 ? uncheck : (processPOManager?.status === 1 ? check : uncheck)}
                                    alt='checkbox'
                                    height={20}
                                    width={20}
                                    className='mx-auto'
                                    unoptimized
                                />
                            </div>
                            <div className='font-bold'>Able to proceed PO. No. : </div>
                        </div>
                        <div className='flex flex-row gap-2 m-2'>
                            <div>
                                <Image
                                    src={processPOManager?.status === 2 ? check : uncheck}
                                    alt='checkbox'
                                    height={20}
                                    width={20}
                                    className='mx-auto'
                                    unoptimized
                                />
                            </div>
                            <div className='font-bold'>Unable to proceed</div>
                        </div>
                        <div className='font-bold mt-5'>Remark :
                            <span className='font-normal'>{processPOManager?.remark && processPOManager.remark !== "null" ? processPOManager.remark : null}</span>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}