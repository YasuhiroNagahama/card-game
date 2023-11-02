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

  getName() {
    return this.playerName;
  }

  getType() {
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

  setStatus(currentStatus) {
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
    super.setStatus("waiting");
  }

  initializeBlackjackPlayer() {
    const currentPlayerType = super.getCurrentPlayerType();
    this.chips = currentPlayerType === "dealer" ? 0 : 400;
    this.initializeBet();
    super.setStatus("waiting");
  }

  getCurrentChips() {
    return this.chips;
  }

  getCurrentBet() {
    return this.bet;
  }

  getCurrentScore() {
    return this.score;
  }

  setToStand() {
    super.setStatus("stand");
  }

  setToHit() {
    super.setStatus("hit");
  }

  setToDouble() {
    super.setStatus("double");
  }

  setToSurrender() {
    super.setStatus("surrender");
  }

  setToBust() {
    super.setStatus("bust");
  }

  setToBlackjack() {
    super.setStatus("blackjack");
  }

  initializeBet() {
    this.bet = 0;
  }

  addChips(chipsToAdd) {
    this.chips += chipsToAdd;
  }

  addBet(betToAdd) {
    this.bet += betToAdd;
  }

  addScore(scoreToAdd) {
    this.score += scoreToAdd;
  }

  changeBet(bet) {
    this.bet = bet;
  }

  removeChips(chipsToRemove) {
    this.chips -= chipsToRemove;
  }

  removeBet(betToRemove) {
    this.bet -= betToRemove;
  }

  removeBetFromChips() {
    this.chips -= this.bet;
  }

  surrenderProcess() {
    this.removeBet(Math.floor(this.bet / 2));
  }

  doubleProcess() {
    this.removeChips(this.bet);
    this.addBet(this.bet);
  }

  getAiBet() {
    const currentChips = this.getCurrentChips();

    if (currentChips <= 50) {
      return Math.floor(Math.random() * (currentChips + 1));
    }

    return Math.floor(Math.random() * (currentChips / 3 + 1));
  }

  canBet(betToAdd) {
    return betToAdd >= 0 && this.chips >= betToAdd;
  }

  canHit() {
    const playerStatus = super.getStatus();
    const playerScore = this.getCurrentScore();

    return playerStatus !== "blackjack" && playerScore < 21;
  }

  canDouble() {
    const doubleBet = this.getCurrentBet() * 2;
    const currentChips = this.getCurrentChips();

    return doubleBet < currentChips;
  }

  isBust() {
    const currentScore = this.getCurrentScore();
    return currentScore > 21;
  }

  isBetCompleted() {
    return this.bet > 0;
  }

  isBlackjack(playerHands) {
    return (
      playerHands.includes("A") && /(10|J|Q|K)/.test(playerHands.join(" "))
    );
  }

  isPlayer() {
    const currentPlayer = this.getCurrentPlayerType();
    return currentPlayer === "player";
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
    console.log("This player total score : " + this.getCurrentScore());
    console.log("This player is blackjack : " + this.isBlackjack());
  }
}
