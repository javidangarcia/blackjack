import { ranks, suits } from "./utils";

const SHUFFLES = 1000;

export class Blackjack {
    constructor() {
        this.deck = new Deck();
        this.deck.shuffle();
        this.playerHand = [];
    }

    startGame() {
        this.playerHand.push(this.deck.dealCard());
        this.playerHand.push(this.deck.dealCard());
    }
}

class Deck {
    constructor() {
        this.cards = [];
        suits.forEach((suit) => {
            ranks.forEach((rank) => {
                this.cards.push(new Card(rank, suit));
            });
        });
    }

    shuffle() {
        for (let i = 0; i < SHUFFLES; i++) {
            let location1 = Math.floor(Math.random() * this.cards.length);
            let location2 = Math.floor(Math.random() * this.cards.length);
            let temp = this.cards[location1];
            this.cards[location1] = this.cards[location2];
            this.cards[location2] = temp;
        }
    }

    dealCard() {
        return this.cards.pop();
    }
}

class Card {
    constructor(rank, suit) {
        this.rank = rank;
        this.suit = suit;
    }
}
