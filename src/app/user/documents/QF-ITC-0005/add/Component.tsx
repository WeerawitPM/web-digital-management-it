'use client'

import React, { useMemo, useState } from "react";
import {
    Card,
    RadioGroup,
    Radio,
    Input,
    DatePicker,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure
} from "@nextui-org/react";
import { useToast } from "@chakra-ui/react"
import axios from 'axios';
import HeaderMain from "@/components/documents/QF-ITC-0005/HeaderMain";
import Profile from "./Profile";
import { parseAbsoluteToLocal } from "@internationalized/date";

export default function Component({ data }: { data: any }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const toast = useToast();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [typeEmail, setTypeEmail] = useState("");
    const [password, setPassword] = useState("");
    const [date, setDate] = useState<any>(parseAbsoluteToLocal(new Date().toISOString()));

    const handleSave = (e: any) => {
        e.preventDefault();
        if (date == undefined) {
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

    const handleConfirmSave = (onClose: any) => {
        onClose();
        const newDate = new Date(date.year, date.month - 1, date.day, date.hour, date.minute, date.second, date.millisecond).toISOString()
        // สร้างข้อมูลที่จะส่งไปยัง API
        const formData = new FormData();
        formData.append("email", email);
        formData.append("username", username);
        formData.append("type_email", typeEmail);
        formData.append("password", password);
        formData.append("start_date", newDate);

        axios.post('/api/user/documents/QF-ITC-0005/add', formData)
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

    // const validateUsername = (value: string) => value.match(/^[A-Z0-9._%+-]+\.[A-Z0-9._%+-]+$/i);
    const validateUsername = (value: string) => value.match(/^[A-Z0-9._%+-]+\.[A-Z0-9]$/i);
    const isInvalidUsername = useMemo(() => {
        if (username === "") return false;

        return validateUsername(username) ? false : true;
    }, [username]);

    const validatePassword = (value: string) => value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/);
    const isInvalidPassword = useMemo(() => {
        if (password === "") return false;

        return validatePassword(password) ? false : true;
    }, [password]);

    return (
        <>
            <HeaderMain title={undefined} />
            <main className="max-w-7xl mx-auto s>m:px-6 lg:px-8 space-y-6 min-h-screen pb-5">
                <Profile data={data} />
                <Card className="p-4 sm:p-8 sm:rounded-lg">
                    <form onSubmit={(e: any) => handleSave(e)} className="flex flex-col gap-5">
                        <div>
                            <div className="mb-3">ขอเข้าใช้งานอีเมลล์ของ</div>
                            <RadioGroup
                                value={email}
                                onValueChange={setEmail}
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
                                isInvalid={isInvalidUsername}
                                color={isInvalidUsername ? "danger" : "success"}
                                errorMessage={`(ประกอบด้วยชื่อเต็มภาษาอังกฤษตามด้วย "." และนาสกุลภาษาอังกฤษตัวแรก เช่น firstname.l)`}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <RadioGroup
                                value={typeEmail}
                                onValueChange={setTypeEmail}
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
                            <div>Password:</div>
                            <Input
                                isRequired
                                placeholder="Enter password"
                                variant="bordered"
                                size="lg"
                                className="flex-1"
                                isInvalid={isInvalidPassword}
                                color={isInvalidPassword ? "danger" : "success"}
                                errorMessage={`(ประกอบด้วยตัวอักษรเล็ก/ใหญ่และตัวเลขไม่น้อยกว่า 6 ตัวอักษร)`}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <div>วันที่เริ่มใช้:</div>
                            <DatePicker
                                isRequired
                                label="Date Picker"
                                variant="bordered"
                                hideTimeZone
                                defaultValue={parseAbsoluteToLocal(new Date().toISOString())}
                                value={date}
                                onChange={setDate}
                            />
                        </div>
                        <div className="flex justify-center">
                            <Button className="text-white bg-[#38A169]" size="lg" type="submit">
                                ยืนยันการร้องขอ
                            </Button>
                        </div>
                    </form>
                </Card>
                <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} placement="center">
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">ข้อกำหนดหน้าที่ความรับผิดชอบของผู้ใช้งาน <br />(User Responsibilities)</ModalHeader>
                                <ModalBody>
                                    <p>
                                        1. การใช้งานรหัสผ่าน
                                        <br />
                                        ต้องป้องกัน ดูแล รักษาข้อมูลบัญชีผู้ใช้งาน (Username) และรหัสผ่าน (Password)
                                        โดยมีบัญชีชื่อผู้ใช้งานของตนเอง และห้ามใช้ร่วมกับผู้อื่น รวมทั้ง ห้ามเผยแพร่แจกจ่าย หรือ
                                        ให้ผู้อื่นล่วงรู้รหัสผ่าน
                                    </p>
                                    <p>
                                        2. ต้องกำหนดรหัสผ่านให้ประกอบด้วยตัวอักษรเล็ก/ใหญ่ และตัวเลขไม่น้อยกว่า 6 ตัวอักษร
                                    </p>
                                    <p>
                                        3. ไม่จดหรือบันทึกรหัสผ่านไว้ในสถานที่ ที่ง่ายต่อการสังเกตุเห็นของบุคคลอื่น
                                    </p>
                                    <p>
                                        4. การกระทำใด ๆ ที่เกิดจากการใช้บัญชีผู้ใช้งานของตนเอง ที่มีกฎหมายกำหนด
                                        ให้เป็นความผิด ไม่ว่าการกระทำนั้นจะเกิดจากตนเองหรือไม่ก็ตาม ให้ถือว่าเป็นความรับผิดชอบ
                                        ของเจ้าบองบัญชี ผู้ใช้งานจะต้องรับผิดชอบต่อความผิดที่่เกิดขึ้น
                                    </p>
                                    <p>
                                        5. หากมีข้อสงสัย ต้องการเปลี่ยนรหัสผ่าน หรือต้องการคำปรึกษา ติดต่อเจ้าหน้าที่ไอที เบอร์
                                    </p>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        ไม่ยอมรับ
                                    </Button>
                                    <Button color="primary" onPress={() => handleConfirmSave(onClose)}>
                                        ยอมรับ
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </main>
        </>
    )
}
