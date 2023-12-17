import PlayerHand from "./PlayerHand";
import { VStack } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Blackjack } from "../blackjack";

function App() {
    const [blackjack, setBlackjack] = useState(null);

    useEffect(() => {
        const newBlackjack = new Blackjack();
        newBlackjack.startGame();
        setBlackjack(newBlackjack);
    }, []);

    return blackjack ? (
        <VStack>
            <Text fontSize="5xl">Blackjack</Text>
            <PlayerHand blackjack={blackjack} />
        </VStack>
    ) : null;
}

export default App;
