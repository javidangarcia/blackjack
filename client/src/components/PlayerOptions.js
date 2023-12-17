import { Button, HStack } from "@chakra-ui/react";

export default function PlayerOptions({ onPlayerHit, onPlayerStand }) {
    return (
        <HStack mb="5">
            <Button colorScheme="red" flex="1" onClick={onPlayerHit}>
                Hit
            </Button>
            <Button colorScheme="blue" flex="1" onClick={onPlayerStand}>
                Stand
            </Button>
        </HStack>
    );
}
