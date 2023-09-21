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
    super.setPlayerStatus("betting");
  }

  initializeBlackjackPlayer() {
    const currentPlayerType = super.getCurrentPlayerType();
    this.chips = currentPlayerType === "dealer" ? 0 : 400;
    this.bets = 0;
    super.setPlayerStatus("betting");
  }

  // blackjackの判定処理がない

  addChips(chipsToAdd) {
    this.chips += chipsToAdd;
  }

  addBets(betsToAdd) {
    this.bets += betsToAdd;
  }

  removeChips(chipsToRemove) {
    this.chips -= chipsToRemove;
  }

  removeBets(betsToRemove) {
    this.bets -= betsToRemove;
  }

  clearBets() {
    this.bets = 0;
  }

  hit(card) {
    super.addHand(card);

    if (this.isBust()) {
      this.bust();
    }
  }

  stand() {
    super.setPlayerStatus("stand");
  }

  surrender() {
    this.removeBets(Math.floor(this.bets / 2));
    super.setPlayerStatus("surrender");
  }

  double() {
    this.addBets(this.bets);
    super.setPlayerStatus("double");
  }

  bust() {
    super.setPlayerStatus("bust");
  }

  isBlackjack() {
    const currentStatus = super.getCurrentStatus();
    return currentStatus === "blackjack";
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

  getTotalHandsScore() {
    const currentHands = super.getCurrentHands();
    let totalScore = 0;
    for (const hand of currentHands) {
      const cardRank = hand.getCardRankNumberBlackjack();
      totalScore += cardRank;
    }
    return totalScore;
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
