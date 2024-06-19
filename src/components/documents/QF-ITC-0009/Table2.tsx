export default function Table2({ requestFor }: { requestFor: any }) {
    return (
        <table className="table-auto border-collapse border-x-1 border-black w-full text-sm text-black">
            <tbody>
                <tr>
                    <td>
                        <div className="flex">
                            <div className="flex flex-col flex-1">
                                <div className="font-bold">1. คอมพิวเตอร์ (Computer)</div>
                                <div className="ms-3">ยี่ห้อ/รุ่น : {requestFor?.computer_brand}</div>
                                <div className="ms-3">ชื่อเครื่อง : {requestFor?.computer_name}</div>
                                <div className="ms-3">RAM : {requestFor?.computer_ram}</div>
                                <div className="ms-3">VGA : {requestFor?.computer_vga}</div>
                                <div className="ms-3">DVD R/W : {requestFor?.computer_dvd}</div>
                            </div>
                            <div className="flex flex-col flex-1">
                                <div>หมายเลขครุภัณฑ์ : {requestFor?.computer_equipment_number}</div>
                                <div>S/N : {requestFor?.computer_serial_number}</div>
                                <div>M/B : {requestFor?.computer_mb}</div>
                                <div>HDD : {requestFor?.computer_hdd}</div>
                                <div>Case : {requestFor?.computer_case}</div>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td className="border border-black">
                        <div className="flex">
                            <div className="flex flex-col flex-1">
                                <div className="font-bold">2. จอภาพ (Monitor)</div>
                                <div className="ms-3">ยี่ห้อ/รุ่น : {requestFor?.monitor_brand}</div>
                                <div className="ms-3">ขนาด : {requestFor?.monitor_size}</div>
                            </div>
                            <div className="flex flex-col flex-1">
                                <div>หมายเลขครุภัณฑ์ : {requestFor?.monitor_equipment_number}</div>
                                <div>S/N : {requestFor?.monitor_serial_number}</div>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td className="border border-black">
                        <div className="flex">
                            <div className="flex flex-col flex-1">
                                <div className="font-bold">3. เครื่องพิมพ์ (Printer)</div>
                                <div className="ms-3">ยี่ห้อ/รุ่น : {requestFor?.printer_brand}</div>
                                <div className="ms-3">ขนาด : {requestFor?.printer_size}</div>
                            </div>
                            <div className="flex flex-col flex-1">
                                <div>หมายเลขครุภัณฑ์ : {requestFor?.printer_equipment_number}</div>
                                <div>S/N : {requestFor?.printer_serial_number}</div>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td className="border border-black">
                        <div className="flex">
                            <div className="flex flex-col flex-1">
                                <div className="font-bold">4. เครื่องสำรองไฟ (UPS)</div>
                                <div className="ms-3">ยี่ห้อ/รุ่น : {requestFor?.ups_brand}</div>
                                <div className="ms-3">ขนาด : {requestFor?.ups_size}</div>
                            </div>
                            <div className="flex flex-col flex-1">
                                <div>หมายเลขครุภัณฑ์ : {requestFor?.ups_equipment_number}</div>
                                <div>S/N : {requestFor?.ups_serial_number}</div>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td className="border border-black">
                        <div className="font-bold">5. อื่น ๆ ระบุ (Other)</div>
                        <div className="ms-3">{requestFor?.etc == "undefined" ? "" : requestFor?.etc}</div>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}