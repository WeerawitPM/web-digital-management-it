import React from "react"
import {
    Button,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogCloseButton,
    useDisclosure
} from "@chakra-ui/react"
import { Button as NextButton, Tooltip } from "@nextui-org/react"
import { DeleteIcon } from "../../components/DeleteIcon";
import { deleteRepair } from "@/lib/repairSlice";
import { useDispatch } from 'react-redux'

export default function DeleteRequestItem({ id }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const dispatch = useDispatch();

    const deleteItem = () => {
        dispatch(
            deleteRepair({
                id: id
            })
        );
        onClose()
    };

    return (
        <>
            <Tooltip color="danger" content="Delete asset">
                <NextButton isIconOnly color="danger" variant="light" onClick={onOpen} className=" w-10">
                    <DeleteIcon className="text-lg" />
                </NextButton>
            </Tooltip>
            <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
            >
                <AlertDialogOverlay />

                <AlertDialogContent>
                    <AlertDialogHeader>Are you sure delete the item?</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        This operation cannot be reversed.
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose} colorScheme='red'>
                            No
                        </Button>
                        <Button colorScheme='green' ml={3} onClick={() => deleteItem()}>
                            Yes
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}