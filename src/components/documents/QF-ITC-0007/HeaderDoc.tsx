import Link from "next/link"
import { Button } from "@chakra-ui/react"
import { useSession } from "next-auth/react"
import { Navbar, NavbarContent } from "@nextui-org/react";

export default function HeaderDoc({ doc_no }: { doc_no: string }) {
    const { data: session } = useSession();

    return (
        <Navbar position="static" isBordered maxWidth="xl">
            <NavbarContent justify="start" className="font-bold">
                แบบคำร้องขอยกเลิกโดเมน/อีเมล {doc_no}
            </NavbarContent>
            <NavbarContent justify="end">
                <Link href={`/${session?.user?.role}/documents/QF-ITC-0007/pdf/${doc_no}`}>
                    <Button size="md">Export to PDF.</Button>
                </Link>
            </NavbarContent>
        </Navbar>
    )
}