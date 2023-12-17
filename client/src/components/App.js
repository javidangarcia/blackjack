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
    const [playerValue, setPlayerValue] = useState(0);
    const [dealerValue, setDealerValue] = useState(0);

    useEffect(() => {
        const startingDeck = createDeck();
        shuffle(startingDeck);

        const startingPlayerHand = [...playerHand];
        const startingDealerHand = [...dealerHand];

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
    }, []);

    const onPlayerHit = () => {
        const card = deck.pop();
        setPlayerHand([...playerHand, card]);

        setPlayerValue((prevPlayerValue) => prevPlayerValue + card.value);

        if (playerValue + card.value > 21) {
            alert("Player busted.");
        }
    };

    const onPlayerStand = async () => {
        setDealersTurn(true);

        let updatedDealerValue = dealerValue + dealerHand[1].value;
        setDealerValue(updatedDealerValue);

        const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

        while (updatedDealerValue < 17) {
            await sleep(1000);
            const card = deck.pop();
            updatedDealerValue += card.value;
            setDealerValue(updatedDealerValue);
            setDealerHand((prevDealerHand) => [...prevDealerHand, card]);
        }

        if (updatedDealerValue > 21) {
            alert("Dealer busted.");
        }
    };

    useEffect(() => {}, dealerHand);

    return (
        <VStack spacing={4}>
            <Text fontSize="5xl">Blackjack</Text>
            <DealerHand
                dealerHand={dealerHand}
                isDealersTurn={isDealersTurn}
                dealerValue={dealerValue}
            />
            <PlayerHand playerHand={playerHand} playerValue={playerValue} />
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
