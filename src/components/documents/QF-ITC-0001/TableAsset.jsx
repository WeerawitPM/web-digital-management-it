import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Chip,
} from "@nextui-org/react";

const columns = [
    { key: "id", label: "#", },
    { key: "asset", label: "ASSET", },
    { key: "purpose", label: "PURPOSE OF USAGE", },
    { key: "device", label: "DEVICE SPECIFICATION", },
    { key: "qty", label: "QTY", },
    { key: "price", label: "PRICE", },
    { key: "action", label: "ACTION", },
];

export default function TableAsset({ data, totalPrice, trackStatus, ModalView, ModalEdit, fetchData }) {
    return (
        <>
            <Table aria-label="table asset">
                <TableHeader columns={columns}>
                    {(column) => <TableColumn key={column.key} className="text-sm">{column.label}</TableColumn>}
                </TableHeader>
                <TableBody items={data.Equipment} emptyContent={"No rows to display."}>
                    {data?.Table_ITC_0001?.map((item, index) => (
                        <TableRow key={item.id}>
                            <TableCell className="text-base">
                                {index + 1}
                            </TableCell>
                            <TableCell className="text-base">
                                {item.asset.name}
                            </TableCell>
                            <TableCell className="text-base">
                                {item.purpose.length > 40 ?
                                    `${item.purpose.substring(0, 40)}...` : item.purpose
                                }
                            </TableCell>
                            <TableCell className="text-base">
                                {item.spec_detail.length > 40 ?
                                    `${item.spec_detail.substring(0, 40)}...` : item.spec_detail
                                }
                            </TableCell>
                            <TableCell className="text-base">
                                {item.qty}
                            </TableCell>
                            <TableCell className="text-base">
                                {item.price}
                            </TableCell>
                            <TableCell>
                                <ModalView
                                    id={item.id}
                                    asset={item.asset.name}
                                    purpose={item.purpose}
                                    spec_detail={item.spec_detail}
                                    qty={item.qty}
                                    price={item.price}
                                    ref_quotation={item.Table_Ref_Quotation}
                                />
                                {data?.step == 1 && trackStatus == 0?
                                    <ModalEdit
                                        id={item.id}
                                        price={item.price}
                                        ref_quotation={item.Table_Ref_Quotation}
                                        fetchData={fetchData}
                                    />
                                    : ""
                                }
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="text-center">
                <Chip color="success" size="lg" variant="flat">
                    <div className="font-medium">Total Price: {totalPrice}</div>
                </Chip>
            </div>
            {data.Track_Doc
                .filter(index => index?.remark && index.remark !== "null" && index.remark.trim() !== "")
                .map((index) => (
                    <div key={index.step} className="text-center">
                        <Chip color="danger" size="lg" variant="flat">
                            Remark : {index.remark}
                        </Chip>
                    </div>
                ))}
        </>
    )
}