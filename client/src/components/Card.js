import { Box } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";

export default function Card({ rank, suit }) {
    return (
        <Box boxSize="sm">
            <Image
                src={`/assets/${rank}-${suit.charAt(0)}.png`}
                alt={`${rank} of ${suit}`}
                objectFit="contain"
            />
        </Box>
    );
}
