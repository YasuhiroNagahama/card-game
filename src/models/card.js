export class Card {
  constructor(suit, rank) {
    this.suit = suit;
    this.rank = rank;
  }

  getCardSuit() {
    return this.suit;
  }

  getCardRank() {
    return this.rank;
  }

  getCardInfoObj() {
    return {suit: this.suit, rank: this.rank};
  }

  getCardRankNumber() {
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

  getCardRankNumberBlackjack() {
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

  print() {
    console.log("\n");
    console.log("This suit : " + this.suit);
    console.log("This rank : " + this.rank);
    console.log("This card rank number : " + this.getCardRankNumber());
  }
}
