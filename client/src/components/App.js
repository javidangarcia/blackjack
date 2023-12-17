import PlayerHand from "./PlayerHand";
import { VStack } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import DealerHand from "./DealerHand";
import PlayerOptions from "./PlayerOptions";
import { createDeck, shuffle } from "../utils";

function App() {
    const [playerHand, setPlayerHand] = useState([]);
    const [dealerHand, setDealerHand] = useState([]);
    const [deck, setDeck] = useState([]);
    const [isDealersTurn, setDealersTurn] = useState(false);

    useEffect(() => {
        const startingDeck = createDeck();
        shuffle(startingDeck);

        const startingPlayerHand = [...playerHand];
        const startingDealerHand = [...dealerHand];

        startingPlayerHand.push(startingDeck.pop());
        startingDealerHand.push(startingDeck.pop());
        startingPlayerHand.push(startingDeck.pop());
        startingDealerHand.push(startingDeck.pop());

        setPlayerHand(startingPlayerHand);
        setDealerHand(startingDealerHand);
        setDeck(startingDeck);
    }, []);

    const onPlayerHit = () => {
        setPlayerHand([...playerHand, deck.pop()]);
    };

    const onPlayerStand = () => {
        setDealersTurn(true);
    };

    return (
        <VStack spacing={4}>
            <Text fontSize="5xl">Blackjack</Text>
            <DealerHand dealerHand={dealerHand} isDealersTurn={isDealersTurn} />
            <PlayerHand playerHand={playerHand} />
            {!isDealersTurn ? (
                <PlayerOptions
                    onPlayerHit={onPlayerHit}
                    onPlayerStand={onPlayerStand}
                />
            ) : null}
        </VStack>
    );
}

export default App;
