import { Card } from "../Card/Card";
import { PlayerInterface } from "../../interfaces/PlayerInterface/PlayerInterface";

export class Player implements PlayerInterface {
  private playerName: string;
  // blackjack => player or ai or dealer
  private playerType: string;
  private gameType: string;
  private winAmounts: number;
  // blackjack => 'bet', 'surrender', 'stand', 'hit', 'double', 'burst','blackjack'
  private status: string;
  private hands: Card[] = new Array();

  constructor(playerName: string, playerType: string, gameType: string) {
    this.playerName = playerName;
    this.playerType = playerType;
    this.gameType = gameType;

    this.initialize();
  }

  public initialize(): void {
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

    this.initialize();
  }

  public initialize(): void {
    // プレイヤーの種類がディーラーの場合はchipsを無限にする
    const currentPlayerType = super.getCurrentPlayerType();

    this.chips = currentPlayerType === "dealer" ? Infinity : 400;
    this.bets = 0;

    super.setPlayerStatus("betting");

    // this.checkBlackjack();
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

    if (this.isBurst()) {
      this.burst();
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

  public burst(): void {
    super.setPlayerStatus("burst");
  }

  public isBlackjack(): boolean {
    const currentStatus: string = super.getCurrentStatus();

    return currentStatus === "blackjack";
  }

  public isBurst(): boolean {
    const totalScore: number = this.totalCardsScore();

    return totalScore > 21;
  }

  public canDouble(): boolean {
    const currentBets: number = this.getCurrentBets() * 2;
    const currentChips: number = this.getCurrentChips();

    return currentBets * 2 < currentChips;
  }

  public totalCardsScore(): number {
    const currentHands: Card[] = super.getCurrentHands();
    let totalScore: number = 0;

    for (const hand of currentHands) {
      const cardRank: number = hand.getCardRankNumberBlackjack();

      totalScore += cardRank;
    }

    return totalScore;
  }
}
