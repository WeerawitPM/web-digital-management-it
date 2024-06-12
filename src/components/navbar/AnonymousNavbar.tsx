"use client"
import React, { useContext } from "react";
import Image from "next/image";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    Link,
    Button,
} from "@nextui-org/react";
import { Switch } from "@nextui-org/react";
import { MoonIcon } from "@/components/icon/MoonIcon";
import { SunIcon } from "@/components/icon/SunIcon";
import { ThemeContext } from "@/context/ThemeContext";  // Import ThemeContext

export default function AnonymousNavbar() {
    const { theme, toggleTheme } = useContext<any>(ThemeContext);

    return (
        <Navbar maxWidth="xl" isBordered isBlurred={false}>
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
                    <div className="font-bold text-xl text-foreground"><span className="text-vcs-red ms-2">IT</span> Center</div>
                </Link>
            </NavbarBrand>

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
                <Link href="/signin">
                    <Button size="md" variant="bordered" color="default">
                        Sign in
                    </Button>
                </Link>
            </NavbarContent>
        </Navbar>
    );
}