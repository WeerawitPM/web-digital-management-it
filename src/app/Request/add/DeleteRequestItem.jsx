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
import { Button as NextButton } from "@nextui-org/react"
import { DeleteIcon } from "../../components/DeleteIcon";
import { deleteEquipment } from "@/lib/equipmentSlice";
import { useDispatch } from 'react-redux'

export default function DeleteRequestItem({ id }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const dispatch = useDispatch();

    const deleteItem = () => {
        dispatch(
            deleteEquipment({
                id: id
            })
        );
        onClose()
    };

    return (
        <>
            <NextButton isIconOnly color="danger" variant="light" onClick={onOpen} className=" w-10">
                <DeleteIcon className="text-lg" />
            </NextButton>
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