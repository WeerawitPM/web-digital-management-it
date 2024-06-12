"use client"
import { useState } from "react";
import { Card, CardBody, Input, Select, SelectItem, Button, CardFooter } from "@nextui-org/react";
import { EyeFilledIcon } from "@/components/icon/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/components/icon/EyeSlashFilledIcon";
import { useForm } from "react-hook-form";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

export default function Component({ company, department, position }: { company: any, department: any, position: any }) {
    const [isVisible1, setIsVisible1] = useState(false);
    const toggleVisibility1 = () => setIsVisible1(!isVisible1);
    const [isVisible2, setIsVisible2] = useState(false);
    const toggleVisibility2 = () => setIsVisible2(!isVisible2);
    const { register, handleSubmit, setValue } = useForm();
    const toast = useToast();

    const handleSignup = (formData: any) => {

        if (formData.password === formData.confirmPassword) {
            // สร้างข้อมูลที่จะส่งไปยัง API
            const data = new FormData();
            data.append('email', formData.email);
            data.append('username', formData.username);
            data.append('password', formData.password);
            data.append('firstname', formData.firstname);
            data.append('lastname', formData.lastname);
            data.append('tel', formData.tel);
            data.append('role_id', "1");
            data.append('emp_id', formData.empId);
            data.append('company_id', formData.company);
            data.append('department_id', formData.department);
            data.append('position_id', formData.position);
            data.append('user_status_id', "1");

            const singup = async () => {
                try {
                    const response = await axios.post("/api/signup", data);
                    if (response.data.status === "success") {
                        toast({
                            title: 'Success',
                            description: response.data.message,
                            status: 'success',
                            duration: 3000,
                            isClosable: true,
                        })
                        setInterval(() => window.location.href = '/signin', 3000);
                    } else {
                        toast({
                            title: 'Error',
                            description: response.data.message,
                            status: 'error',
                            duration: 3000,
                            isClosable: true,
                        })
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            singup()
        } else {
            toast({
                title: 'Error',
                description: "Password not matched",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
    }

    return (
        <main className="py-12 max-w-3xl mx-auto sm:px-6 lg:px-8 space-y-6 min-h-screen">
            <div className="text-center text-2xl font-bold">SIGN UP FORM</div>
            <form onSubmit={handleSubmit(handleSignup)}>
                <Card>
                    <CardBody className="flex gap-5 my-5">
                        <div className="flex flex-row gap-3 flex-wrap mx-3">
                            <Input isRequired type="text" label="Username" variant="bordered" labelPlacement="outside" placeholder="Enter username" className="flex-1 min-w-[200px]"
                                {...register("username")}
                            />
                            <Input isRequired type="email" label="Email" variant="bordered" labelPlacement="outside" placeholder="Enter email" className="flex-1 min-w-[200px]"
                                {...register("email")}
                            />
                        </div>
                        <div className="flex flex-row gap-3 flex-wrap mx-3">
                            <Input isRequired label="Password" variant="bordered" labelPlacement="outside" placeholder="Enter password" className="flex-1 min-w-[200px]"
                                endContent={
                                    <button className="focus:outline-none" type="button" onClick={toggleVisibility1}>
                                        {isVisible1 ? (
                                            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                        ) : (
                                            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                        )}
                                    </button>
                                }
                                type={isVisible1 ? "text" : "password"}
                                {...register("password")}
                            />
                            <Input isRequired label="Confirm Password" variant="bordered" labelPlacement="outside" placeholder="Enter confirm password" className="flex-1 min-w-[200px]"
                                endContent={
                                    <button className="focus:outline-none" type="button" onClick={toggleVisibility2}>
                                        {isVisible2 ? (
                                            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                        ) : (
                                            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                        )}
                                    </button>
                                }
                                type={isVisible2 ? "text" : "password"}
                                {...register("confirmPassword")}
                            />
                        </div>
                        <div className="flex flex-row gap-3 flex-wrap mx-3">
                            <Input isRequired type="text" label="Firstname" variant="bordered" labelPlacement="outside" placeholder="Enter firstname" className="flex-1 min-w-[200px]"
                                {...register("firstname")}
                            />
                            <Input isRequired type="text" label="Lastname" variant="bordered" labelPlacement="outside" placeholder="Enter lastname" className="flex-1 min-w-[200px]"
                                {...register("lastname")}
                            />
                        </div>
                        <div className="flex flex-row gap-3 flex-wrap mx-3">
                            <Input isRequired type="text" label="Tel" variant="bordered" labelPlacement="outside" placeholder="Enter tel" className="flex-1 min-w-[200px]"
                                {...register("tel")}
                            />
                            <Input isRequired type="number" label="Emp ID" variant="bordered" labelPlacement="outside" placeholder="Enter employee id" className="flex-1 min-w-[200px]"
                                {...register("empId")}
                            />
                        </div>
                        <div className="flex flex-row flex-wrap gap-3 mx-3">
                            <Select
                                isRequired
                                label="Company"
                                labelPlacement="outside"
                                placeholder="Select a company"
                                className="flex-1 max-w-xs"
                                variant="bordered"
                                onChange={(value) => setValue("company", value.target.value)}
                            >
                                {company && company.map((item: any) => (
                                    <SelectItem key={item.id} value={item.name}>
                                        {item.name}
                                    </SelectItem>
                                ))}
                            </Select>
                            <Select
                                isRequired
                                label="Department"
                                labelPlacement="outside"
                                placeholder="Select a department"
                                className="flex-1 max-w-xs"
                                variant="bordered"
                                onChange={(value) => setValue("department", value.target.value)}
                            >
                                {department && department.map((item: any) => (
                                    <SelectItem key={item.id}>
                                        {item.name}
                                    </SelectItem>
                                ))}
                            </Select>
                            <Select
                                isRequired
                                label="Position"
                                labelPlacement="outside"
                                placeholder="Select a position"
                                className="flex-1 max-w-xs"
                                variant="bordered"
                                onChange={(value) => setValue("position", value.target.value)}
                            >
                                {position && position.map((item: any) => (
                                    <SelectItem key={item.id} value={item.id}>
                                        {item.name}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>
                        <CardFooter className="flex">
                            <Button className="flex-1 text-base" color="secondary" type="submit">Sign up</Button>
                        </CardFooter>
                    </CardBody>
                </Card>
            </form>
        </main>
    );
}