import Image from 'next/image';
import React from 'react';
import uncheck from "@/images/uncheck.png";
import check from "@/images/check-mark.png";

export default function Component({ data }) {
    const requestBy = data?.Track_Doc[0]?.user;
    const requestFor = data?.Table_ITC_0001;
    const refRo = data?.Table_ITC_0001[0]?.ref_ro;
    const userManager = data?.Track_Doc[2];
    const ITStaff = data?.Track_Doc[3];
    const ITManager = data?.Track_Doc[4];
    const SuperManager = data?.Track_Doc[5];
    let processPOManager

    if (data?.price >= 5000) {
        processPOManager = SuperManager;
    } else {
        processPOManager = ITManager;
    }

    return (
        <div className="bg-gray-100 flex justify-center items-center min-h-screen">
            <div className="a4 bg-white shadow-lg p-8 my-5">
                {/* <h1 className="text-2xl font-bold mb-4">A4 Size Document</h1>
                <p className="mb-4">This is a document with the dimensions of an A4 paper, styled using Tailwind CSS.</p> */}
                <table className="table-auto border-collapse border border-black w-full text-sm">
                    <thead>
                        <tr>
                            <th className='border border-black' colSpan="3">VCS Group.</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='text-center'>
                            <td className='border border-black' colSpan="3">IT Equipments Request Form</td>
                        </tr>
                        <tr>
                            <td>Document No. QF-ITC-0001</td>
                            <td>Effective Date : 21 September 2023</td>
                            <td>Revsion: 1</td>
                        </tr>
                    </tbody>
                </table>

                <table className="table-auto border-collapse border border-black w-full text-sm mt-1">
                    <thead>
                        <tr>
                            <th className='border border-black' colSpan="4">Requestor Detail</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='border border-black font-bold'>Name-Surname : <span className='font-normal'>{requestBy?.firstname} {requestBy?.lastname}</span></td>
                            <td className='border border-black font-bold'>Employee ID : <span className='font-normal'>{requestBy?.emp_id}</span></td>
                        </tr>
                        <tr>
                            <td className='border border-black font-bold'>Company : <span className='font-normal'>{requestBy?.company.name}</span></td>
                            <td className='border border-black font-bold'>Department & Section : <span className='font-normal'>{requestBy?.department.name}</span></td>
                        </tr>
                        <tr>
                            <td className='border border-black font-bold'>Position : <span className='font-normal'>{requestBy?.position.name}</span></td>
                            <td className='border border-black font-bold'>Telephone : <span className='font-normal'>{requestBy?.tel}</span></td>
                        </tr>
                    </tbody>
                </table>

                <table className="table-auto border-collapse border border-black w-full text-sm mt-1">
                    <thead>
                        <tr>
                            <th className='border border-black' colSpan="6">Request Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='border border-black font-bold'>
                                {requestFor?.map((item) => (
                                    <div className="flex font-bold">Request for : <span className='font-normal'>&nbsp;{item?.asset?.asset_type?.name}</span></div>
                                ))}
                            </td>
                            <td className='border border-black' colSpan="3">
                                <div className='flex flex-col'>
                                    {requestFor?.map((item) => (
                                        <div className="flex font-bold">item : <span className='font-normal'>&nbsp;{item?.asset?.name}</span></div>
                                    ))}
                                </div>
                            </td>
                            <td className='border border-black'>
                                <div className='flex flex-col'>
                                    {requestFor?.map((item) => (
                                        <div className="flex font-bold">Quantity : <span className='font-normal'>&nbsp;{item?.qty}</span></div>
                                    ))}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className='border border-black font-bold'>Purpose of Usage :
                                <br /> (Please write in Detail)
                            </td>
                            <td className='border border-black' colSpan="5">
                                {requestFor?.map((item) => (
                                    <div>- {item?.purpose}</div>
                                ))}
                            </td>
                        </tr>
                        <tr>
                            <td className='border border-black font-bold'>Device Specification /
                                <br /> Software Version :
                            </td>
                            <td className='border border-black' colSpan="5">
                                {requestFor?.map((item) => (
                                    <div>- {item?.spec_detail}</div>
                                ))}
                            </td>
                        </tr>
                        <tr>
                            <td className='border border-black font-bold'>Refer to Quotation No. :</td>
                            <td className='border border-black' colSpan="5">
                                {requestFor?.map((item, index) => (
                                    <div key={index}>
                                        {item.Table_Ref_Quotation.length > 0 ? (
                                            item.Table_Ref_Quotation.map((quote, quoteIndex) => (
                                                <div key={quoteIndex}>
                                                    <a href={quote.path} target="_blank" rel="noopener noreferrer">
                                                        - {quote.name}
                                                    </a>
                                                </div>
                                            ))
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                ))}
                            </td>
                        </tr>
                        <tr>
                            <td className='border border-black font-bold'>Refer to R/O. No. : </td>
                            <td className='border border-black'>
                                <div> {refRo}</div>
                            </td>
                            <td className='border border-black font-bold' colSpan="3">
                                <div className='flex'>
                                    Date Required (Approximately) :<div className='font-normal'>
                                        &nbsp;{data?.start_date && new Date(data.start_date).toLocaleDateString('th-TH')}
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className='border border-black font-bold' colSpan="3">Remark :
                                {data?.Track_Doc
                                    .filter(index => index?.remark && index.remark !== "null" && index.remark.trim() !== "")
                                    .map((index) => (
                                        <span className='font-normal'>&nbsp;{index.remark}</span>
                                    ))}
                            </td>
                            <td className='border border-black font-bold text-center'>
                                {requestBy?.license === "" || requestBy?.license === null ? "" :
                                    <Image
                                        src={requestBy?.license}
                                        alt='license'
                                        height={80}
                                        width={80}
                                        className='mx-auto my-2'
                                        unoptimized
                                    />
                                }
                                <div>{data?.start_date && new Date(data.start_date).toLocaleDateString('th-TH')}</div>
                                <div>REQUESTOR</div>
                            </td>
                            <td className='border border-black font-bold text-center'>
                                {userManager?.user?.license === "" || userManager?.user?.license === null ? "" :
                                    <Image
                                        src={userManager?.user?.license}
                                        alt='license'
                                        width={80}
                                        height={80}
                                        className='mx-auto my-2'
                                        unoptimized
                                    />}
                                <div>{userManager?.end_date && new Date(userManager.end_date).toLocaleDateString('th-TH')}</div>
                                <div>APPROVER</div>
                                <div>Position : {userManager?.user?.position?.name}</div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <table className="table-auto border-collapse border border-black w-full text-sm mt-1">
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
                <table className="table-auto border-collapse border border-black border-t-0 w-full text-sm">
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
                                        unoptimized
                                    />}
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
                                        unoptimized
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
                                        unoptimized
                                    />
                                }
                                <div>{SuperManager?.end_date && new Date(SuperManager.end_date).toLocaleDateString('th-TH')}</div>
                                <div>IT DIV MGR</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
