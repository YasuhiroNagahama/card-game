import { Card } from "../Card/Card";

export class Deck {
  private cards: Card[];
  private joker: boolean;
  private suits: string[];
  private ranks: string[];
  private gameType: string;

  constructor(gameType: string) {
    this.gameType = gameType;

    this.initialize();
  }

  public print(): void {
    console.log(this.cards);
  }

  public initialize(): void {
    this.cards = [];
    this.joker = true;
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

    this.setDeck();
  }

  public setDeck(): void {
    for (let suit of this.suits) {
      for (let rank of this.ranks) {
        this.cards.push(new Card(suit, rank));
      }
    }

    if (this.gameType == "blackjack") {
      this.joker = false;
    } else {
      this.cards.push(new Card("Joker", "Joker"));
    }

    this.shuffle();
  }

  public shuffle(): void {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  public resetDeck(): void {
    this.cards = [];
    this.setDeck();
  }

  public drawOne(): Card | undefined {
    if (this.cards.length <= 0) return undefined;

    return this.cards.pop();
  }

  public getRemainingCards(): number {
    return this.cards.length;
  }

  public get isEmpty(): boolean {
    return this.cards.length <= 0;
  }
}
