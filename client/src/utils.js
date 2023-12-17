export const ranks = {
    A: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    J: 10,
    Q: 10,
    K: 10,
};

export const suits = ["Clubs", "Diamonds", "Hearts", "Spades"];

export const createDeck = () => {
    const deck = [];
    suits.forEach((suit) => {
        Object.keys(ranks).forEach((rank) => {
            deck.push({ rank, suit, value: ranks[rank] });
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
