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
    const [loading, setLoading] = useState(false);

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

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const onPlayerHit = async () => {
        setLoading(true);

        await sleep(500);

        const card = deck.pop();
        setPlayerHand((prevPlayerHand) => [...prevPlayerHand, card]);

        let newPlayerValue;

        setPlayerValue((prevPlayerValue) => {
            newPlayerValue = prevPlayerValue + card.value;

            const playerHasAce = playerHand.some(
                (card) => card.rank === "A" && card.value === 11
            );

            if (newPlayerValue > 21 && (card.rank === "A" || playerHasAce)) {
                newPlayerValue -= 10;
                setPlayerHand((prevPlayerHand) =>
                    prevPlayerHand.map((prevCard) =>
                        prevCard.rank === "A" && prevCard.value === 11
                            ? { ...prevCard, value: 1 }
                            : prevCard
                    )
                );
            }

            return newPlayerValue;
        });

        await sleep(100);

        console.log(newPlayerValue);

        if (newPlayerValue > 21) {
            setOutcome("lose");
        }

        setLoading(false);
    };

    const onPlayerStand = async () => {
        setDealersTurn(true);

        let finalDealerValue = dealerValue + dealerHand[1].value;
        setDealerValue(finalDealerValue);

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
                    loading={loading}
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
