export default function Table2({ requestBy }: { requestBy: any }) {
    return (
        <table className="table-auto border-collapse border border-black text-sm mt-1 w-full text-black">
            <thead>
                <tr>
                    <th className='border border-black' colSpan={4}>Requestor Detail</th>
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
    );
}