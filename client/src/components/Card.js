import { Box } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";

export default function Card({ rank, suit, isHidden = false }) {
    return (
        <Box width="fit-content" height="fit-content">
            <Image
                src={
                    isHidden
                        ? "/assets/BACK.png"
                        : `/assets/${rank}-${suit.charAt(0)}.png`
                }
                alt={`${rank} of ${suit}`}
                objectFit="contain"
                w="250"
                h="250"
            />
        </Box>
    );
}
