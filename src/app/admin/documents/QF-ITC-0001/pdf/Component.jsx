import Image from 'next/image';
import React from 'react';
import uncheck from "@/images/uncheck.png";

export default function Component() {
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
                            <td className='border border-black font-bold'>Name-Surname :</td>
                            <td className='border border-black'>test</td>
                            <td className='border border-black font-bold'>Employee ID :</td>
                            <td className='border border-black'>test</td>
                        </tr>
                        <tr>
                            <td className='border border-black font-bold'>Company :</td>
                            <td className='border border-black'></td>
                            <td className='border border-black font-bold'>Department & Section :</td>
                            <td className='border border-black'></td>
                        </tr>
                        <tr>
                            <td className='border border-black font-bold'>Position :</td>
                            <td className='border border-black'></td>
                            <td className='border border-black font-bold'>Telephone :</td>
                            <td className='border border-black'></td>
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
                                <div className="flex font-bold">Request for : <div className='font-normal'>test</div></div>
                                <div className="flex font-bold">Request for : <div className='font-normal'>test</div></div>
                                <div className="flex font-bold">Request for : <div className='font-normal'>test</div></div>
                            </td>
                            <td className='border border-black' colSpan="3">
                                <div className='flex flex-col'>
                                    <div className="flex font-bold">Item : <div className='font-normal'>test</div></div>
                                    <div className="flex font-bold">Item : <div className='font-normal'>test</div></div>
                                    <div className="flex font-bold">Item : <div className='font-normal'>test</div></div>
                                </div>
                            </td>
                            <td className='border border-black'>
                                <div className='flex flex-col'>
                                    <div className="flex font-bold">Quantity : <div className='font-normal'>1</div></div>
                                    <div className="flex font-bold">Quantity : <div className='font-normal'>2</div></div>
                                    <div className="flex font-bold">Quantity : <div className='font-normal'>3</div></div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className='border border-black font-bold'>Purpose of Usage :
                                <br /> (Please write in Detail)
                            </td>
                            <td className='border border-black' colSpan="5"></td>
                        </tr>
                        <tr>
                            <td className='border border-black font-bold'>Device Specification /
                                <br /> Software Version :
                            </td>
                            <td className='border border-black' colSpan="5"></td>
                        </tr>
                        <tr>
                            <td className='border border-black font-bold'>Refer to Quotation No. :</td>
                            <td className='border border-black' colSpan="5">
                                <div>testtesttesttesttesttest</div>
                            </td>
                        </tr>
                        <tr>
                            <td className='border border-black font-bold'>Refer to R/O. No. : </td>
                            <td className='border border-black'>testtesttesttesttesttest</td>
                            <td className='border border-black font-bold' colSpan="3">
                                <div className='flex'>
                                    Date Required (Approximately) :<div className='font-normal'>29/05/2567</div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className='border border-black font-bold' colSpan="3">Remark : </td>
                            <td className='border border-black font-bold text-center'>
                                <Image
                                    src="/images/userProfile/user.png"
                                    height={50}
                                    width={50}
                                    className='mx-auto my-2'
                                    unoptimized
                                />
                                <div>29/05/2567</div>
                                <div>REQUESTOR</div>
                            </td>
                            <td className='border border-black font-bold text-center'>
                                <Image
                                    src="/images/userProfile/user.png"
                                    height={50}
                                    width={50}
                                    className='mx-auto my-2'
                                    unoptimized
                                />
                                <div>29/05/2567</div>
                                <div>APPROVER</div>
                                <div>Position : </div>
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
                                            src={uncheck}
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
                                            src={uncheck}
                                            height={20}
                                            width={20}
                                            className='mx-auto'
                                            unoptimized
                                        />
                                    </div>
                                    <div className='font-bold'>Unable to proceed</div>
                                </div>
                                <div className='font-bold mt-5'>Remark :
                                    <div className='font-normal'></div>
                                </div>
                            </td>
                            <td className='border border-black'>
                                <div className='flex flex-row gap-2 m-2'>
                                    <div>
                                        <Image
                                            src={uncheck}
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
                                            src={uncheck}
                                            height={20}
                                            width={20}
                                            className='mx-auto'
                                            unoptimized
                                        />
                                    </div>
                                    <div className='font-bold'>Unable to proceed</div>
                                </div>
                                <div className='font-bold mt-5'>Remark :
                                    <div className='font-normal'></div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table className="table-auto border-collapse border border-black border-t-0 w-full text-sm">
                    <tbody>
                        <tr>
                            <td className='border-x-1 border-black font-bold text-center'>
                                <Image
                                    src="/images/userProfile/user.png"
                                    height={50}
                                    width={50}
                                    className='mx-auto my-2'
                                    unoptimized
                                />
                                <div>29/05/2567</div>
                                <div>IT STAFF</div>
                            </td>
                            <td className='border-x-1 border-black font-bold text-center'>
                                <Image
                                    src="/images/userProfile/user.png"
                                    height={50}
                                    width={50}
                                    className='mx-auto my-2'
                                    unoptimized
                                />
                                <div>29/05/2567</div>
                                <div>IT DEPT MGR</div>
                            </td>
                            <td className='border-x-1 border-black font-bold text-center'>
                                <Image
                                    src="/images/userProfile/user.png"
                                    height={50}
                                    width={50}
                                    className='mx-auto my-2'
                                    unoptimized
                                />
                                <div>29/05/2567</div>
                                <div>IT DIV MGR</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
