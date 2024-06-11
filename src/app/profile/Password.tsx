import { useToast } from "@chakra-ui/react";
import { Button, Card, CardBody, Divider, Input, Select, SelectItem } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Password() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const toast = useToast();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (newPassword === confirmPassword) {
            // สร้างข้อมูลที่จะส่งไปยัง API
            const data = new FormData();
            data.append("oldPassword", oldPassword);
            data.append("newPassword", newPassword);

            axios.patch('/api/profile/password', data)
                .then(response => {
                    if (response.data.status === "success") {
                        toast({
                            title: 'Success',
                            description: response.data.message,
                            status: 'success',
                            duration: 3000,
                            isClosable: true,
                        })
                        setInterval(() => location.reload(), 3000);
                    } else {
                        toast({
                            title: 'Error',
                            description: response.data.message,
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
                        description: error,
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                    })
                })
        } else {
            toast({
                title: 'Alert',
                description: "Password not matched",
                status: 'warning',
                duration: 3000,
                isClosable: true,
            })
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Card className="p-4 sm:p-8 sm:rounded-lg">
                <CardBody className="gap-5">
                    <h2 className="text-lg font-medium text-foreground">
                        Reset Password
                    </h2>
                    <div className="flex flex-col gap-5">
                        <Input
                            isRequired type="password" label="Old password" variant="bordered" labelPlacement="outside"
                            placeholder="Enter old password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}
                        />
                        <Input
                            isRequired type="password" label="New password" variant="bordered" labelPlacement="outside"
                            placeholder="Enter new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <Input
                            isRequired type="password" label="Confirm password" variant="bordered" labelPlacement="outside"
                            placeholder="Confirm new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <Divider />
                    <Button type="submit" color="success" className="w-[30%] mx-auto" size="lg" variant="flat">Reset Password</Button>
                </CardBody>
            </Card>
        </form>
    )
}