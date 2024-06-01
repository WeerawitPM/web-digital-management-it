import { Navbar, NavbarContent, NavbarBrand  } from "@nextui-org/react"

export default function HeaderMain({ title }) {
    return (
        <Navbar position="static" isBordered maxWidth="xl">
            <NavbarContent justify="start">
                <NavbarBrand  className="font-semibold text-md">
                    {title}
                </NavbarBrand>
            </NavbarContent>
        </Navbar>
    )
}