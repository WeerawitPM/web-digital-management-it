export default function Table2() {
    return (
        <table className="w-full text-sm text-black">
            <tbody>
                <tr>
                    <td className="font-bold">1. ข้อกำหนดหน้าที่ความรับผิดชอบของผู้ใช้งาน (User Responsibilities)</td>
                </tr>
                <tr>
                    <td>
                        <div className="ms-3">
                            <div>1.1 การใช้งานรหัสผ่าน</div>
                            <div className="ms-5">
                                ต้องป้องกัน ดูแล รักษาข้อมูลบัญชีผู้ใช้งาน (Username) และรหัสผ่าน (Password)
                                โดยมีบัญชีชื่อผู้ใช้งานของตนเอง และห้ามใช้ร่วมกับผู้อื่น รวมทั้ง ห้ามเผยแพร่แจกจ่าย หรือ
                                ให้ผู้อื่นล่วงรู้รหัสผ่าน</div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div className="flex ms-3">
                            <div className="mr-1">1.2</div>
                            <div>ต้องกำหนดรหัสผ่านให้ประกอบด้วยตัวอักษรเล็ก/ใหญ่ และตัวเลขไม่น้อยกว่า 6 ตัวอักษร</div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div className="flex ms-3">
                            <div className="mr-1">1.3</div>
                            <div>ไม่จดหรือบันทึกรหัสผ่านไว้ในสถานที่ ที่ง่ายต่อการสังเกตุเห็นของบุคคลอื่น</div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div className="flex ms-3">
                            <div className="mr-1">1.4</div>
                            <div>
                                การกระทำใด ๆ ที่เกิดจากการใช้บัญชีผู้ใช้งานของตนเอง ที่มีกฎหมายกำหนด
                                ให้เป็นความผิด ไม่ว่าการกระทำนั้นจะเกิดจากตนเองหรือไม่ก็ตาม ให้ถือว่าเป็นความรับผิดชอบ
                                ของเจ้าบองบัญชี ผู้ใช้งานจะต้องรับผิดชอบต่อความผิดที่่เกิดขึ้น</div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div className="flex ms-3">
                            <div className="mr-1">1.5</div>
                            <div>หากมีข้อสงสัย ต้องการเปลี่ยนรหัสผ่าน หรือต้องการคำปรึกษา ติดต่อเจ้าหน้าที่ไอที เบอร์</div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}