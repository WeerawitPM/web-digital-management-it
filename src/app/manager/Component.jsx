"use client"

import Image from "next/image";
import React from "react";
import { Button, Divider } from "@nextui-org/react";
import { Card, CardBody, CardFooter, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function Component() {

    return (
        <main className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6 py-12">
            <div className="flex flex-row flex-wrap justify-center">
                <Card align='center'>
                    <CardBody>
                        <Text>View a summary of all your customers over the last month.</Text>
                    </CardBody>
                    <CardFooter>
                        <Link href="/manager/documents/QF-ITC-0001">
                            <Button colorScheme='blue'>Go to page</Button>
                        </Link>
                    </CardFooter>
                </Card>
                <Card align='center'>
                    <CardBody>
                        <Text>View a summary of all your customers over the last month.</Text>
                    </CardBody>
                    <CardFooter>
                        <Button colorScheme='blue'>Go to page</Button>
                    </CardFooter>
                </Card>
                <Card align='center'>
                    <CardBody>
                        <Text>View a summary of all your customers over the last month.</Text>
                    </CardBody>
                    <CardFooter>
                        <Button colorScheme='blue'>Go to page</Button>
                    </CardFooter>
                </Card>
            </div>
        </main>
    );
}