import { CardInterface } from "../../interfaces/CardInterface/CardInterface";

export class Card implements CardInterface {
  private suit: string;
  private rank: string;

  constructor(suit: string, rank: string) {
    this.suit = suit;
    this.rank = rank;
  }

  public print(): void {
    console.log("This suit : " + this.suit);
    console.log("This rank : " + this.rank);
    console.log("This card rank  : " + this.cardRankNumber);
  }

  public get cardSuit(): string {
    return this.suit;
  }

  public get cardRank(): string {
    return this.rank;
  }

  public get cardRankNumber(): number {
    switch (this.rank) {
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
        return Number(this.rank);
    }
  }

  // 以下特定のゲームのカードのランクを返す

  public get cardRankNumberBlackjack(): number {
    switch (this.rank) {
      case "A":
        return 1;
      case "J":
      case "Q":
      case "K":
        return 10;
      default:
        return Number(this.rank);
    }
  }
}
