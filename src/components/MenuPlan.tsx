import {
  CameraCCTV,
  CheckList,
  FingerPrinter,
  NetworkWifi,
  Printer,
  QRCodeScanner,
  RollBack,
  Server,
  Stack,
} from "./icon/Icons";

export const menuPlan = [
  {
    description: "Weekly Check Sheet Backup",
    startContent: (
      <Stack className="text-primary" fill="currentColor" size={30} height={undefined} width={undefined} />
    ),
    title: "QF-ITC-0008",
    href: "request.equipment",
  },
  {
    description: "แบบฟอร์มการตรวจสอบด้านเครื่องคอมพิวเตอร์แม่ข่าย (SERVER)",
    startContent: (
      <Server className="text-success" fill="currentColor" size={30} height={undefined} width={undefined} />
    ),
    title: "QF-ITC-0011",
    href: "request.equipment",
  },
  {
    description: "Check List อุปกรณ์สำรองข้อมูล",
    startContent: (
      <Stack className="text-secondary" fill="currentColor" size={30} height={undefined} width={undefined} />
    ),
    title: "QF-ITC-0012",
    href: "request.equipment",
  }, // QF-ITC-0012 Check List อุปกรณ์สำรองข้อมูล
  {
    description: "แบบฟอร์มการตรวจสอบด้านระบบเครื่อข่าย (Network)",
    startContent: (
      <NetworkWifi className="text-danger" fill="currentColor" size={30} height={undefined} width={undefined} />
    ),
    title: "QF-ITC-0013",
    href: "request.equipment",
  }, // QF-ITC-0013 แบบฟอร์มการตรวจสอบด้านระบบเครื่อข่าย (Network)
  {
    description: "HANHELD & SCANNER MAINTENANCE CHECK LIST",
    startContent: (
      <QRCodeScanner className="text-info" fill="currentColor" size={30} height={undefined} width={undefined} />
    ),
    title: "QF-ITC-0014",
    href: "request.equipment",
  }, // QF-ITC-0014 HANHELD & SCANNER MAINTENANCE CHECK LIST
  {
    description: "UPS SERVER MAINTENANCE CHECK LIST",
    startContent: (
      <Stack className="text-success" fill="currentColor" size={30} height={undefined} width={undefined} />
    ),
    title: "QF-ITC-0015",
    href: "request.equipment",
  }, // QF-ITC-0015 UPS SERVER MAINTENANCE CHECK LIST
  {
    description: "PRINTTER DOT MATRIX MAINTENANCE CHECK LIST",
    startContent: (
      <Printer className="text-warning" fill="currentColor" size={30} height={undefined} width={undefined} />
    ),
    title: "QF-ITC-0016",
    href: "request.equipment",
  }, // QF-ITC-0016 PRINTTER DOT MATRIX MAINTENANCE CHECK LIST
  {
    description:
      "แบบฟอร์มการตรวจสอบตำนอุปกรณ์ป้องกันการโจมตีผ่านระบบเคร็อขาย (Firewall)",
    startContent: (
      <FingerPrinter className="text-danger" fill="currentColor" size={30} height={undefined} width={undefined} />
    ),
    title: "QF-ITC-0017",
    href: "request.equipment",
  }, // QF-ITC-0017 แบบฟอร์มการตรวจสอบตำนอุปกรณ์ป้องกันการโจมตีผ่านระบบเคร็อขาย (Firewall)
  {
    description: "CCTV MAINTENANCE CHECK LIST",
    startContent: (
      <CameraCCTV className="text-secondary" fill="currentColor" size={30} height={undefined} width={undefined} />
    ),
    title: "QF-ITC-0018",
    href: "request.equipment",
  }, // QF-ITC-0018 CCTV MAINTENANCE CHECK LIST
  {
    description: "Data Backup Plan",
    startContent: (
      <Stack className="text-primary" fill="currentColor" size={30} height={undefined} width={undefined} />
    ),
    title: "QF-ITC-0019",
    href: "request.equipment",
  }, // QF-ITC-0019 Data Backup Plan
  {
    description: "แบบฟอมบันทึกผลการสำรองข้อมูล",
    startContent: (
      <CheckList className="text-success" fill="currentColor" size={30} height={undefined} width={undefined} />
    ),
    title: "QF-ITC-0020",
    href: "request.equipment",
  }, // QF-ITC-0020 แบบฟอมบันทึกผลการสำรองข้อมูล
  {
    description: "Checklist ของการกู้คืนบริการระบบสารสนเทศ",
    startContent: (
      <RollBack className="text-secondary" fill="currentColor" size={30} height={undefined} width={undefined} />
    ),
    title: "QF-ITC-0021",
    href: "request.equipment",
  }, // QF-ITC -0021 Checklist ของการกู้คืนบริการระบบสารสนเทศ
];