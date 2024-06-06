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
                1. QF-ITC-0001 ใบร้องขออุปกรณ์สารสนเทศ {title}
            </NavbarContent>
            {session?.user?.role === "user" ?
                <NavbarContent justify="end">
                    <Link href="/user/documents/QF-ITC-0001/add">
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