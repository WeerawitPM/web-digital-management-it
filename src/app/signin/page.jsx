"use client"

import React from "react";
import { Button, Divider, Input } from "@nextui-org/react";
import { Player } from '@lottiefiles/react-lottie-player';
import {
    Card,
    CardBody,
    Stack,
    Heading,
    CardFooter,
    ButtonGroup,
} from "@chakra-ui/react";
import { EyeFilledIcon } from "../components/EyeFilledIcon ";
import { EyeSlashFilledIcon } from "../components/EyeSlashFilledIcon";
import Link from "next/link";

export default function Signin() {
    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <main>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="flex flex-row flex-wrap justify-center items-center">
                        <Player
                            autoplay
                            loop
                            src="https://lottie.host/1f3d7bfb-77db-4164-b021-7cb9bed825d7/9M6VhCNhlC.json"
                            className="flex flex-1"
                            style={{ height: "70vh" }}
                        >
                        </Player>
                                                <Card className="flex flex-1 md:mb-0">
                            <CardBody>
                                <Stack mt='6' spacing='3'>
                                    <Heading size='lg' className="text-center">Sign in</Heading>
                                    <Input type="email" variant='bordered' placeholder='Enter your Email' size="lg" />
                                    <Input
                                        variant="bordered"
                                        placeholder="Enter your password"
                                        size="lg"
                                        endContent={
                                            <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                                {isVisible ? (
                                                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                                ) : (
                                                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                                )}
                                            </button>
                                        }
                                        type={isVisible ? "text" : "password"}
                                    />
                                    <Button className="bg-vcs-blue" color="primary">Sign in</Button>
                                </Stack>
                            </CardBody>
                            <Divider />
                            <CardFooter>
                                Not a member?<Link href="" className="ms-2 text-blue-500 font-semibold">Sign up</Link>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </main>
    )
}