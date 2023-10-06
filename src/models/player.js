import { Card } from "./card.js";
import { Deck } from "./deck.js";

export class Player {
  constructor(playerName, playerType) {
    this.playerName = playerName;
    this.playerType = playerType;
    this.winAmounts = 0;
    this.status = "";
    this.hands = [];
  }

  initializePlayer() {
    this.winAmounts = 0;
    this.status = "";
  }

  getPlayerName() {
    return this.playerName;
  }

  getPlayerType() {
    return this.playerType;
  }

  getWinAmounts() {
    return this.winAmounts;
  }

  getStatus() {
    return this.status;
  }

  getHands() {
    return this.hands;
  }

  setPlayerStatus(currentStatus) {
    this.status = currentStatus;
  }

  updateWinAmounts() {
    this.winAmounts++;
  }

  addHand(card) {
    this.hands.push(card);
  }

  clearWinAmounts() {
    this.winAmounts = 0;
  }

  clearHands() {
    this.hands = [];
  }
}

export class BlackjackPlayer extends Player {
  constructor(playerName, playerType) {
    super(playerName, playerType);
    this.chips = playerType === "dealer" ? 0 : 400;
    this.bet = 0;
    this.score = 0;
    super.setPlayerStatus("betting");
  }

  initializeBlackjackPlayer() {
    const currentPlayerType = super.getCurrentPlayerType();
    this.chips = currentPlayerType === "dealer" ? 0 : 400;
    this.bet = 0;
    super.setPlayerStatus("betting");
  }

  addChips(chipsToAdd) {
    this.chips += chipsToAdd;
  }

  addBet(betToAdd) {
    this.bet = betToAdd;
  }

  initializeBet() {
    // ディーラーを考慮すべきか
    this.bet = 0;
  }

  canBet(betToAdd) {
    return betToAdd >= 0 && this.chips >= betToAdd;
  }

  removeChips(chipsToRemove) {
    this.chips -= chipsToRemove;
  }

  removeBet(betToRemove) {
    this.bet -= betToRemove;
  }

  setHit(card) {
    super.addHand(card);

    if (this.isBust()) {
      this.setBust();
    }
  }

  setStand() {
    super.setPlayerStatus("stand");
  }

  setSurrender() {
    this.removeBet(Math.floor(this.bet / 2));
    super.setPlayerStatus("surrender");
  }

  setDouble() {
    this.addBet(this.bet);
    super.setPlayerStatus("double");
  }

  setBust() {
    super.setPlayerStatus("bust");
  }

  isBust() {
    const totalScore = this.getTotalHandsScore();
    return totalScore > 21;
  }

  canDouble() {
    const currentBet = this.getCurrentBet() * 2;
    const currentChips = this.getCurrentChips();
    return currentBet * 2 < currentChips;
  }

  getCurrentChips() {
    return this.chips;
  }

  getCurrentBet() {
    return this.bet;
  }

  isBetCompleted() {
    return this.bet > 0;
  }

  isBlackjack(playerHandsArr) {
    return (
      playerHandsArr.includes("A") &&
      /(10|J|Q|K)/.test(playerHandsArr.join(" "))
    );
  }

  isPlayer() {
    const currentPlayer = this.getCurrentPlayerType();
    return currentPlayer === "player";
  }

  setTotalHandsScore() {
    const currentHands = super.getHands();
    const playerHandsArr = currentHands.map((hand) => hand.getCardRank());

    if (this.isBlackjack(playerHandsArr)) {
      // bustにするコード
      this.score = 21;
    } else {
      const totalScore = currentHands
        .map((hand) => hand.getCardRankNumberBlackjack())
        .reduce((sum, element) => sum + element, 0);

      this.score = totalScore;
    }
  }

  getTotalHandsScore() {
    return this.score;
  }

  print() {
    const hands = this.getHands();
    console.log("\n");
    console.log("This player name : " + this.getCurrentPlayerName());
    console.log("This player type : " + this.getCurrentPlayerType());
    console.log("This player win amounts : " + this.getCurrentWinAmounts());
    console.log("This player status : " + this.getCurrentStatus());
    console.log("This player hands");
    hands.forEach((hand) => {
      console.log(hand);
    });
    console.log("This player chips : " + this.getCurrentChips());
    console.log("This player bet : " + this.getCurrentBet());
    console.log("This player total score : " + this.getTotalHandsScore());
    console.log("This player is blackjack : " + this.isBlackjack());
  }
}
