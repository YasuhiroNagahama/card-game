import { CardInterface } from "../../interfaces/CardInterface/CardInterface";

export class Card implements CardInterface {
  private suit: string;
  private rank: string;

  constructor(suit: string, rank: string) {
    this.suit = suit;
    this.rank = rank;
  }

  public getCardSuit(): string {
    return this.suit;
  }

  public getCardRank(): string {
    return this.rank;
  }

  public getCardRankNumber(): number {
    switch (this.getCardRank()) {
      case "A":
        return 1;
      case "J":
        return 11;
      case "Q":
        return 12;
      case "K":
        return 13;
      case "Joker":
        return 0;
      default:
        return Number(this.getCardRank());
    }
  }

  public getCardRankNumberBlackjack(): number {
    switch (this.getCardRank()) {
      case "A":
        return 1;
      case "J":
      case "Q":
      case "K":
        return 10;
      default:
        return Number(this.getCardRank());
    }
  }

  public print(): void {
    console.log("This suit : " + this.suit);
    console.log("This rank : " + this.rank);
    console.log("This card rank  : " + this.getCardRankNumber());
  }
}

// const card: Card = new Card("H", "J");
// console.log(card.getCardSuit());
// console.log(card.getCardRank());
// console.log(card.getCardRankNumber());
// console.log(card.getCardRankNumberBlackjack());