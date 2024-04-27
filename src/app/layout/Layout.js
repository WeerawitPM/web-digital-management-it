"use client"
import React from "react";
import Image from "next/image";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    DropdownItem,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    Avatar,
    Badge,
    Button,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem
} from "@nextui-org/react";
// import { NotificationIcon } from "../components/Icons";
import CustomDropdownMenu from "../components/CustomDropdownMenu";
import { menuRequest } from "../components/MenuRequest";

export default function Layout() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    return (
        <Navbar isBordered maxWidth="xl" className="bg-vcs-blue" onMenuOpenChange={setIsMenuOpen}>
            <NavbarMenuToggle
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className="sm:hidden text-white"
            />
            <NavbarMenu>
                <NavbarMenuItem>
                    <Link
                        color="foreground"
                        className="w-full"
                        href="/"
                        size="lg"
                    >
                        หน้าแรก
                    </Link>
                </NavbarMenuItem>
                <NavbarMenuItem>
                    <Link
                        color="foreground"
                        className="w-full"
                        href="#"
                        size="lg"
                    >
                        แจ้งซ่อม
                    </Link>
                </NavbarMenuItem>
                <CustomDropdownMenu title="แบบฟอร์มร้องขอ" menus={menuRequest} className="text-foreground" size="lg" />
            </NavbarMenu>
            <NavbarBrand>
                <Link>
                    <Image
                        src="https://vcsgroupthai.com/wp-content/uploads/2023/09/Screenshot-2023-07-14-164438-depositphotos-bgremover.png"
                        alt="Vercel Logo"
                        width={62}
                        height={45}
                        priority
                    />
                    <p className="font-bold text-vcs-white text-xl"><span className="text-vcs-red ms-2">IT</span> Center</p>
                </Link>
            </NavbarBrand>

            <NavbarContent className="hidden sm:flex gap-4" as="div" justify="center">
                <NavbarItem>
                    <Link href="/" className="text-white">
                        หน้าแรก
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link href="/report_repair" className="text-white">
                        แจ้งซ่อม
                    </Link>
                </NavbarItem>
                <CustomDropdownMenu title="แบบฟอร์มร้องขอ" menus={menuRequest} className="text-white" size="md" />
            </NavbarContent>

            <NavbarContent as="div" justify="end">
                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        <Avatar
                            isBordered
                            as="button"
                            className="transition-transform"
                            color="secondary"
                            name="Jason Hughes"
                            size="sm"
                            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                        />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                        <DropdownItem key="profile" className="h-14 gap-2">
                            <p className="font-semibold">Signed in as</p>
                            <p className="font-semibold">zoey@example.com</p>
                        </DropdownItem>
                        <DropdownItem key="settings">Profile</DropdownItem>
                        <DropdownItem key="logout" color="danger" className="text-danger">
                            Log Out
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </NavbarContent>
        </Navbar>
    );
}