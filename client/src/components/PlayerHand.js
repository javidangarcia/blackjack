import Card from "./Card";
import { HStack } from "@chakra-ui/react";

export default function PlayerHand({ blackjack }) {
    return (
        <HStack boxSize="sm">
            {blackjack.playerHand.map((card) => (
                <Card rank={card.rank} suit={card.suit} />
            ))}
        </HStack>
    );
}
