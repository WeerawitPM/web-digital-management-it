// 'use client'

import React, { useRef } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Card,
    Chip,
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
import ModalAdd from "./ModalAdd";
import ModalView from "./ModalView";
import DeleteRequestItem from "./DeleteRequestItem";
import { useSelector, useDispatch } from 'react-redux'
import { deleteAll } from "@/lib/equipmentSlice";
import axios from 'axios';
import HeaderMain from "@/components/documents/QF-ITC-0001/HeaderMain";

const columns = [
    { key: "id", label: "#", },
    { key: "asset", label: "Asset", },
    { key: "purpose", label: "PURPOSE OF USAGE", },
    { key: "deviceSpecification", label: "DEVICE SPECIFICATION", },
    { key: "qty", label: "QTY", },
    { key: "id", label: "Action", },
];

export default function Component({ data }: { data: any }) {
    const equipmentListData = useSelector((state: any) => state.equipment.data);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef<any>();
    const toast = useToast()
    const dispatch = useDispatch();

    const handleSave = () => {
        onOpen();
    }

    const handleConfirmSave = () => {
        // สร้างข้อมูลที่จะส่งไปยัง API
        const requestData = {
            request_by_id: data?.id,
            equipment: equipmentListData.map((item: { assetId: number; purpose: string; detail: string; qty: number; }) => ({
                assetId: item.assetId,
                purpose: item.purpose,
                detail: item.detail,
                qty: item.qty
            }))
        };

        axios.post('/api/user/documents/QF-ITC-0001/add', requestData, {
            // headers: {
            //     'Content-Type': 'application/json',
            // }
        })
            .then(response => {
                console.log('Success:', response.data);
                if (response.data.status === "success") {
                    dispatch(deleteAll());
                    onClose();
                    toast({
                        title: 'Success',
                        description: "Request has been saved.",
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                    })
                } else {
                    toast({
                        title: 'Error',
                        description: "Failed to save request.",
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                    })
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                toast({
                    title: 'Error',
                    description: "Failed to save request.",
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                })
            })
            .finally(() => {
                onClose();
            });
    }

    // Global error handling
    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            console.error('Error fetching data:', error);
            return Promise.reject(error);
        }
    );

    return (
        <>
            <HeaderMain title={undefined} />
            <main className="max-w-7xl mx-auto s>m:px-6 lg:px-8 space-y-6 min-h-screen">
                <Card className="p-4 sm:p-8 sm:rounded-lg w-75 mt-5">
                    <div className="pb-4">
                        <section>
                            <header>
                                <h2 className="text-lg font-medium text-foreground">
                                    Profile Information
                                </h2>
                            </header>
                            <div className="flex w-full flex-wrap md:flex-wrap gap-4 pt-4">
                                <div className="flex justify-start items-start space-x-4">
                                    <div>
                                        Name:
                                        <Chip color="primary" size="md" variant="flat">
                                            {data?.firstname}  {data?.lastname}
                                        </Chip>
                                    </div>
                                    <div>
                                        Emp ID.:
                                        <Chip color="primary" size="md" variant="flat">
                                            {data?.emp_id}
                                        </Chip>

                                    </div>
                                </div>
                            </div>
                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4 pt-4">
                                <div className="flex justify-start items-start space-x-4 flex-wrap">
                                    <div>
                                        Company:
                                        <Chip color="primary" size="md" variant="flat">
                                            {data?.company?.name}
                                        </Chip>
                                    </div>
                                    <div>
                                        Position:
                                        <Chip color="primary" size="md" variant="flat">
                                            {data?.position?.name}
                                        </Chip>
                                    </div>
                                    <div>
                                        Department/Section:{" "}
                                        <Chip color="primary" size="md" variant="flat">
                                            {data?.department?.name}
                                        </Chip>
                                    </div>
                                    <div>
                                        Telephone/Mobile No.:{" "}
                                        <Chip color="primary" size="md" variant="flat">
                                            {data?.tel}
                                        </Chip>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </Card>
                <div className="flex justify-center">
                    <ModalAdd />
                </div>
                <Table aria-label="Example table with dynamic content">
                    <TableHeader columns={columns}>
                        {(column) => <TableColumn key={column.key} className="text-sm">{column.label}</TableColumn>}
                    </TableHeader>
                    <TableBody items={equipmentListData} emptyContent={"No rows to display."}>
                        {equipmentListData.map((item: any) => (
                            <TableRow key={item.id}>
                                <TableCell className="text-base">
                                    {item.id}
                                </TableCell>
                                <TableCell className="text-base">
                                    {item.name}
                                </TableCell>
                                <TableCell className="text-base">
                                    {item.purpose.length > 40 ?
                                        `${item.purpose.substring(0, 40)}...` : item.purpose
                                    }
                                </TableCell>
                                <TableCell className="text-base">
                                    {item.detail.length > 40 ?
                                        `${item.detail.substring(0, 40)}...` : item.detail
                                    }
                                </TableCell>
                                <TableCell className="text-base">
                                    {item.qty}
                                </TableCell>
                                <TableCell>
                                    <div className="relative flex items-center gap-2">
                                        <ModalView id={item.id} />
                                        <DeleteRequestItem id={item.id} />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
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
                            <AlertDialogHeader>Are you sure save the item?</AlertDialogHeader>
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
            </main>
        </>
    )
}