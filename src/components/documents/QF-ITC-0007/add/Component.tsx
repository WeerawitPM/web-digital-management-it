'use client'

import React, { useMemo, useRef, useState } from "react";
import {
    Card,
    RadioGroup,
    Radio,
    Input,
    DatePicker,
    Button
} from "@nextui-org/react";
import {
    useToast,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogCloseButton,
    useDisclosure,
    Button as ChakraButton
} from "@chakra-ui/react"
import axios from 'axios';
import HeaderMain from "@/components/documents/QF-ITC-0007/HeaderMain";
import Profile from "./Profile";
import { parseAbsoluteToLocal } from "@internationalized/date";

export default function Component({ data }: { data: any }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef<any>();
    const toast = useToast();
    const [domainCompany, setDomainCompany] = useState("");
    const [domainUsername, setDomainUsername] = useState("");
    const [domainCompanyType, setDomainCompanyType] = useState("");
    const [domainEndDate, setDomainEndDate] = useState<any>(parseAbsoluteToLocal(new Date().toISOString()));
    const [emailCompany, setEmailCompany] = useState("");
    const [emailUsername, setEmailUsername] = useState("");
    const [emailCompanyType, setEmailCompanyType] = useState("");
    const [emailEndDate, setEmailEndDate] = useState<any>(parseAbsoluteToLocal(new Date().toISOString()));

    const handleSave = (e: any) => {
        e.preventDefault();
        if (domainEndDate == undefined) {
            toast({
                title: 'Error',
                description: "Please select date.",
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } else {
            onOpen();
        }
    }

    const handleConfirmSave = () => {
        onClose();
        const domain_end_date = new Date(domainEndDate.year, domainEndDate.month - 1, domainEndDate.day, domainEndDate.hour, domainEndDate.minute, domainEndDate.second, domainEndDate.millisecond).toISOString();
        const email_end_date = new Date(emailEndDate.year, emailEndDate.month - 1, emailEndDate.day, emailEndDate.hour, emailEndDate.minute, emailEndDate.second, emailEndDate.millisecond).toISOString();
        // สร้างข้อมูลที่จะส่งไปยัง API
        const formData = new FormData();
        formData.append("domain_company", domainCompany);
        formData.append("domain_username", domainUsername);
        formData.append("domain_company_type", domainCompanyType);
        formData.append("domain_end_date", domain_end_date);
        formData.append("email_company", emailCompany);
        formData.append("email_username", emailUsername);
        formData.append("email_company_type", emailCompanyType);
        formData.append("email_end_date", email_end_date);

        axios.post('/api/user/documents/QF-ITC-0007/add', formData)
            .then(response => {
                if (response.data.status === "success") {
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

    // const validateDomainUsername = (value: string) => value.match(/^[A-Z0-9._%+-]+\.[A-Z0-9._%+-]+$/i);
    const validateDomainUsername = (value: string) => value.match(/^[A-Z0-9._%+-]+\.[A-Z0-9]$/i);
    const isInvalidDomainUsername = useMemo(() => {
        if (domainUsername === "") return false;

        return validateDomainUsername(domainUsername) ? false : true;
    }, [domainUsername]);

    const validateEmailUsername = (value: string) => value.match(/^[A-Z0-9._%+-]+\.[A-Z0-9]$/i);
    const isInvalidEmailUsername = useMemo(() => {
        if (emailUsername === "") return false;

        return validateEmailUsername(emailUsername) ? false : true;
    }, [emailUsername]);

    return (
        <>
            <HeaderMain title={undefined} />
            <main className="max-w-7xl mx-auto s>m:px-6 lg:px-8 space-y-6 min-h-screen pb-5">
                <Profile data={data} />
                <Card className="p-4 sm:p-8 sm:rounded-lg">
                    <form onSubmit={(e: any) => handleSave(e)} className="flex flex-col gap-5">
                        <div className="text-center text-xl font-bold">Domain</div>
                        <div>
                            <div className="mb-3">ขอยกเลิกใช้งานโดเมนของ</div>
                            <RadioGroup
                                value={domainCompany}
                                onValueChange={setDomainCompany}
                                orientation="horizontal"
                                isRequired
                            >
                                <Radio value="VCS">VCS</Radio>
                                <Radio value="VCST">VCST</Radio>
                                <Radio value="BVS">BVS</Radio>
                                <Radio value="AAA">AAA</Radio>
                                <Radio value="TKM">TKM</Radio>
                            </RadioGroup>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div>Username:</div>
                            <Input
                                isRequired
                                placeholder="Enter username"
                                variant="bordered"
                                size="lg"
                                className="flex-1"
                                isInvalid={isInvalidDomainUsername}
                                color={isInvalidDomainUsername ? "danger" : "success"}
                                errorMessage={`(ประกอบด้วยชื่อเต็มภาษาอังกฤษตามด้วย "." และนาสกุลภาษาอังกฤษตัวแรก เช่น firstname.l)`}
                                onChange={(e) => setDomainUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <RadioGroup
                                value={domainCompanyType}
                                onValueChange={setDomainCompanyType}
                                orientation="horizontal"
                                isRequired
                            >
                                <Radio value=".vcs.co.th">.vcs.co.th</Radio>
                                <Radio value=".vcst.co.th">.vcst.co.th</Radio>
                                <Radio value=".bvs.co.th">.bvs.co.th</Radio>
                                <Radio value=".aaa.co.th">.aaa.co.th</Radio>
                                <Radio value=".tkm.co.th">.tkm.co.th</Radio>
                            </RadioGroup>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div>วันที่เลิกใช้:</div>
                            <DatePicker
                                isRequired
                                label="Date Picker"
                                variant="bordered"
                                hideTimeZone
                                defaultValue={parseAbsoluteToLocal(new Date().toISOString())}
                                value={domainEndDate}
                                onChange={setDomainEndDate}
                            />
                        </div>
                        <div className="text-center text-xl font-bold mt-5">Email</div>
                        <div>
                            <div className="mb-3">ขอเข้าใช้งานอีเมลของ</div>
                            <RadioGroup
                                value={emailCompany}
                                onValueChange={setEmailCompany}
                                orientation="horizontal"
                                isRequired
                            >
                                <Radio value="VCS">VCS</Radio>
                                <Radio value="VCST">VCST</Radio>
                                <Radio value="BVS">BVS</Radio>
                                <Radio value="AAA">AAA</Radio>
                                <Radio value="TKM">TKM</Radio>
                            </RadioGroup>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div>Username:</div>
                            <Input
                                isRequired
                                placeholder="Enter username"
                                variant="bordered"
                                size="lg"
                                className="flex-1"
                                isInvalid={isInvalidEmailUsername}
                                color={isInvalidEmailUsername ? "danger" : "success"}
                                errorMessage={`(ประกอบด้วยชื่อเต็มภาษาอังกฤษตามด้วย "." และนาสกุลภาษาอังกฤษตัวแรก เช่น firstname.l)`}
                                onChange={(e) => setEmailUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <RadioGroup
                                value={emailCompanyType}
                                onValueChange={setEmailCompanyType}
                                orientation="horizontal"
                                isRequired
                            >
                                <Radio value="@vcsthai.com">@vcsthai.com</Radio>
                                <Radio value="@vcsthailand.co.th">@vcsthailand.co.th</Radio>
                                <Radio value="@bvs.co.th">@bvs.co.th</Radio>
                                <Radio value="@aaa.co.th">@aaa.co.th</Radio>
                                <Radio value="@tkm-thaikin.com">@tkm-thaikin.com</Radio>
                            </RadioGroup>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div>วันที่เริ่มใช้:</div>
                            <DatePicker
                                isRequired
                                label="Date Picker"
                                variant="bordered"
                                hideTimeZone
                                defaultValue={parseAbsoluteToLocal(new Date().toISOString())}
                                value={emailEndDate}
                                onChange={setEmailEndDate}
                            />
                        </div>
                        <div className="flex justify-center">
                            <Button className="text-white bg-[#38A169]" size="lg" type="submit">
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
                            <ChakraButton ref={cancelRef} onClick={onClose} colorScheme='red'>
                                No
                            </ChakraButton>
                            <ChakraButton colorScheme='green' ml={3} onClick={() => handleConfirmSave()}>
                                Yes
                            </ChakraButton>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </main>
        </>
    )
}
