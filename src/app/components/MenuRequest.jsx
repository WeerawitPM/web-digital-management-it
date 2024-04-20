import {
    AddPlus,
    Chat,
    DomainName,
    Edit,
    Email,
    FolderDownload,
    Server,
} from "../components/Icons";

export const menuRequest = [
    {
        description: "ใบร้องขออุปกรณ์สารสนเทศ",
        startContent: (
            <Edit className="text-primary" fill="currentColor" size={30} />
        ),
        title: "QF-ITC-0001",
        href: "/request",
    },
    {
        description: "ใบแจ้งซอมอุปกรณ์สารสนเทศ",
        startContent: (
            <Chat className="text-secondary" fill="currentColor" size={30} />
        ),
        title: "QF-ITC-0002",
        href: "request.equipment",
    },
    {
        description: "แบบคำร้องขอเพิ่มระบบและแก้ไขปรับปรุงระบบ",
        startContent: (
            <AddPlus className="text-success" fill="currentColor" size={30} />
        ),
        title: "QF-ITC-0003",
        href: "request.equipment",
    },
    {
        description: "แบบคำร้องขอใช้งานอีเมล",
        startContent: (
            <Email className="text-warning" fill="currentColor" size={30} />
        ),
        title: "QF-ITC-0005",
        href: "request.equipment",
    },
    {
        description: "แบบคำร้องขอใช้งานระบบ Domain",
        startContent: (
            <DomainName className="text-secondary" fill="currentColor" size={30} />
        ),
        title: "QF-ITC-0006",
        href: "request.equipment",
    },
    {
        description: "แบบคำร้องขอยกเลิกโดเมน อีเมล",
        startContent: (
            <DomainName className="text-danger" fill="currentColor" size={30} />
        ),
        title: "QF-ITC-0007",
        href: "request.equipment",
    },
    {
        description: "ใบขอยืมใช้อุปกรณ์สารสนเทศของส่วนกลาง",
        startContent: (
            <Server className="text-success" fill="currentColor" size={30} />
        ),
        title: "QF-ITC-0009",
        href: "request.equipment",
    },
    {
        description: "ใบขอเบิกอุปกรณ์ไอที",
        startContent: (
            <FolderDownload
                className="text-primary"
                fill="currentColor"
                size={30}
            />
        ),
        title: "QF-ITC-0010",
        href: "request.equipment",
    },
];