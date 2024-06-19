export default function Table1({ department, created_at }: { department: any, created_at: any }) {
    return (
        <table className="table-auto border-collapse border border-black w-full text-sm text-black">
            <tbody>
                <tr className='text-center'>
                    <td className='border border-black' colSpan={3}>V.C.S. GROUP</td>
                    <td>
                        <div className="text-start ms-2">ฝ่าย/แผนก {department}</div>
                    </td>
                </tr>
                <tr className='text-center'>
                    <td className='border border-black' colSpan={3}>แบบฟอร์ม: ใบขอยืมใช้อุปกรณ์สารสนเทศของส่วนกลาง</td>
                    <td>
                        <div className="text-start ms-2">วันที่ {created_at && new Date(created_at).toLocaleDateString('th-TH')}</div>
                    </td>
                </tr>
                <tr>
                    <td className='border border-black text-center'>หมายเลขเอกสาร:QF-ITC-0009</td>
                    <td className='border border-black text-center'>วันที่เริ่มใช้ 21 ก.ย. 66</td>
                    <td className='border border-black text-center'>ครั้งที่ 1 หน้าที่ 1 จาก 1</td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    );
}