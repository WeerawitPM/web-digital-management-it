'use client'

import React, { useState, useEffect } from "react";
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
import { deleteAll } from "@/lib/equipmentSlice";
import axios from 'axios';

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
        key: "qty",
        label: "QTY",
    },
    {
        key: "id",
        label: "Action",
    },
];

export default function Home() {
    const equipmentListData = useSelector((state) => state.equipment.data);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();
    const [purpose, setPurpose] = useState("");
    const toast = useToast()
    const dispatch = useDispatch();

    const [userData, setUserData] = useState(null); // เก็บข้อมูลที่ได้จาก API

    useEffect(() => {
        // เรียกใช้งาน API เพื่อดึงข้อมูล
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('/api/user'); // เรียกใช้งาน API ที่เส้นทาง '/api'
            const data = response.data;
            setUserData(data); // เก็บข้อมูลที่ได้จาก API ลงใน state
            console.log(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleSave = () => {
        if (purpose === "" || equipmentListData.length === 0) {
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
        // สร้างข้อมูลที่จะส่งไปยัง API
        const requestData = {
            purpose: purpose,
            requestById: userData.id,
            equipment: equipmentListData.map(item => ({
                assetId: item.assetId,
                detail: item.detail,
                qty: item.qty
            }))
        };

        axios.post('/api/request_equipment/add', requestData, {
            headers: {
                'Content-Type': 'application/json',
            }
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
                        duration: 9000,
                        isClosable: true,
                    })
                } else {
                    toast({
                        title: 'Error',
                        description: "Failed to save request.",
                        status: 'error',
                        duration: 9000,
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
                    duration: 9000,
                    isClosable: true,
                })
            })
            .finally(() => {
                onClose();
            });
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
            {userData == null ? "" :
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
                                                Name:
                                                <Chip color="primary" size="xs" variant="flat">
                                                    {userData.firstname}  {userData.lastname}
                                                </Chip>
                                            </div>
                                            <div>
                                                Emp ID.:
                                                <Chip color="primary" size="xs" variant="flat">
                                                    {userData.empId}
                                                </Chip>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4 pt-4">
                                        <div className="flex justify-start items-start space-x-4 flex-wrap">
                                            <div>
                                                Company:
                                                <Chip color="primary" size="xs" variant="flat">
                                                    {userData.company.name}
                                                </Chip>
                                            </div>
                                            <div>
                                                Position:
                                                <Chip color="primary" size="xs" variant="flat">
                                                    {userData.position.name}
                                                </Chip>
                                            </div>
                                            <div>
                                                Department/Section:{" "}
                                                <Chip color="primary" size="xs" variant="flat">
                                                    {userData.department.name}
                                                </Chip>
                                            </div>
                                            <div>
                                                Telephone/Mobile No.:{" "}
                                                <Chip color="primary" size="xs" variant="flat">
                                                    {userData.tel}
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
                            {equipmentListData.length === 0 ? <TableBody emptyContent={"No rows to display."}></TableBody> :
                                <TableBody items={equipmentListData} emptyContent={"No rows to display."}>
                                    {equipmentListData.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell className="text-base">
                                                {item.id}
                                            </TableCell>
                                            <TableCell className="text-base">
                                                {item.name}
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
                    </div>
                </main>
            }
        </>
    )
}