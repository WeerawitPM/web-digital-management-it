import { Card, Radio, RadioGroup, Textarea } from "@nextui-org/react";

export default function Detail({ data }: { data: any }) {
    return (
        <Card className="p-4 sm:p-8 sm:rounded-lg w-75 gap-5">
            <div>
                <div className="mb-3">ความต้องการ</div>
                <RadioGroup
                    value={data.requirement}
                    orientation="horizontal"
                    isReadOnly
                >
                    <Radio value="Add">เพิ่ม</Radio>
                    <Radio value="Edit">แก้ไข/ปรับปรุง</Radio>
                </RadioGroup>
            </div>
            <div>
                <div>มีความประสงค์</div>
                <Textarea
                    placeholder="มีความประสงค์"
                    variant="bordered"
                    size="lg"
                    isReadOnly
                    value={data.purpose}
                />
            </div>
            <div>
                <div>รายละเอียดความต้องการ</div>
                <Textarea
                    placeholder="รายละเอียดความต้องการ"
                    variant="bordered"
                    size="lg"
                    isReadOnly
                    value={data.requirement_detail}
                />
            </div>
            <div>
                <div className="mb-3">รายละเอียดข้อมูล (เอกสารแนบต้องมี Proposal เป็นอย่างน้อย 1 รายการ)</div>
                <RadioGroup
                    value={data.proposal_detail}
                    orientation="horizontal"
                    isReadOnly
                    className="mb-3"
                >
                    <Radio value="Proposal">Proposal</Radio>
                    <Radio value="MIFC">MIFC</Radio>
                    <Radio value="WI">WI</Radio>
                    <Radio value="Flowchart">Flowchart</Radio>
                    <Radio value="Other">อื่น ๆ</Radio>
                </RadioGroup>
            </div>
        </Card>
    );
}