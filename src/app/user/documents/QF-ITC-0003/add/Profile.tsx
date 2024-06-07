import { Card, Chip } from "@nextui-org/react";

export default function Profile({ data }: { data: any }) {
    return (
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
    )
}