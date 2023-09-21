import { Card } from "./card.js";

export class Deck {
  constructor(gameType) {
    this.gameType = gameType;
    this.suits = ["&#9825;", "&#9828;", "&#9674;", "&#9831;"];
    this.ranks = [
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

    this.initialize();
  }

  initialize() {
    this.cards = [];
    this.joker = true;

    this.setDeck();
  }

  setJokerToDeck() {
    // 条件が後に増える
    if (this.gameType === "blackjack") {
      this.joker = false;
    } else {
      this.cards.push(new Card("Joker", "Joker"));
    }
  }

  setDeck() {
    for (let suit of this.suits) {
      for (let rank of this.ranks) {
        this.cards.push(new Card(suit, rank));
      }
    }

    this.setJokerToDeck();
    this.shuffle();
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  resetDeck() {
    this.cards = [];
    this.setDeck();
  }

  drawOne() {
    // 仮の戻り値undefined
    if (this.cards.length <= 0) return undefined;

    return this.cards.pop();
  }

  getCurrentDeckLength() {
    return this.cards.length;
  }

  isEmpty() {
    return this.cards.length <= 0;
  }

  print() {
    console.log("\n");
    console.log("This game type : " + this.gameType);
    console.log("This cards : ");
    this.cards.forEach((card) => console.log(card));
    console.log("This suits : " + this.suits);
    console.log("This ranks  : " + this.ranks);
    console.log("This joker  : " + this.joker);
  }
}
