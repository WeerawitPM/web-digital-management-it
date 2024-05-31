"use client"
import React, { useState, useEffect } from "react";
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
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem
} from "@nextui-org/react";
// import { NotificationIcon } from "../components/Icons";
import CustomDropdownMenu from "../CustomDropdownMenu";
import { menuRequest } from "../documents/QF-ITC-0001/MenuRequest";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from 'next/navigation'

export default function ManagerNavbar({ role }) {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const { data: session } = useSession();
    const pathname = usePathname();
    const home = pathname.startsWith(`/${role}/`);
    const documents = pathname.startsWith(`/${role}/documents`);

    return (
        <Navbar maxWidth="xl" className="bg-vcs-blue" onMenuOpenChange={setIsMenuOpen} isBordered isBlurred={false}>
            {home && (
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden text-white"
                />
            )}
            <NavbarMenu>
                <NavbarMenuItem>
                    <Link href={`/${role}`} color="foreground">หน้าแรก</Link>
                </NavbarMenuItem>
                {documents && (
                    <CustomDropdownMenu title="แบบฟอร์มร้องขอ" menus={menuRequest} className="text-foreground" size="md" role={role} />
                )}
            </NavbarMenu>
            <NavbarBrand>
                <Link>
                    <Image
                        src="/images/logo.png"
                        alt="Vercel Logo"
                        width={62}
                        height={45}
                        quality={100}
                        priority
                        unoptimized
                    />
                    <p className="font-bold text-vcs-white text-xl"><span className="text-vcs-red ms-2">IT</span> Center</p>
                </Link>
            </NavbarBrand>

            <NavbarContent className="hidden sm:flex gap-4" as="div" justify="center">
                <NavbarItem>
                    {home && (
                        <Link href={`/${role}`} className="text-white">หน้าแรก</Link>
                    )}
                </NavbarItem>
                {documents && (
                    <CustomDropdownMenu title="แบบฟอร์มร้องขอ" menus={menuRequest} className="text-white" size="md" role={role} />
                )}
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
                            <p className="font-semibold">{session.user.email}</p>
                        </DropdownItem>
                        <DropdownItem key="settings">Profile</DropdownItem>
                        <DropdownItem key="logout" color="danger" className="text-danger" onClick={() => signOut({ callbackUrl: '/' })} onPress={() => signOut({ callbackUrl: '/' })}>
                            Sign out
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </NavbarContent>
        </Navbar>
    );
}