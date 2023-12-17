import Card from "./Card";
import { HStack } from "@chakra-ui/react";

export default function DealerHand({ blackjack }) {
    return (
        <HStack boxSize="sm">
            {blackjack.dealerHand.map((card, index) => {
                if (index === 1 && blackjack.dealerHand.length <= 2)
                    return (
                        <Card
                            rank={card.rank}
                            suit={card.suit}
                            isHidden={true}
                        />
                    );
                else return <Card rank={card.rank} suit={card.suit} />;
            })}
        </HStack>
    );
}
