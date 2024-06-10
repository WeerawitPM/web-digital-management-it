import { AddIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { Navbar, NavbarContent } from "@nextui-org/react"
import { useSession } from "next-auth/react"
import Link from "next/link"

export default function HeaderMain({ title }: { title: any }) {
    const { data: session } = useSession();
    return (
        <Navbar position="static" isBordered maxWidth="xl">
            <NavbarContent justify="start" className="font-bold">
                3. QF-ITC-0003 แบบคำร้องขอเพิ่มระบบและแก้ไขปรับปรุงระบบ {title}
            </NavbarContent>
            {session?.user?.role === "user" || session?.user?.role === "manager" ?
                <NavbarContent justify="end">
                    <Link href={`/${session?.user?.role}/documents/QF-ITC-0003/add`}>
                        <Button colorScheme="purple" leftIcon={<AddIcon />} size='sm'>
                            เพิ่มรายการร้องขอ
                        </Button>
                    </Link>
                </NavbarContent>
                : ""
            }
        </Navbar>
    )
}