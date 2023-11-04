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
    if (this.gameType === "blackjack") {
      this.joker = false;
    } else {
      this.cards.push(new Card("Joker", "Joker"));
    }
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  setDeck() {
    for (const suit of this.suits) {
      for (const rank of this.ranks) {
        this.cards.push(new Card(suit, rank));
      }
    }

    this.setJokerToDeck();
    this.shuffle();
  }

  // ゲームの種類を変更せずに、遊び続ける場合用
  resetDeck() {
    this.cards = [];
    this.setDeck();
  }

  drawOne() {
    // 仮の戻り値undefined
    if (this.cards.length <= 0) return undefined;

    return this.cards.pop();
  }

  getDeckLength() {
    return this.cards.length;
  }

  isDeckEmpty() {
    return this.cards.length <= 0;
  }

  print() {
    console.log("\n");
    console.log("ゲームの種類 : " + this.gameType);
    console.log("カード一覧 : ");
    this.cards.forEach((card) => console.log(card.print()));
    console.log("\n");
    console.log("記号一覧 : " + this.suits);
    console.log("ランク一覧  : " + this.ranks);
    console.log("ジョーカーを含むか  : " + this.joker);
  }
}
