import React, { useRef } from "react"
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

export default function SaveRepairItem() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef() as any

    return (
        <>
            <Button colorScheme="green" className="text-white" onClick={onOpen}>ยืนยันการร้องขอ</Button>
            <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
            >
                <AlertDialogOverlay />

                <AlertDialogContent>
                    <AlertDialogHeader>Discard Changes?</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        Are you sure you want to discard all of your notes? 44 words will be
                        deleted.
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            No
                        </Button>
                        <Button colorScheme='red' ml={3}>
                            Yes
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}