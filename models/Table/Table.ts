import { Card } from "../Card/Card";
import { Deck } from "../Deck/Deck";
import { BlackjackPlayer, Player } from "../Player/Player";
import { TableInterface } from "../../interfaces/TableInterface/TableInterface";

export class Table implements TableInterface {
  private gameType: string;
  private deck: Deck;
  private turnCounter: number;
  // blackjack => 'betting', 'acting', 'evaluatingWinners, gameOver'
  private gamePhase: string;
  private resultLog: string[] = new Array();

  constructor(gameType: string) {
    this.gameType = gameType;

    this.initializeTable();
  }

  public initializeTable(): void {
    this.deck = new Deck(this.gameType);
    this.turnCounter = 0;
    this.gamePhase = "";
  }

  public getCurrentGameType(): string {
    return this.gameType;
  }

  public getCurrentDeck(): Deck {
    return this.deck;
  }

  public getCurrentTurnCounter(): number {
    return this.turnCounter;
  }

  public getCurrentGamePhase(): string {
    return this.gamePhase;
  }

  public getCurrentResultLog(): string[] {
    return this.resultLog;
  }
}

export class BlackjackTable extends Table {
  // blackjack => 'AI', 'Player'
  private gameMode: string;
  // blackjack => 1-3
  private playerNumber: number = 0;
  private playerNames: string[] = new Array();
  private betDenominations: number[] = new Array();
  private dealer: BlackjackPlayer;
  private players: BlackjackPlayer[] = new Array();

  // vs Playerの場合は2人または3人でプレイ可能
  constructor(gameMode: string, playerNames: string[]) {
    super("blackjack");

    this.gameMode = gameMode;
    this.playerNames = playerNames;
    this.betDenominations = [5, 25, 50, 100];

    this.initializeBlackjackTable();
  }

  public initializeBlackjackTable(): void {
    this.players = new Array();

    this.initializePlayers();
    this.setDealer();
    this.initializePlayersHands();
  }

  public setPlayer(playerName: string, playerType: string): void {
    const gameType: string = super.getCurrentGameType();

    this.players.push(new BlackjackPlayer(playerName, playerType, gameType));
  }

  private setAIPlayers(): void {
    this.setPlayer("Player", "player");
    this.setPlayer("AI", "ai");
    this.setPlayer("AI", "ai");
  }

  private setHumanPlayers(): void {
    for (const playerName of this.playerNames) {
      this.setPlayer(playerName, "player");
    }
  }

  public initializePlayers(): void {
    if (this.gameMode === "ai") {
      this.setAIPlayers();
    } else {
      this.setHumanPlayers();
    }
  }

  public setDealer(): void {
    const gameType: string = super.getCurrentGameType();

    this.dealer = new BlackjackPlayer("Dealer", "dealer", gameType);
  }

  public setPlayerHands(player: BlackjackPlayer) {
    const newCard: Card = super.getCurrentDeck().drawOne();

    player.addHand(newCard);
  }

  public initializePlayersHands(): void {
    for (const player of this.players) {
      for (let i = 0; i < 2; i++) {
        this.setPlayerHands(player);
      }
    }

    for (let i = 0; i < 2; i++) {
      this.setPlayerHands(this.dealer);
    }
  }

  public clearPlayersBets(): void {
    for (const player of this.players) {
      player.clearBets();
    }
  }

  public clearPlayersCards(): void {
    for (const player of this.players) {
      player.clearHands();
    }
  }

  public allPlayerActionsResolved(): boolean {
    for (const player of this.players) {
      const currentPlayerStatus: string = player.getCurrentStatus();

      // doubleの時もfalseかも
      if (currentPlayerStatus == "betting" || currentPlayerStatus == "hit")
        return false;
    }

    return true;
  }

  public addPlayerBets(player: BlackjackPlayer, bets: number): void {
    player.addBets(bets);
  }

  public removePlayerBets(player: BlackjackPlayer, bets: number): void {
    player.removeBets(bets);
  }

  public addPlayerChips(player: BlackjackPlayer, chips: number): void {
    player.addChips(chips);
  }

  public removePlayerChips(player: BlackjackPlayer, chips: number): void {
    player.removeChips(chips);
  }

  public canUpdatePlayerBet(player: BlackjackPlayer): boolean {
    const currentPlayerBets: number = player.getCurrentBets();
    const currentPlayerChips: number = player.getCurrentChips();

    return currentPlayerBets < currentPlayerChips;
  }
}

const table: BlackjackTable = new BlackjackTable("player", [
  "Naga",
  "Toshi",
  "Sam",
]);
