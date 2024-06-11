import { Button, Card, CardBody, Tooltip } from "@nextui-org/react";
import { useRef, useState } from "react";
import { Image } from "@nextui-org/react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

export default function Signature({ oldLicense }: { oldLicense: any }) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [newLicense, setNewLicense] = useState<any>(null);
    const toast = useToast();

    const handleLicenseClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleSubmit = (status: number) => {
        if (status == 1) {
            const data = new FormData();
            data.append("license", newLicense);

            axios.patch('/api/profile/license', data)
                .then(response => {
                    if (response.data.status === "success") {
                        toast({
                            title: 'Success',
                            description: "User has been saved.",
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
            setNewLicense(null);
        }
    }

    return (
        <Card className="p-4 sm:p-8 sm:rounded-lg w-75">
            <CardBody className="gap-5">
                <h2 className="text-lg font-medium text-foreground">
                    Signature
                </h2>
                <Tooltip showArrow={true} content="คลิกที่รูปเพื่อเปลี่ยนลายเซ็น" color="foreground">
                    <div className="flex flex-col justify-center mx-auto">
                        <Image
                            width={200}
                            height={200}
                            src={oldLicense}
                            fallbackSrc="https://via.placeholder.com/200x200"
                            alt="NextUI Image with fallback"
                            className="cursor-pointer"
                            onClick={handleLicenseClick}
                        />
                        <input
                            className="hidden"
                            type="file"
                            name="file-input"
                            id="file-input"
                            ref={fileInputRef}
                            onChange={({ target }) => {
                                if (target.files) {
                                    const file = target.files[0];
                                    setNewLicense(file);
                                }
                            }}
                        />
                        {newLicense != null ?
                            <>
                                <div className="mx-auto my-3">{newLicense?.name}</div>
                                <div className="flex flex-row mx-auto gap-2">
                                    <Button color="success" variant="flat" onClick={() => handleSubmit(1)}>Save</Button>
                                    <Button color="danger" variant="flat" onClick={() => handleSubmit(2)}>Cancel</Button>
                                </div>
                            </>
                            : ""}
                    </div>
                </Tooltip>
            </CardBody>
        </Card>
    )
}