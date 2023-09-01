import { Card } from "../Card/Card";
import { PlayerInterface } from "../../interfaces/PlayerInterface/PlayerInterface";

export class Player implements PlayerInterface {
  private playerName: string;
  // blackjack => playerかaiかdealer
  private playerType: string;
  private gameType: string;
  private winAmounts: number;
  // blackjack => 'betting', 'surrender', 'stand', 'hit', 'double', 'bust','blackjack'
  private status: string;
  private hands: Card[] = new Array();

  constructor(playerName: string, playerType: string, gameType: string) {
    this.playerName = playerName;
    this.playerType = playerType;
    this.gameType = gameType;

    this.initializePlayer();
  }

  public initializePlayer(): void {
    this.winAmounts = 0;
    this.status = "";
  }

  public getCurrentPlayerName(): string {
    return this.playerName;
  }

  public getCurrentPlayerType(): string {
    return this.playerType;
  }

  public getCurrentGameType(): string {
    return this.gameType;
  }

  public getCurrentWinAmounts(): number {
    return this.winAmounts;
  }

  public getCurrentStatus(): string {
    return this.status;
  }

  public getCurrentHands(): Card[] {
    return this.hands;
  }

  public setPlayerStatus(currentStatus: string): void {
    this.status = currentStatus;
  }

  public updateWinAmounts(): void {
    this.winAmounts++;
  }

  public addHand(card: Card): void {
    this.hands.push(card);
  }

  public clearWinAmounts(): void {
    this.winAmounts = 0;
  }

  public clearHands(): void {
    this.hands = [];
  }
}

// 未完成
export class BlackjackPlayer extends Player {
  private chips: number;
  private bets: number;

  constructor(playerName: string, playerType: string, gameType: string) {
    super(playerName, playerType, gameType);

    this.initializeBlackjackPlayer();
  }

  public initializeBlackjackPlayer(): void {
    const currentPlayerType = super.getCurrentPlayerType();

    // プレイヤーの種類がディーラーの場合はchipsを0にする
    this.chips = currentPlayerType === "dealer" ? 0 : 400;
    this.bets = 0;

    super.setPlayerStatus("betting");

    this.checkBlackjack();
  }

  public checkBlackjack(): void {
    const currentHands: Card[] = super.getCurrentHands();
    const ranks: string[] = [];

    for (const hand of currentHands) {
      ranks.push(hand.getCardRank());
    }

    if (
      (ranks.includes("A") && ranks.includes("10")) ||
      ranks.includes("J") ||
      ranks.includes("Q") ||
      ranks.includes("K")
    ) {
      super.setPlayerStatus("blackjack");
    }
  }

  public getCurrentChips(): number {
    return this.chips;
  }

  public getCurrentBets(): number {
    return this.bets;
  }

  public addChips(chipsToAdd: number): void {
    this.chips += chipsToAdd;
  }

  public addBets(betsToAdd: number): void {
    this.bets += betsToAdd;
  }

  public removeChips(chipsToRemove: number): void {
    this.chips -= chipsToRemove;
  }

  public removeBets(betsToRemove: number): void {
    this.bets -= betsToRemove;
  }

  public clearBets(): void {
    this.bets = 0;
  }

  public hit(card: Card): void {
    super.addHand(card);

    if (this.isBust()) {
      this.bust();
    }
  }

  public stand(): void {
    super.setPlayerStatus("stand");
  }

  public surrender(): void {
    this.removeBets(Math.floor(this.bets / 2));
    super.setPlayerStatus("surrender");
  }

  public double(): void {
    this.addBets(this.bets);
    super.setPlayerStatus("double");
  }

  public bust(): void {
    super.setPlayerStatus("bust");
  }

  public isBlackjack(): boolean {
    const currentStatus: string = super.getCurrentStatus();

    return currentStatus === "blackjack";
  }

  public isBust(): boolean {
    const totalScore: number = this.getTotalHandsScore();

    return totalScore > 21;
  }

  public canDouble(): boolean {
    const currentBets: number = this.getCurrentBets() * 2;
    const currentChips: number = this.getCurrentChips();

    return currentBets * 2 < currentChips;
  }

  public getTotalHandsScore(): number {
    const currentHands: Card[] = super.getCurrentHands();
    let totalScore: number = 0;

    for (const hand of currentHands) {
      const cardRank: number = hand.getCardRankNumberBlackjack();

      totalScore += cardRank;
    }

    return totalScore;
  }

  public print(): void {
    const hands = this.getCurrentHands();
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
