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
    this.hands = [];
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

  setStatus(status) {
    this.status = status;
  }

  addHand(card) {
    this.hands.push(card);
  }

  updateWinAmounts() {
    this.winAmounts++;
  }

  clearStatus() {
    this.status = "";
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
    this.setToWaiting();
  }

  initializeBlackjackPlayer() {
    this.chips = this.getType() === "dealer" ? 0 : 400;
    this.bet = 0;
    this.score = 0;
    this.setToWaiting();
  }

  getChips() {
    return this.chips;
  }

  getBet() {
    return this.bet;
  }

  getScore() {
    return this.score;
  }

  getAiBet() {
    const currentChips = this.getChips();

    if (currentChips <= 50) {
      return Math.floor(Math.random() * (currentChips + 1));
    }

    return Math.floor(Math.random() * (currentChips / 3 + 1));
  }

  getFirstHandObj() {
    return this.hands[0].getCardInfoObj();
  }

  getLastHandObj() {
    return this.hands.slice(-1)[0].getCardInfoObj();
  }

  setToWaiting() {
    this.setStatus("waiting");
  }

  setToStand() {
    this.setStatus("stand");
  }

  setToHit() {
    this.setStatus("hit");
  }

  setToDouble() {
    this.setStatus("double");
  }

  setToSurrender() {
    this.setStatus("surrender");
  }

  setToBust() {
    this.setStatus("bust");
  }

  setToBlackjack() {
    this.setStatus("blackjack");
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

  changeScore(score) {
    this.score = score;
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

  canBet(betToAdd) {
    return (
      Number.isInteger(betToAdd) && betToAdd >= 0 && this.chips >= betToAdd
    );
  }

  canHit() {
    const playerStatus = this.getStatus();
    const playerScore = this.getScore();

    return playerStatus !== "blackjack" && playerScore < 21;
  }

  canDouble() {
    const doubleBet = this.getBet() * 2;
    const currentChips = this.getChips();

    return this.isFirstTurn() && doubleBet <= currentChips;
  }

  isBetCompleted() {
    return this.bet <= this.chips && this.bet > 0;
  }

  isBust() {
    const currentScore = this.getScore();
    return currentScore > 21;
  }

  isBlackjack() {
    const rankArr = [];

    for (const hand of this.hands) rankArr.push(hand.getCardRank());

    return rankArr.includes("A") && /(10|J|Q|K)/.test(rankArr.join(" "));
  }

  isPlayer() {
    const currentPlayer = this.getType();
    return currentPlayer === "player";
  }

  isFirstTurn() {
    return this.hands.length === 2;
  }

  surrenderProcess() {
    const currentBet = this.bet;

    this.removeBet(Math.floor(currentBet / 2));
    this.addChips(Math.floor(currentBet / 2));
  }

  doubleProcess() {
    this.removeChips(this.bet);
    this.addBet(this.bet);
  }

  print() {
    const hands = this.getHands();
    console.log("\n");
    console.log("プレイヤーの名前 : " + this.getName());
    console.log("プレイヤーの種類 : " + this.getType());
    console.log("プレイヤーの勝利数 : " + this.getWinAmounts());
    console.log("プレイヤーの状態 : " + this.getStatus());
    console.log("プレイヤーの手札");
    hands.forEach((hand) => {
      console.log(hand.print());
    });
    console.log("プレイヤーのチップス数 : " + this.getChips());
    console.log("プレイヤーのベット数 : " + this.getBet());
    console.log("プレイヤーの合計スコア : " + this.getScore());
  }
}
