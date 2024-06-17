import { Card, CardBody, Chip } from "@nextui-org/react";

export default function ProfileInformation({ data }: any) {
    return (
        <Card className="p-4 sm:p-8 sm:rounded-lg w-75 mt-5">
            <CardBody>
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
                                    Name:{""}
                                    <Chip color="primary" variant="flat">
                                        {`${data.Table_ITC_0007[0].request_by.firstname} ${data.Table_ITC_0007[0].request_by.lastname}`}
                                    </Chip>
                                </div>
                                <div>
                                    Emp ID.:
                                    <Chip color="primary" variant="flat">
                                        {data.Table_ITC_0007[0].request_by.emp_id}
                                    </Chip>

                                </div>
                            </div>
                        </div>
                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4 pt-4">
                            <div className="flex justify-start items-start space-x-4 flex-wrap">
                                <div>
                                    Company:
                                    <Chip color="primary" variant="flat">
                                        {data.Table_ITC_0007[0].request_by.company.name}
                                    </Chip>
                                </div>
                                <div>
                                    Position:
                                    <Chip color="primary" variant="flat">
                                        {data.Table_ITC_0007[0].request_by.position.name}
                                    </Chip>
                                </div>
                                <div>
                                    Department/Section:{" "}
                                    <Chip color="primary" variant="flat">
                                        {data.Table_ITC_0007[0].request_by.department.name}
                                    </Chip>
                                </div>
                                <div>
                                    Telephone/Mobile No.:{" "}
                                    <Chip color="primary" variant="flat">
                                        {data.Table_ITC_0007[0].request_by.tel}
                                    </Chip>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </CardBody>
        </Card>
    )
}