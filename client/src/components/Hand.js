import Card from "./Card";
import { HStack } from "@chakra-ui/react";

export default function Hand({ hand }) {
  return (
    <HStack boxSize="sm">
      {hand.map((card) => (
        <Card rank={card.rank} suit={card.suit} />
      ))}
    </HStack>
  );
}
