import {
  Stack,
  TimeHistory
} from "./icon/Icons";

export const menuRegister = [
  {
    description: "ใบทะเบียนประวัติอุปกรณ์สารสนเทศ",
    startContent: (
      <Stack className="text-primary" fill="currentColor" size={30} />
    ),
    title: "QF-ITC-0004",
    href: "request.equipment",
  },
  {
    description: "ใบทะเบียนประวัติ License MA",
    startContent: (
      <TimeHistory className="text-success" fill="currentColor" size={30} />
    ),
    title: "QF-ITC-0004",
    href: "request.equipment",
  },
];