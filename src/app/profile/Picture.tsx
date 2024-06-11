import React, { useRef, useState } from "react";
import { Avatar, Button, Tooltip } from "@nextui-org/react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

export default function Picture({ image }: { image: any }) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [newImage, setNewImage] = useState<any>(null);
    const toast = useToast();

    const handleAvatarClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleSubmit = (status: number) => {
        if (status == 1) {
            const data = new FormData();
            data.append("image", newImage);

            axios.patch('/api/profile/image', data, {
                // headers: {
                //     'Content-Type': 'application/json',
                // }
            })
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
            setNewImage(null);
        }
    }

    return (
        <div className="flex flex-col">
            <Tooltip showArrow={true} content="คลิกที่รูปเพื่อเปลี่ยนรูปโปรไฟล์" color="foreground">
                <Avatar
                    isBordered
                    color="secondary"
                    size={undefined}
                    src={image}
                    className="h-40 w-40 cursor-pointer mx-auto"
                    onClick={handleAvatarClick}
                />
            </Tooltip>
            <input
                className="hidden"
                type="file"
                name="file-input"
                id="file-input"
                ref={fileInputRef}
                onChange={({ target }) => {
                    if (target.files) {
                        const file = target.files[0];
                        setNewImage(file);
                    }
                }}
            />
            {newImage != null ?
                <>
                    <div className="mx-auto my-3">{newImage?.name}</div>
                    <div className="flex flex-row mx-auto gap-2">
                        <Button color="success" variant="flat" onClick={() => handleSubmit(1)}>Save</Button>
                        <Button color="danger" variant="flat" onClick={() => handleSubmit(2)}>Cancel</Button>
                    </div>
                </>
                : ""}
        </div>
    );
}