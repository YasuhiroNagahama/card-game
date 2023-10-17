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

  getPlayerStatus() {
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
  constructor(playerName, playerType) {
    super(playerName, playerType);
    this.chips = playerType === "dealer" ? 0 : 400;
    this.bet = 0;
    this.score = 0;
    super.setPlayerStatus("waiting");
  }

  initializeBlackjackPlayer() {
    const currentPlayerType = super.getCurrentPlayerType();
    this.chips = currentPlayerType === "dealer" ? 0 : 400;
    this.initializeBet();
    super.setPlayerStatus("waiting");
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
    super.setPlayerStatus("stand");
  }

  setToHit() {
    super.setPlayerStatus("hit");
  }

  setToDouble() {
    super.setPlayerStatus("double");
  }

  setToSurrender() {
    super.setPlayerStatus("surrender");
  }

  setToBust() {
    super.setPlayerStatus("bust");
  }

  setToBlackjack() {
    super.setPlayerStatus("blackjack");
  }

  initializeBet() {
    this.bet = 0;
  }

  addChips(chipsToAdd) {
    this.chips += chipsToAdd;
  }

  addBet(betToAdd) {
    this.bet = betToAdd;
  }

  addScore(scoreToAdd) {
    this.score += scoreToAdd;
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
    const currentScore = this.getCurrentScore();
    return currentScore > 21;
  }

  canHit() {
    const playerStatus = super.getPlayerStatus();
    const playerScore = this.getCurrentScore();

    // hit以外の時どうする
    return playerStatus !== "blackjack" && playerScore < 21;
  }

  canDouble() {
    const currentBet = this.getCurrentBet() * 2;
    const currentChips = this.getCurrentChips();
    return currentBet * 2 < currentChips;
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
    console.log("This player bet : " + this.getCurrentBet());
    console.log("This player total score : " + this.getCurrentScore());
    console.log("This player is blackjack : " + this.isBlackjack());
  }
}
