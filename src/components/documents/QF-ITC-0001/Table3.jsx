import Image from "next/image";

export default function Table3({ requestBy, requestFor, data, userManager, refRo }) {
    return (
        <table className="table-auto border-collapse border border-black text-sm mt-1 w-full">
            <thead>
                <tr>
                    <th className='border border-black' colSpan="6">Request Description</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className='border border-black font-bold'>
                        {requestFor?.map((item, index) => (
                            <div
                                key={item.id || index}
                                className="flex font-bold">
                                Request for : <span className='font-normal'>&nbsp;{item?.asset?.asset_type?.name}</span>
                            </div>
                        ))}
                    </td>
                    <td className='border border-black' colSpan="3">
                        <div className='flex flex-col'>
                            {requestFor?.map((item, index) => (
                                <div
                                    key={item.id || index}
                                    className="flex font-bold">item : <span className='font-normal'>&nbsp;{item?.asset?.name}</span>
                                </div>
                            ))}
                        </div>
                    </td>
                    <td className='border border-black'>
                        <div className='flex flex-col'>
                            {requestFor?.map((item, index) => (
                                <div
                                    key={item.id || index}
                                    className="flex font-bold">Quantity : <span className='font-normal'>&nbsp;{item?.qty}</span>
                                </div>
                            ))}
                        </div>
                    </td>
                </tr>
                <tr>
                    <td className='border border-black font-bold'>Purpose of Usage :
                        <br /> (Please write in Detail)
                    </td>
                    <td className='border border-black' colSpan="5">
                        {requestFor?.map((item, index) => (
                            <div key={item.id || index}>- {item?.purpose}</div>
                        ))}
                    </td>
                </tr>
                <tr>
                    <td className='border border-black font-bold'>Device Specification /
                        <br /> Software Version :
                    </td>
                    <td className='border border-black' colSpan="5">
                        {requestFor?.map((item, index) => (
                            <div key={item.id || index}>- {item?.spec_detail}</div>
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
                        <div className='flex' key="date">
                            Date Required (Approximately) :<div className='font-normal'>&nbsp;{data?.start_date && new Date(data.start_date).toLocaleDateString('th-TH')}</div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td className='border border-black font-bold' colSpan="3">Remark :
                        {data?.Track_Doc
                            .filter(index => index?.remark && index.remark !== "null" && index.remark.trim() !== "")
                            .map((index) => (
                                <span key={index} className='font-normal'>&nbsp;{index.remark}</span>
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
                            />}
                        <div>{userManager?.end_date && new Date(userManager.end_date).toLocaleDateString('th-TH')}</div>
                        <div>APPROVER</div>
                        <div>Position : {userManager?.user?.position?.name}</div>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}