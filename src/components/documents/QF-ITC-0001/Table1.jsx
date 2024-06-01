export default function Table1() {
    return (
        <table className="table-auto border-collapse border border-black w-full text-sm text-black">
            <thead>
                <tr>
                    <th className='border border-black text-base' colSpan="3">VCS Group.</th>
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
    );
}