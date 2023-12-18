import { Button, HStack } from "@chakra-ui/react";
import { useState } from "react";

export default function PlayerOptions({ onPlayerHit, onPlayerStand, loading }) {
    return (
        <HStack mb="5">
            <Button
                colorScheme="red"
                flex="1"
                onClick={onPlayerHit}
                isLoading={loading}
            >
                Hit
            </Button>
            <Button
                colorScheme="messenger"
                flex="1"
                onClick={onPlayerStand}
                isLoading={loading}
            >
                Stand
            </Button>
        </HStack>
    );
}
