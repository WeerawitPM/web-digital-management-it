"use client"

import React, { useState } from "react";
import { Button, Divider, Input } from "@nextui-org/react";
import { Player } from '@lottiefiles/react-lottie-player';
import {
    Card,
    CardBody,
    Stack,
    Heading,
    CardFooter,
    useToast
} from "@chakra-ui/react";
import { EyeFilledIcon } from "@/components/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/components/EyeSlashFilledIcon";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation'

export default function Signin() {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const toast = useToast()
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password,
            })

            if (result.error) {
                console.error(result.error)
                toast({
                    title: 'Error',
                    description: "Wrong email or password",
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
            } else {
                toast({
                    title: 'Success',
                    description: "Welcome",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
                setTimeout(function() {
                    router.push('/');
                    location.reload();
                  }, 2000); // รอสองวินาที (2000 milliseconds) ก่อนที่จะเปลี่ยนเส้นทางและรีโหลดหน้า
            }
        } catch (error) {
            console.log('error', error)
        }
    }

    return (
        <main>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="flex flex-row flex-wrap justify-center items-center">
                        <Card className="flex flex-1 md:mb-0">
                            <CardBody>
                                <div className="flex flewx-row flex-wrap justify-center items-center">
                                    <div className="flex flex-1">
                                        <Player
                                            autoplay
                                            loop
                                            src="https://lottie.host/1f3d7bfb-77db-4164-b021-7cb9bed825d7/9M6VhCNhlC.json"
                                            className="flex flex-1"
                                            style={{ width: "auto" }}
                                        >
                                        </Player>
                                    </div>
                                    <form onSubmit={handleSubmit} className="flex flex-1 flex-col space-y-3">
                                        <Heading size='lg' className="text-center">Sign in</Heading>
                                        <Input
                                            type="email"
                                            variant='bordered'
                                            placeholder='Enter your Email'
                                            size="lg"
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
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
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <Button className="bg-vcs-blue" color="primary" type="submit">Sign in</Button>
                                    </form>
                                </div>
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