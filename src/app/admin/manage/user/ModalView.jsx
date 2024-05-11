import React from "react";
import {
    Button as NextButton,
    Tooltip
} from "@nextui-org/react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    Input,
    FormLabel,
    Button,
    useDisclosure,
} from '@chakra-ui/react'
import { EyeIcon } from "@/components/EyeIcon";
import Image from "next/image";

export default function ModalView(data) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Tooltip content="View" color="primary">
                <NextButton isIconOnly variant="light" onClick={onOpen} className=" w-10">
                    <EyeIcon className="text-lg text-blue-500" />
                </NextButton>
            </Tooltip>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                isCentered
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>View user</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Image
                            src={!data.image || data.image === "" ? "/images/userProfile/user.png" : data.image + "?timestamp=" + Date.now()}
                            width={150}
                            height={150}
                            className="mx-auto rounded-full text-center"
                            alt={data.username}
                        />
                        <FormControl mt={4}>
                            <FormLabel>Email</FormLabel>
                            <Input
                                isReadOnly
                                value={data.email}
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Username</FormLabel>
                            <Input
                                isReadOnly
                                value={data.username}
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Password</FormLabel>
                            <Input
                                isReadOnly
                                value={data.password}
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <div className="flex flex-row gap-3">
                                <div>
                                    <FormLabel>Firstname</FormLabel>
                                    <Input
                                        isReadOnly
                                        value={data.firstname}
                                    />
                                </div>
                                <div>
                                    <FormLabel>Lastname</FormLabel>
                                    <Input
                                        isReadOnly
                                        value={data.lastname}
                                    />
                                </div>
                            </div>
                        </FormControl>
                        <FormControl mt={4}>
                            <div className="flex flex-row gap-3">
                                <div>
                                    <FormLabel>Emp ID</FormLabel>
                                    <Input
                                        isReadOnly
                                        value={data.empId}
                                    />
                                </div>
                                <div>
                                    <FormLabel>Tel</FormLabel>
                                    <Input
                                        isReadOnly
                                        value={data.tel}
                                    />
                                </div>
                            </div>
                        </FormControl>
                        <FormControl mt={4}>
                            <div className="flex flex-row gap-3">
                                <div className="w-full">
                                    <FormLabel>Company</FormLabel>
                                    <Input
                                        isReadOnly
                                        value={data.company}
                                    />
                                </div>
                                <div className="w-full">
                                    <FormLabel>Department</FormLabel>
                                    <Input
                                        isReadOnly
                                        value={data.department}
                                    />
                                </div>
                            </div>
                        </FormControl>
                        <FormControl mt={4}>
                            <div className="flex flex-row gap-3">
                                <div className="w-full">
                                    <FormLabel>Position</FormLabel>
                                    <Input
                                        isReadOnly
                                        value={data.position}
                                    />
                                </div>
                                <div className="w-full">
                                    <FormLabel>Role</FormLabel>
                                    <Input
                                        isReadOnly
                                        value={data.role}
                                    />
                                </div>
                            </div>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={onClose} colorScheme='blue'>Exit</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}