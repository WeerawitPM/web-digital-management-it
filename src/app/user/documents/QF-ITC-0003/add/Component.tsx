'use client'

import React, { useRef, useState } from "react";
import {
    Card,
    Textarea,
    RadioGroup,
    Radio
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
import axios from 'axios';
import HeaderMain from "@/components/documents/QF-ITC-0003/HeaderMain";
import Profile from "./Profile";

export default function Component({ data }: { data: any }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef<any>();
    const toast = useToast();
    const [requirement, setRequirement] = useState("");
    const [purpose, setPurpose] = useState("");
    const [requirementDetail, setRequirementDetail] = useState("");
    const [proposalDetail, setProposalDetail] = useState("");
    const [documents, setDocuments] = useState<File[]>([]);

    const handleSave = (e: any) => {
        e.preventDefault();
        onOpen();
    }

    const handleConfirmSave = () => {
        // สร้างข้อมูลที่จะส่งไปยัง API
        const formData = new FormData();
        formData.append("requirement", requirement);
        formData.append("purpose", purpose);
        formData.append("requirement_detail", requirementDetail);
        formData.append("proposal_detail", proposalDetail);
        documents.forEach((document, index) => {
            formData.append(`attached_proposal_${index}`, document);
        });

        axios.post('/api/user/documents/QF-ITC-0003/add', formData)
            .then(response => {
                if (response.data.status === "success") {
                    onClose();
                    toast({
                        title: 'Success',
                        description: "Request has been saved.",
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                    });
                    // Reload the page after 3 seconds
                    setTimeout(() => {
                        location.reload();
                    }, 3000);
                } else {
                    toast({
                        title: 'Error',
                        description: "Failed to save request.",
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                    });
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
                });
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
            <main className="max-w-7xl mx-auto s>m:px-6 lg:px-8 space-y-6 min-h-screen pb-5">
                <Profile data={data} />
                <Card className="p-4 sm:p-8 sm:rounded-lg w-75">
                    <form onSubmit={(e: any) => handleSave(e)} className="flex flex-col gap-5">
                        <div>
                            <div className="mb-3">ความต้องการ</div>
                            <RadioGroup
                                value={requirement}
                                onValueChange={setRequirement}
                                orientation="horizontal"
                                isRequired
                            >
                                <Radio value="Add">เพิ่ม</Radio>
                                <Radio value="Edit">แก้ไข/ปรับปรุง</Radio>
                            </RadioGroup>
                        </div>
                        <div>
                            <div>มีความประสงค์</div>
                            <Textarea
                                placeholder="มีความประสงค์"
                                variant="bordered"
                                size="lg"
                                isRequired
                                onChange={(e) => setPurpose(e.target.value)}
                            />
                        </div>
                        <div>
                            <div>รายละเอียดความต้องการ</div>
                            <Textarea
                                placeholder="รายละเอียดความต้องการ"
                                variant="bordered"
                                size="lg"
                                isRequired
                                onChange={(e) => setRequirementDetail(e.target.value)}
                            />
                        </div>
                        <div>
                            <div className="mb-3">รายละเอียดข้อมูล (เอกสารแนบต้องมี Proposal เป็นอย่างน้อย 1 รายการ)</div>
                            <RadioGroup
                                value={proposalDetail}
                                onValueChange={setProposalDetail}
                                orientation="horizontal"
                                isRequired
                            >
                                <Radio value="Proposal">Proposal</Radio>
                                <Radio value="MIFC">MIFC</Radio>
                                <Radio value="WI">WI</Radio>
                                <Radio value="Flowchart">Flowchart</Radio>
                                <Radio value="Other">อื่น ๆ</Radio>
                            </RadioGroup>
                            <input
                                type="file"
                                name="file-input"
                                id="file-input"
                                className="block w-full border border-gray-200 shadow-sm rounded-lg 
                            text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 
                            disabled:pointer-events-none file:border-0 file:me-4 file:py-3 file:px-4
                            my-3"
                                multiple
                                onChange={({ target }) => {
                                    if (target.files) {
                                        const files = Array.from(target.files);
                                        setDocuments(files);
                                    }
                                }}
                            />
                        </div>
                        <div className="flex justify-center">
                            <Button colorScheme="green" className="text-white" type="submit">
                                ยืนยันการร้องขอ
                            </Button>
                        </div>
                    </form>
                </Card>
                <AlertDialog
                    motionPreset='slideInBottom'
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                    isOpen={isOpen}
                    isCentered
                >
                    <AlertDialogOverlay />

                    <AlertDialogContent>
                        <AlertDialogHeader>Are you sure save?</AlertDialogHeader>
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
            </main>
        </>
    )
}
