import { Navbar, NavbarContent } from "@nextui-org/react";

export default function Header() {
    return (
        <Navbar position="static" isBordered maxWidth="xl">
            <NavbarContent justify="start" className="font-bold">
                Profile
            </NavbarContent>
        </Navbar>
    )
}