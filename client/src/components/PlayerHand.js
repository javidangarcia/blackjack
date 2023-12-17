import Card from "./Card";
import { HStack } from "@chakra-ui/react";

export default function PlayerHand({ playerHand }) {
    return (
        <HStack width="fit-content" height="fit-content" gap="5">
            {playerHand.map((card) => (
                <Card
                    rank={card.rank}
                    suit={card.suit}
                    key={`${card.rank}-${card.suit}`}
                />
            ))}
        </HStack>
    );
}
