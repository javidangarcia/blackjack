import Card from "./Card";
import { HStack, Text, Box } from "@chakra-ui/react";

export default function DealerHand({ dealerHand, dealersTurn, dealerValue }) {
    return (
        <HStack width="100%" justifyContent="space-evenly">
            <Box
                borderRadius="full"
                bg="green"
                p="5"
                w="80px"
                h="80px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                visibility="hidden"
            >
                <Text color="white" fontSize="4xl">
                    {dealerValue}
                </Text>
            </Box>
            <HStack gap="5">
                {dealerHand.map((card, index) => {
                    if (!dealersTurn && index === 1)
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
            <Box
                borderRadius="full"
                bg="green"
                p="5"
                w="80px"
                h="80px"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Text color="white" fontSize="4xl" fontWeight="bold">
                    {dealerValue}
                </Text>
            </Box>
        </HStack>
    );
}
