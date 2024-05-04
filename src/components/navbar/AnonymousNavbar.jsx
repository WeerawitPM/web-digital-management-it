"use client"
import React from "react";
import Image from "next/image";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    Link,
    Button,
} from "@nextui-org/react";

export default function AnonymousNavbar() {
    return (
        <Navbar isBordered maxWidth="xl" className="bg-vcs-blue">
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

            <NavbarContent as="div" justify="end">
                <Link href="/signin">
                    <Button auto size="small" className="text-white" variant="bordered">
                        Signin
                    </Button>
                </Link>
            </NavbarContent>
        </Navbar>
    );
}