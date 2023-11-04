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
    return { suit: this.suit, rank: this.rank };
  }

  getCardRankNumber() {
    // jokerは仮の0
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
    console.log("記号 : " + this.suit);
    console.log("ランク : " + this.rank);
    console.log("ランクの数字 : " + this.getCardRankNumber());
    console.log(
      "ブラックジャックでのランクの数字 : " + this.getCardRankNumberBlackjack()
    );
  }
}
