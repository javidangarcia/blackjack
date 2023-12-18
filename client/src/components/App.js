import PlayerHand from "./PlayerHand";
import { VStack, Button } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import DealerHand from "./DealerHand";
import PlayerOptions from "./PlayerOptions";
import { createDeck, shuffle } from "../utils";
import Alert from "./Alert";

function App() {
    const [playerHand, setPlayerHand] = useState([]);
    const [dealerHand, setDealerHand] = useState([]);
    const [deck, setDeck] = useState([]);
    const [dealersTurn, setDealersTurn] = useState(false);
    const [playerValue, setPlayerValue] = useState(0);
    const [dealerValue, setDealerValue] = useState(0);
    const [outcome, setOutcome] = useState(null);
    const [resetGame, setResetGame] = useState(false);

    useEffect(() => {
        const startingDeck = createDeck();
        shuffle(startingDeck);

        const startingPlayerHand = [];
        const startingDealerHand = [];

        startingPlayerHand.push(startingDeck.pop());
        startingDealerHand.push(startingDeck.pop());
        startingPlayerHand.push(startingDeck.pop());
        startingDealerHand.push(startingDeck.pop());

        let startingPlayerValue = 0;
        startingPlayerHand.forEach((card) => {
            startingPlayerValue += card.value;
        });

        setPlayerHand(startingPlayerHand);
        setDealerHand(startingDealerHand);
        setDeck(startingDeck);
        setPlayerValue(startingPlayerValue);
        setDealerValue(startingDealerHand[0].value);
        setDealersTurn(false);
        setOutcome(null);
        setResetGame(false);
    }, [resetGame]);

    const onPlayerHit = async () => {
        const card = deck.pop();
        setPlayerHand([...playerHand, card]);

        setPlayerValue((prevPlayerValue) => prevPlayerValue + card.value);

        if (playerValue + card.value > 21) {
            setOutcome("lose");
        }
    };

    const onPlayerStand = async () => {
        setDealersTurn(true);

        let finalDealerValue = dealerValue + dealerHand[1].value;
        setDealerValue(finalDealerValue);

        const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

        while (finalDealerValue < 17) {
            await sleep(1000);
            const card = deck.pop();
            finalDealerValue += card.value;
            setDealerValue(finalDealerValue);
            setDealerHand((prevDealerHand) => [...prevDealerHand, card]);
        }

        await sleep(1000);

        if (finalDealerValue > 21 || finalDealerValue < playerValue) {
            setOutcome("win");
        } else if (finalDealerValue === playerValue) {
            setOutcome("tie");
        } else {
            setOutcome("lose");
        }
    };

    return (
        <VStack spacing={4}>
            <Text fontSize="5xl">Blackjack</Text>
            <DealerHand
                dealerHand={dealerHand}
                dealersTurn={dealersTurn}
                dealerValue={dealerValue}
            />
            <PlayerHand playerHand={playerHand} playerValue={playerValue} />
            {!dealersTurn && outcome === null ? (
                <PlayerOptions
                    onPlayerHit={onPlayerHit}
                    onPlayerStand={onPlayerStand}
                />
            ) : null}
            {outcome && (
                <Button colorScheme="green" onClick={() => setResetGame(true)}>
                    Play Again
                </Button>
            )}
            <Alert outcome={outcome} />
        </VStack>
    );
}

export default App;
