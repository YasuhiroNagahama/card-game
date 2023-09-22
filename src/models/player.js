import { Card } from "./card.js";
import { Deck } from "./deck.js";

export class Player {
  constructor(playerName, playerType, gameType) {
    this.playerName = playerName;
    this.playerType = playerType;
    this.gameType = gameType;
    this.winAmounts = 0;
    this.status = "";
    this.hands = [];
  }

  initializePlayer() {
    this.winAmounts = 0;
    this.status = "";
  }

  getCurrentPlayerName() {
    return this.playerName;
  }

  getCurrentPlayerType() {
    return this.playerType;
  }

  getCurrentGameType() {
    return this.gameType;
  }

  getCurrentWinAmounts() {
    return this.winAmounts;
  }

  getCurrentStatus() {
    return this.status;
  }

  getCurrentHands() {
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
  constructor(playerName, playerType, gameType) {
    super(playerName, playerType, gameType);
    this.chips = playerType === "dealer" ? 0 : 400;
    this.bets = 0;
    this.score = 0;
    super.setPlayerStatus("betting");
  }

  initializeBlackjackPlayer() {
    const currentPlayerType = super.getCurrentPlayerType();
    this.chips = currentPlayerType === "dealer" ? 0 : 400;
    this.bets = 0;
    super.setPlayerStatus("betting");
  }

  addChips(chipsToAdd) {
    this.chips += chipsToAdd;
  }

  addBets(betsToAdd) {
    this.bets += betsToAdd;
  }

  canBets(betsToAdd) {
    return this.bets <= this.bets + betsToAdd;
  }

  removeChips(chipsToRemove) {
    this.chips -= chipsToRemove;
  }

  removeBets(betsToRemove) {
    this.bets -= betsToRemove;
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
    this.removeBets(Math.floor(this.bets / 2));
    super.setPlayerStatus("surrender");
  }

  setDouble() {
    this.addBets(this.bets);
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
    const currentBets = this.getCurrentBets() * 2;
    const currentChips = this.getCurrentChips();
    return currentBets * 2 < currentChips;
  }

  getCurrentChips() {
    return this.chips;
  }

  getCurrentBets() {
    return this.bets;
  }

  isBlackjack(playerHandsArr) {
    return (
      playerHandsArr.includes("A") &&
      /(10|J|Q|K)/.test(playerHandsArr.join(" "))
    );
  }

  setTotalHandsScore() {
    const currentHands = super.getCurrentHands();
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
    const hands = this.getCurrentHands();
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
    console.log("This player bets : " + this.getCurrentBets());
    console.log("This player total score : " + this.getTotalHandsScore());
    console.log("This player is blackjack : " + this.isBlackjack());
  }
}
