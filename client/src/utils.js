export const ranks = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
];

export const suits = ["Clubs", "Diamonds", "Hearts", "Spades"];

export const createDeck = () => {
    const deck = [];
    suits.forEach((suit) => {
        ranks.forEach((rank) => {
            deck.push({ rank, suit });
        });
    });
    return deck;
};

export const shuffle = (deck) => {
    for (let i = 0; i < 1000; i++) {
        let location1 = Math.floor(Math.random() * deck.length);
        let location2 = Math.floor(Math.random() * deck.length);
        let temp = deck[location1];
        deck[location1] = deck[location2];
        deck[location2] = temp;
    }
};
