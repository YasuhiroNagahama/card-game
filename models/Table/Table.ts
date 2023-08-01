import { Card } from "../Card/Card";
import { Deck } from "../Deck/Deck";
import { BlackjackPlayer, Player } from "../Player/Player";
import { TableInterface } from "../../interfaces/TableInterface/TableInterface";

export class Table implements TableInterface {
  private gameType: string;
  private deck: Deck;
  private turnCounter: number;
  private gamePhase: string;
  private resultLog: string[] = new Array();

  constructor(gameType: string) {
    this.gameType = gameType;

    this.initialize();
  }

  public initialize(): void {
    this.deck = new Deck(this.gameType);
    this.turnCounter = 0;
    this.gamePhase = "";
  }

  public getCurrentGameType(): string {
    return this.gameType;
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
  // single、vs AI、vs Player
  private gameMode: string;
  private playerNames: string[] = new Array();
  private playerNumber: number;
  private players: BlackjackPlayer[] = new Array();
  private betDenominations: number[] = new Array();
  private dealer: BlackjackPlayer;

  // vs Playerの場合は2人または3人でプレイ可能
  constructor(gameMode: string, playerNames: string[]) {
    super("blackjack");

    this.gameMode = gameMode;
    this.playerNames = playerNames;
    this.playerNumber = this.playerNames.length;
    this.betDenominations = [5, 25, 50, 100];

    this.initialize();
  }

  public initialize(): void {
    this.players = new Array();

    this.initializePlayers();
    this.setDealer();
  }

  public initializePlayers(): void {
    if (this.gameMode === "AI") {
      this.setupAIPlayers();
    } else {
      this.setupHumanPlayers();
    }
  }

  private setupAIPlayers(): void {
    this.setPlayer("Player", "player");
    this.setPlayer("AI", "ai");
    this.setPlayer("AI", "ai");
  }

  private setupHumanPlayers(): void {
    for (const playerName of this.playerNames) {
      this.setPlayer(playerName, "player");
    }
  }

  public setPlayer(playerName: string, playerType: string): void {
    const gameType: string = super.getCurrentGameType();

    this.players.push(new BlackjackPlayer(playerName, playerType, gameType));
  }

  public setDealer(): void {
    const gameType: string = super.getCurrentGameType();

    this.dealer = new BlackjackPlayer("Dealer", "dealer", gameType);
  }
}
