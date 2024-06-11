import { useToast } from "@chakra-ui/react";
import { Button, Card, CardBody, Divider, Input, Select, SelectItem } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Profile({ data }: { data: any }) {
    const [firstname, setFirstname] = useState(data?.firstname);
    const [lastname, setLastname] = useState("");
    const [tel, setTel] = useState("");
    const [empId, setEmpId] = useState("");
    const [company, setCompany] = useState("");
    const [department, setDepartment] = useState("");
    const [position, setPosition] = useState("");
    const [role, setRole] = useState("");
    const toast = useToast();

    useEffect(() => {
        setFirstname(data?.firstname);
        setLastname(data?.lastname);
        setTel(data?.tel);
        setEmpId(data?.emp_id);
        setCompany(data?.company?.name);
        setDepartment(data?.department?.name)
        setPosition(data?.position?.name)
        setRole(data?.role?.name)
    }, [data])

    const handleSubmit = (e: any) => {
        e.preventDefault();
        // สร้างข้อมูลที่จะส่งไปยัง API
        const data = new FormData();
        data.append("firstname", firstname);
        data.append("lastname", lastname);
        data.append("tel", tel);

        axios.patch('/api/profile', data, {
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
    }

    return (
        <form onSubmit={handleSubmit}>
            <Card className="p-4 sm:p-8 sm:rounded-lg w-75">
                <CardBody className="gap-5">
                    <h2 className="text-lg font-medium text-foreground">
                        Profile Information
                    </h2>
                    <div className="flex gap-3">
                        <Input
                            isReadOnly label="Username" variant="bordered" labelPlacement="outside"
                            placeholder="Enter username" value={data?.username}
                        />
                        <Input
                            isReadOnly type="email" label="Email" variant="bordered" labelPlacement="outside"
                            placeholder="Enter email" value={data?.email}
                        />
                    </div>
                    <Divider />
                    <div className="flex gap-3">
                        <Input
                            isRequired label="Firstname" variant="bordered" labelPlacement="outside"
                            placeholder="Enter firstname" value={firstname} onChange={(e) => setFirstname(e.target.value)}
                        />
                        <Input
                            isRequired label="Lastname" variant="bordered" labelPlacement="outside"
                            placeholder="Enter lastname" value={lastname} onChange={(e) => setLastname(e.target.value)}
                        />
                    </div>
                    <Divider />
                    <div className="flex flex-col gap-3 w-[50%]">
                        <Input
                            isRequired label="Tel." variant="bordered" labelPlacement="outside"
                            placeholder="Enter tel." value={tel} onChange={(e) => setTel(e.target.value)}
                        />
                        <Input
                            isReadOnly label="Emp ID." variant="bordered" labelPlacement="outside"
                            placeholder="Enter emp id." value={empId} onChange={(e) => setEmpId(e.target.value)}
                        />
                    </div>
                    <Divider />
                    <div className="flex gap-3">
                        <Select
                            label="Company"
                            labelPlacement="outside"
                            placeholder="Select a company"
                            defaultSelectedKeys="all"
                            className="max-w-xs"
                        >
                            <SelectItem key={0} isReadOnly>
                                {company}
                            </SelectItem>
                        </Select>
                        <Select
                            label="Department"
                            labelPlacement="outside"
                            placeholder="Select a department"
                            defaultSelectedKeys="all"
                            className="max-w-xs"
                        >
                            <SelectItem key={0} isReadOnly>
                                {department}
                            </SelectItem>
                        </Select>
                        <Select
                            label="Position"
                            labelPlacement="outside"
                            placeholder="Select a position"
                            defaultSelectedKeys="all"
                            className="max-w-xs"
                        >
                            <SelectItem key={0} isReadOnly>
                                {position}
                            </SelectItem>
                        </Select>
                        <Select
                            label="Role"
                            labelPlacement="outside"
                            placeholder="Select a role"
                            defaultSelectedKeys="all"
                            className="max-w-xs"
                        >
                            <SelectItem key={0} isReadOnly>
                                {role}
                            </SelectItem>
                        </Select>
                    </div>
                    <Button type="submit" color="success" className="w-[30%] mx-auto" size="lg" variant="flat">Save</Button>
                </CardBody>
            </Card>
        </form>
    )
}