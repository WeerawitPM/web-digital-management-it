import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { PrismaClient } from '@prisma/client';

export async function PATCH(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return Response.json({ status: "fail", message: "You are not logged in" });
    } else {
        const prisma = new PrismaClient();
        try {
            const data = await req.formData() as any;
            const [
                document_head_id, remark, computer_brand, computer_name, computer_ram, computer_vga,
                computer_dvd, computer_equipment_number, computer_serial_number, computer_mb, computer_hdd, computer_case,
                monitor_brand, monitor_size, monitor_equipment_number, monitor_serial_number, printer_brand,
                printer_equipment_number, printer_serial_number, ups_brand, ups_equipment_number, ups_serial_number
            ] = [
                'document_head_id', 'remark', 'computer_brand', 'computer_name', 'computer_ram', 'computer_vga',
                'computer_dvd', 'computer_equipment_number', 'computer_serial_number', 'computer_mb', 'computer_hdd', 'computer_case',
                'monitor_brand', 'monitor_size', 'monitor_equipment_number', 'monitor_serial_number', 'printer_brand',
                'printer_equipment_number', 'printer_serial_number', 'ups_brand', 'ups_equipment_number', 'ups_serial_number'
            ].map(field => data.get(field) as string);

            let step = parseInt(data.get("step") as string);
            let status = parseInt(data.get("status") as string);

            await prisma.$transaction(async (prisma) => {
                const findTrack = await prisma.track_Doc.findFirst({
                    where: {
                        document_head_id: document_head_id,
                        step: step
                    },
                    select: {
                        id: true
                    }
                });

                await prisma.track_Doc.update({
                    where: {
                        id: findTrack?.id
                    },
                    data: {
                        status: status,
                        remark: remark,
                        user_id: parseInt(session?.user?.id),
                        end_date: new Date(Date.now())
                    }
                })

                if (findTrack) {
                    if (status === 1) {
                        step = step + 1;
                        status = 0;
                    } else {
                        status = 2;
                    }
                }

                await prisma.document_Head.update({
                    where: {
                        ref_no: document_head_id
                    },
                    data: {
                        step: step,
                        status: status,
                    }
                })

                const findTable = await prisma.table_ITC_0009.findFirst({
                    where: {
                        document_head_id: document_head_id
                    },
                    select: {
                        id: true
                    }
                })

                await prisma.table_ITC_0009.update({
                    where: {
                        id: findTable?.id
                    },
                    data: {
                        computer_brand: computer_brand,
                        computer_name: computer_name,
                        computer_ram: computer_ram,
                        computer_vga: computer_vga,
                        computer_dvd: computer_dvd,
                        computer_equipment_number: computer_equipment_number,
                        computer_serial_number: computer_serial_number,
                        computer_mb: computer_mb,
                        computer_hdd: computer_hdd,
                        computer_case: computer_case,
                        monitor_brand: monitor_brand,
                        monitor_size: monitor_size,
                        monitor_equipment_number: monitor_equipment_number,
                        monitor_serial_number: monitor_serial_number,
                        printer_brand: printer_brand,
                        printer_equipment_number: printer_equipment_number,
                        printer_serial_number: printer_serial_number,
                        ups_brand: ups_brand,
                        ups_equipment_number: ups_equipment_number,
                        ups_serial_number: ups_serial_number,
                    }
                })
            })
            return Response.json({
                status: "success",
                message: "Approved",
            })
        } catch (error) {
            console.error('Error:', error);
            return Response.json({
                status: "fail",
                message: "Fail to approve",
                error: error, // Include error message for debugging
            });
        } finally {
            await prisma.$disconnect();
        }
    }
}