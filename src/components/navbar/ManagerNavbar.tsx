"use client"
import React, { useState, useContext } from "react";
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
    NavbarMenuItem,
    Switch
} from "@nextui-org/react";
// import { NotificationIcon } from "../components/Icons";
import CustomDropdownMenu from "../CustomDropdownMenu";
import { menuRequest } from "../documents/QF-ITC-0001/MenuRequest";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from 'next/navigation'
import { ThemeContext } from "@/context/ThemeContext";  // Import ThemeContext
import { MoonIcon } from "@/components/icon/MoonIcon";
import { SunIcon } from "@/components/icon/SunIcon";

export default function ManagerNavbar({ role }: { role: string }) {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const { data: session } = useSession();
    const pathname = usePathname();
    const home = pathname.startsWith(`/${role}/`);
    const documents = pathname.startsWith(`/${role}/documents`);
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <Navbar maxWidth="xl" onMenuOpenChange={setIsMenuOpen} isBordered isBlurred={false}>
            {home && (
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden text-foreground"
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
                        src={theme === 'dark' ? "/images/logo.png" : "/images/logo2.png"}
                        alt="Vercel Logo"
                        width={62}
                        height={45}
                        quality={100}
                        priority
                        unoptimized
                    />
                    <p className="font-bold text-foreground text-xl"><span className="text-vcs-red ms-2">IT</span> Center</p>
                </Link>
            </NavbarBrand>

            <NavbarContent className="hidden sm:flex gap-4" as="div" justify="center">
                <NavbarItem>
                    {home && (
                        <Link href={`/${role}`} className="text-foreground">หน้าแรก</Link>
                    )}
                </NavbarItem>
                {documents && (
                    <CustomDropdownMenu title="แบบฟอร์มร้องขอ" menus={menuRequest} className="text-foreground" size="md" role={role} />
                )}
            </NavbarContent>

            <NavbarContent as="div" justify="end">
                <Switch
                    size="lg"
                    color="secondary"
                    isSelected={theme === 'dark'}
                    onChange={toggleTheme}
                    thumbIcon={({ isSelected, className }) =>
                        isSelected ? (
                            <MoonIcon className={className} />
                        ) : (
                            <SunIcon className={className} />
                        )
                    }
                >
                </Switch>
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
                            <p className="font-semibold">{session?.user?.email}</p>
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