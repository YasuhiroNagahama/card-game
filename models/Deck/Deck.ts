import { Card } from "../Card/Card";
import { DeckInterface } from "../../interfaces/DeckInterface/DeckInterface";

export class Deck implements DeckInterface {
  private gameType: string;
  private cards: Card[];
  private suits: string[];
  private ranks: string[];
  private joker: boolean;

  constructor(gameType: string) {
    this.gameType = gameType;
    this.suits = ["H", "D", "C", "D"];
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

  public initialize(): void {
    this.cards = [];
    this.joker = true;

    this.setDeck();
  }

  public setJokerToDeck(): void {
    // 条件が後に増える
    if (this.gameType === "blackjack") {
      this.joker = false;
    } else {
      this.cards.push(new Card("Joker", "Joker"));
    }
  }

  public setDeck(): void {
    for (let suit of this.suits) {
      for (let rank of this.ranks) {
        this.cards.push(new Card(suit, rank));
      }
    }

    this.setJokerToDeck();
    this.shuffle();
  }

  public shuffle(): void {
    for (let i: number = this.cards.length - 1; i > 0; i--) {
      const j: number = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  public resetDeck(): void {
    this.cards = [];
    this.setDeck();
  }

  public drawOne(): Card | undefined {
    // 仮の戻り値undefined
    if (this.cards.length <= 0) return undefined;

    return this.cards.pop();
  }

  public getCurrentDeckLength(): number {
    return this.cards.length;
  }

  public isEmpty(): boolean {
    return this.cards.length <= 0;
  }

  public print(): void {
    console.log("This game type : " + this.gameType);
    console.log("This cards : " + this.cards);
    console.log("This suits : " + this.suits);
    console.log("This ranks  : " + this.ranks);
    console.log("This joker  : " + this.joker);
  }
}
