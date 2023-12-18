import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function Alert({ outcome }) {
    const [showAlert, setShowAlert] = useState(false);
    const [alert, setAlert] = useState({});

    useEffect(() => {
        if (outcome === null) return;

        if (outcome === "win") {
            setAlert({
                heading: "You win!",
                desc: "Congratulations! You defeated the dealer.",
            });
        }

        if (outcome === "lose") {
            setAlert({
                heading: "You lose!",
                desc: "Better luck next time! The dealer wins.",
            });
        }

        if (outcome === "tie") {
            setAlert({
                heading: "Draw!",
                desc: "The game ends in a draw! No one wins or loses this round.",
            });
        }

        setShowAlert(true);
    }, [outcome]);

    return (
        <Modal
            isOpen={showAlert}
            onClose={() => setShowAlert(false)}
            isCentered
            bg="red"
        >
            <ModalOverlay />
            <ModalContent textAlign="center" p="10">
                <ModalHeader p="0">{alert.heading}</ModalHeader>
                <ModalCloseButton />
                <ModalBody p="0">{alert.desc}</ModalBody>
            </ModalContent>
        </Modal>
    );
}
