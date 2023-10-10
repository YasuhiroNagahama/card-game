import { Card } from "./card.js";
import { Deck } from "./deck.js";
import { Player, BlackjackPlayer } from "./player.js";

export class Table {
  constructor(gameType) {
    this.gameType = gameType;
    this.deck = new Deck(this.gameType);
    this.turnCounter = 0;
    this.gamePhase = "";
    this.resultLog = [];
    this.initializeTable();
  }

  initializeTable() {
    this.deck = new Deck(this.gameType);
    this.turnCounter = 0;
    this.gamePhase = "";
  }

  getCurrentGameType() {
    return this.gameType;
  }

  getCurrentDeck() {
    return this.deck;
  }

  getCurrentTurn() {
    return this.turnCounter;
  }

  getCurrentGamePhase() {
    return this.gamePhase;
  }

  getCurrentResultLog() {
    return this.resultLog;
  }
}

export class BlackjackTable extends Table {
  constructor(gameMode, playerNumber) {
    super("blackjack");
    this.gameMode = gameMode;
    this.playerNumber = playerNumber;
    this.betDenominations = [5, 20, 50, 100];
    this.players = [];
    this.dealer = "";
    this.initializeBlackjackTable();
  }

  initializeBlackjackTable() {
    this.players = [];
    this.initializePlayers();
    this.setDealer();
    this.initializePlayersHands();
    this.setPlayersScore();
  }

  setPlayer(playerName, playerType) {
    this.players.push(new BlackjackPlayer(playerName, playerType));
  }

  setAIPlayers() {
    this.setPlayer("Player", "player");
    this.setPlayer("AI", "ai");
    this.setPlayer("AI", "ai");
  }

  setHumanPlayers() {
    for (let i = 1; i <= this.playerNumber; i++) {
      this.setPlayer("Player_" + String(i), "player");
    }
  }

  initializePlayers() {
    if (this.gameMode === "ai") {
      this.setAIPlayers();
    } else {
      this.setHumanPlayers();
    }
  }

  setDealer() {
    const gameType = super.getCurrentGameType();

    this.dealer = new BlackjackPlayer("Dealer", "dealer", gameType);
  }

  setPlayerHands(player) {
    const newCard = super.getCurrentDeck().drawOne();

    player.addHand(newCard);
    // scoreの更新をどうするか
    const score = newCard.getCardRankNumberBlackjack();
    player.addScore(score);
  }

  initializePlayersHands() {
    for (const player of this.players) {
      for (let i = 0; i < 2; i++) {
        this.setPlayerHands(player);
      }
    }

    for (let i = 0; i < 2; i++) {
      this.setPlayerHands(this.dealer);
    }
  }

  setPlayersScore() {
    for (const player of this.players) {
      player.setTotalHandsScore();
    }

    this.dealer.setTotalHandsScore();
  }

  clearPlayersBets() {
    for (const player of this.players) {
      player.clearBets();
    }
  }

  clearPlayersCards() {
    for (const player of this.players) {
      player.clearHands();
    }
  }

  allPlayerActionsResolved() {
    for (const player of this.players) {
      const currentPlayerStatus = player.getCurrentStatus();

      if (currentPlayerStatus == "betting" || currentPlayerStatus == "hit")
        return false;
    }

    return true;
  }

  addPlayerBets(player, bets) {
    player.addBets(bets);
  }

  removePlayerBets(player, bets) {
    player.removeBets(bets);
  }

  addPlayerChips(player, chips) {
    player.addChips(chips);
  }

  removePlayerChips(player, chips) {
    player.removeChips(chips);
  }

  canUpdatePlayerBet(player) {
    const currentPlayerBets = player.getCurrentBets();
    const currentPlayerChips = player.getCurrentChips();

    return currentPlayerBets < currentPlayerChips;
  }

  isVsAI() {
    const currentGameMode = this.getCurrentGameMode();
    return currentGameMode === "ai";
  }

  getCurrentGameMode() {
    return this.gameMode;
  }

  getCurrentPlayerNumber() {
    return this.playerNumber;
  }

  getCurrentBetDenominations() {
    return this.betDenominations;
  }

  getCurrentPlayers() {
    return this.players;
  }

  getCurrentDealer() {
    return this.dealer;
  }

  print() {
    console.log("\n");
    console.log("----- Start Game -----");
    console.log("\n");
    console.log("This game type : " + super.getCurrentGameType());
    console.log("This game deck : " + super.getCurrentDeck());
    console.log("This game turn : " + super.getCurrentTurn());
    console.log("This game mode : " + this.getCurrentGameMode());
    console.log("This game player number : " + this.getCurrentPlayerNumber());
    console.log(
      "This game bet denominations : " + this.getCurrentBetDenominations()
    );
    console.log("\n");
    console.log("----- Players -----");
    console.log("\n");

    let i = 1;

    this.players.forEach((player) => {
      console.log("Player_" + i);
      console.log("\n");
      player.print();
      console.log("\n");
      i++;
    });

    console.log("----- Dealer -----");
    console.log("\n");
    this.dealer.print();
  }
}
