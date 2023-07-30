import { Card } from "../Card/Card";
// import { Deck } from "../Deck/Deck";
import { PlayerInterface } from "../../interfaces/PlayerInterface/PlayerInterface";

export class Player implements PlayerInterface {
  private playerName: string;
  private playerType: string;
  private gameType: string;
  private winAmounts: number;
  private status: string;
  private hands: Card[] = new Array();

  constructor(playerName: string, playerType: string, gameType: string) {
    this.playerName = playerName;
    this.playerType = playerType;
    this.gameType = gameType;
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

export class BlackjackPlayer extends Player {
  private chips: number;
  private bets: number;

  constructor(playerName: string, playerType: string) {
    super(playerName, playerType, "blackjack");

    this.initialize();
  }

  public initialize(): void {
    this.chips = 400;
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
  }

  public stand(): void {
    super.setPlayerStatus("stand");
  }

  public surrender(): void {
    this.bets = Math.floor(this.bets / 2);
    super.setPlayerStatus("surrender");
  }

  public double(): void {
    this.bets *= 2;
    super.setPlayerStatus("double");
  }

  public insurance(): void {
    const currentPlayerType: string = super.getCurrentPlayerType();
    const firstCardRank: string = String(
      super.getCurrentHands()[0].getCardRankNumberBlackjack()
    );
  }

  public burst(): void {
    super.setPlayerStatus("burst");
  }

  public isBlackjack(): boolean {
    return super.getCurrentStatus() === "blackjack";
  }

  public isBurst(): boolean {
    const totalScore: number = this.totalCardsScore();

    if (totalScore > 21) {
      this.burst();
      return true;
    }

    return false;
  }

  public haveTurn(): boolean {
    return super.getCurrentStatus() === "hit";
  }

  public totalCardsScore(): number {
    const currentHands: Card[] = super.getCurrentHands();
    let totalScore: number = 0;

    for (const hand of currentHands) {
      totalScore += hand.getCardRankNumberBlackjack();
    }

    return totalScore;
  }
}

const player: BlackjackPlayer = new BlackjackPlayer("Naga", "player");
player.addHand(new Card("H", "1"));
player.addHand(new Card("D", "J"));
player.addHand(new Card("C", "3"));
player.addHand(new Card("S", "7"));
