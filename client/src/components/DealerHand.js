import Card from "./Card";
import { HStack } from "@chakra-ui/react";

export default function DealerHand({ dealerHand, isDealersTurn }) {
    return (
        <HStack width="fit-content" height="fit-content" gap="5">
            {dealerHand.map((card, index) => {
                if (!isDealersTurn && index === 1)
                    return (
                        <Card
                            rank={card.rank}
                            suit={card.suit}
                            isHidden={true}
                            key={`${card.rank}-${card.suit}`}
                        />
                    );
                else
                    return (
                        <Card
                            rank={card.rank}
                            suit={card.suit}
                            key={`${card.rank}-${card.suit}`}
                        />
                    );
            })}
        </HStack>
    );
}
