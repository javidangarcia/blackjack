import Hand from "./Hand";
import { VStack } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { ranks, suits } from "../utils";

function App() {
  const [hand, setHand] = useState([]);

  useEffect(() => {
    const starterHand = [
      {
        rank: ranks[Math.floor(Math.random() * ranks.length)],
        suit: suits[[Math.floor(Math.random() * suits.length)]],
      },
      {
        rank: ranks[Math.floor(Math.random() * ranks.length)],
        suit: suits[[Math.floor(Math.random() * suits.length)]],
      },
    ];

    setHand(starterHand);
  }, []);

  return (
    <VStack>
      <Text fontSize="5xl">Blackjack</Text>
      <Hand hand={hand} />
    </VStack>
  );
}

export default App;
