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

  getUnbetPlayers() {
    const unbetPlayers = [];

    for (const player of this.players) {
      const betData = player.getCurrentBet();

      if (betData === 0) {
        unbetPlayers.push(player.getPlayerName());
      }
    }

    return "\n" + unbetPlayers.join("\n");
  }

  setPlayer(playerName, playerType) {
    this.players.push(new BlackjackPlayer(playerName, playerType));
  }

  setHumanPlayers() {
    for (let i = 1; i <= this.playerNumber; i++) {
      this.setPlayer("Player_" + String(i), "player");

      if (this.gameMode === "ai") break;
    }
  }

  setAIPlayers() {
    this.setPlayer("AI", "ai");
    this.setPlayer("AI", "ai");
  }

  initializePlayers() {
    this.setHumanPlayers();
    if (this.gameMode === "ai") this.setAIPlayers();
  }

  setDealer() {
    const gameType = super.getCurrentGameType();
    this.dealer = new BlackjackPlayer("Dealer", "dealer", gameType);
  }

  updatePlayerHands(player) {
    const newCard = super.getCurrentDeck().drawOne();
    const score = newCard.getCardRankNumberBlackjack();

    player.addHand(newCard);
    player.addScore(score);
  }

  initializePlayersHands() {
    for (const player of this.players) {
      for (let i = 0; i < 2; i++) {
        this.updatePlayerHands(player);
      }
    }

    for (let i = 0; i < 2; i++) {
      this.updatePlayerHands(this.dealer);
    }
  }

  updateDealerHands() {
    this.updatePlayerHands(this.dealer);
  }

  allPlayerActionsResolved() {
    for (const player of this.players) {
      const currentPlayerStatus = player.getCurrentStatus();

      if (currentPlayerStatus == "betting" || currentPlayerStatus == "hit")
        return false;
    }

    return true;
  }

  canPlayerBetAtIndex(index, betToAdd) {
    const player = this.players[index];

    return player.canBet(betToAdd);
  }

  resetBetAmount(index) {
    const player = this.players[index];
    player.initializeBet();
  }

  addPlayerBetAtIndex(index, bet) {
    const player = this.players[index];

    player.addBet(bet);
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

  betAi() {
    for (const player of this.players) {
      const playerType = player.getPlayerType();

      if (playerType === "ai") {
        const aiBetAmount = player.getAiBet();

        if (player.canBet(aiBetAmount)) player.addBet(aiBetAmount);
      }
    }
  }

  isVsAI() {
    const currentGameMode = this.getCurrentGameMode();
    return currentGameMode === "ai";
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

    for (let i = 0; i < this.players.length; i++) {
      console.log("Player_" + i);
      console.log("\n");
      this.players[i].print();
      console.log("\n");
    }

    console.log("----- Dealer -----");
    console.log("\n");
    this.dealer.print();
  }
}
