'use client'

import React, { useState } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Tooltip,
    Chip,
    Divider,
    Textarea
} from "@nextui-org/react";
import {
    Button,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogCloseButton,
    useDisclosure,
    useToast
} from "@chakra-ui/react"
import ModalAddRequestItem from "./ModalAddRequestItem";
import ModalViewItem from "./ModalViewItem";
import DeleteRequestItem from "./DeleteRequestItem";
import { useSelector, useDispatch } from 'react-redux'
import { deleteAll } from "@/lib/repairSlice";

const columns = [
    {
        key: "id",
        label: "#",
    },
    {
        key: "asset",
        label: "Asset",
    },
    {
        key: "description",
        label: "DESCRIPTION",
    },
    {
        key: "id",
        label: "Action",
    },
];

export default function Home() {
    const repairListData = useSelector((state) => state.repair.data);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();
    const [purpose, setPurpose] = useState("");
    const toast = useToast()
    const dispatch = useDispatch();

    const handleSave = () => {
        if (purpose === "" || repairListData.length === 0) {
            return (
                toast({
                    title: 'Error',
                    description: "Please fill in complete information.",
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
            )
        } else {
            onOpen();
        }
    }

    const handleConfirmSave = () => {
        dispatch(deleteAll());
        onClose();
    }

    return (
        <>
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between flex-wrap">
                        <div className="justify-start">
                            <span className="font-semibold text-md text-gray-800 leading-tight">
                                แบบฟอร์มใบร้องขออุปกรณ์สารสนเทศ
                            </span>
                        </div>
                    </div>
                </div>
            </header>
            <main>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6 mb-5">
                    <div className="p-4 sm:p-8 bg-white border shadow-sm sm:rounded-lg w-75 mt-5">
                        <div className="pb-4">
                            <section className="">
                                <header>
                                    <h2 className="text-lg font-medium text-gray-900">
                                        Profile Information
                                    </h2>
                                </header>
                                <div className="flex w-full flex-wrap md:flex-wrap gap-4 pt-4">
                                    <div className="flex justify-start items-start space-x-4">
                                        <div>
                                            Name:{" "}
                                            <Chip color="primary" size="xs" variant="flat">
                                                test
                                            </Chip>
                                        </div>
                                        <div>
                                            Emp ID.:{" "}

                                            <Chip color="primary" size="xs" variant="flat">
                                                test
                                            </Chip>

                                        </div>
                                    </div>
                                </div>
                                <div className="flex w-full flex-wrap md:flex-nowrap gap-4 pt-4">
                                    <div className="flex justify-start items-start space-x-4 flex-wrap">
                                        <div>
                                            Company:{" "}
                                            <Chip color="primary" size="xs" variant="flat">
                                                test
                                            </Chip>
                                        </div>
                                        <div>
                                            Position:{" "}
                                            <Chip color="primary" size="xs" variant="flat">
                                                test
                                            </Chip>
                                        </div>
                                        <div>
                                            Department/Section:{" "}
                                            <Chip color="primary" size="xs" variant="flat">
                                                test
                                            </Chip>
                                        </div>
                                        <div>
                                            Telephone/Mobile No.:{" "}
                                            <Chip color="primary" size="xs" variant="flat">
                                                test
                                            </Chip>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                        <div className="pt-4">
                            <h2 className="text-lg font-medium text-gray-900">Purpose Of Usage</h2>
                            <Textarea
                                required
                                placeholder="Please write in detail."
                                size="lg"
                                variant="bordered"
                                onChange={(event) => setPurpose(event.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <ModalAddRequestItem />
                    </div>
                    <Table aria-label="Example table with dynamic content">
                        <TableHeader columns={columns}>
                            {(column) => <TableColumn key={column.key} className="text-sm">{column.label}</TableColumn>}
                        </TableHeader>
                        {repairListData.length === 0 ? <TableBody emptyContent={"No rows to display."}></TableBody> :
                            <TableBody items={repairListData} emptyContent={"No rows to display."}>
                                {repairListData.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell className="text-base">
                                            {item.id}
                                        </TableCell>
                                        <TableCell className="text-base">
                                            {item.asset}
                                        </TableCell>
                                        <TableCell className="text-base">
                                            {item.detail.length > 40 ?
                                                `${item.detail.substring(0, 40)}...` : item.detail
                                            }
                                        </TableCell>
                                        <TableCell>
                                            <div className="relative flex items-center gap-2">
                                                <ModalViewItem id={item.id} />
                                                <DeleteRequestItem id={item.id} />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        }
                    </Table>
                    <div className="flex justify-center">
                        <Button colorScheme="green" className="text-white" onClick={() => handleSave()}>
                            ยืนยันการร้องขอ
                        </Button>
                        <AlertDialog
                            motionPreset='slideInBottom'
                            leastDestructiveRef={cancelRef}
                            onClose={onClose}
                            isOpen={isOpen}
                            isCentered
                        >
                            <AlertDialogOverlay />

                            <AlertDialogContent>
                                <AlertDialogHeader>Are you sure delete the item?</AlertDialogHeader>
                                <AlertDialogCloseButton />
                                <AlertDialogBody>
                                    This operation cannot be reversed.
                                </AlertDialogBody>
                                <AlertDialogFooter>
                                    <Button ref={cancelRef} onClick={onClose} colorScheme='red'>
                                        No
                                    </Button>
                                    <Button colorScheme='green' ml={3} onClick={() => handleConfirmSave()}>
                                        Yes
                                    </Button>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
            </main>
        </>
    )
}
