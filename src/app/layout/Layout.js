"use client"
import React from "react";
import Image from "next/image";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, Badge, Button } from "@nextui-org/react";
import {
    AddPlus,
    CameraCCTV,
    Chat,
    CheckList,
    DomainName,
    Edit,
    Email,
    FingerPrinter,
    FolderDownload,
    NetworkWifi,
    NotificationIcon,
    Printer,
    QRCodeScanner,
    RollBack,
    Server,
    Stack,
    TimeHistory
  } from "../components/icon";

export default function App() {
    return (
        <Navbar isBordered maxWidth="xl" className="bg-vcs-blue">
            <NavbarBrand>
                <Link>
                    <Image
                        src="https://vcsgroupthai.com/wp-content/uploads/2023/09/Screenshot-2023-07-14-164438-depositphotos-bgremover.png"
                        alt="Vercel Logo"
                        width={42}
                        height={25}
                        priority
                    />
                </Link>
            </NavbarBrand>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link href="#" className="text-white">
                        หน้าแรก
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link href="#" className="text-white">
                        แบบฟอร์มร้องขอ
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link href="#" className="text-white">
                        แบบฟอร์มลงทะเบียน
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link href="#" className="text-white">
                        แผนการทำงาน
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link href="#" className="text-white">
                        รายงาน
                    </Link>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent as="div" justify="end">
                <NavbarItem>
                    <Badge
                        color="danger"
                        content={5}
                        // isInvisible={isInvisible}
                        shape="circle"
                    >
                        <Button isIconOnly variant="light">
                            <NotificationIcon className="fill-current" size={30} color="white"/>
                        </Button>
                    </Badge>
                </NavbarItem>
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
                        <DropdownItem key="settings">My Settings</DropdownItem>
                        <DropdownItem key="team_settings">Team Settings</DropdownItem>
                        <DropdownItem key="analytics">Analytics</DropdownItem>
                        <DropdownItem key="system">System</DropdownItem>
                        <DropdownItem key="configurations">Configurations</DropdownItem>
                        <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                        <DropdownItem key="logout" color="danger">
                            Log Out
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </NavbarContent>
        </Navbar>
    );
}
