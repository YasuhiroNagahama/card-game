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

  getGameType() {
    return this.gameType;
  }

  getDeck() {
    return this.deck;
  }

  getTurn() {
    return this.turnCounter;
  }

  getGamePause() {
    return this.gamePhase;
  }

  getResultLog() {
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
    this.initializeBlackjackPlayer();
  }

  getGameMode() {
    return this.gameMode;
  }

  getPlayerNumber() {
    return this.playerNumber;
  }

  getBetDenominations() {
    return this.betDenominations;
  }

  getPlayers() {
    return this.players;
  }

  getDealer() {
    return this.dealer;
  }

  // getNextPlayerIndex(currentPlayerIndex) {
  // }

  getPlayerStatusAtIndex(index) {
    const player = this.players[index];
    return player.getStatus();
  }

  getPlayerBetAtIndex(index) {
    const player = this.players[index];
    return player.getBet();
  }

  getPlayerScoreAtIndex(index) {
    const player = this.players[index];
    return player.getScore();
  }

  getPlayerChipsAtIndex(index) {
    const player = this.players[index];
    return player.getChips();
  }

  getPlayerStatusAtIndex(index) {
    const player = this.players[index];
    return player.getStatus();
  }

  getUnbetPlayersText() {
    const unbetPlayers = [];

    for (const player of this.players) {
      const betData = player.getBet();

      if (betData === 0) {
        unbetPlayers.push(player.getName());
      }
    }

    return "\n" + unbetPlayers.join("\n");
  }

  getPlayerInfoObjArr() {
    const playerInfoObjArr = [];

    for (const player of this.players) {
      const playerInfoObj = {
        playerName: player.getName(),
        playerStatus: player.getStatus(),
        playerHands: {
          hand1: player.getHands()[0].getCardInfoObj(),
          hand2: player.getHands()[1].getCardInfoObj(),
        },
        playerChips: player.getChips(),
        playerBet: player.getBet(),
        playerScore: player.getScore(),
      };

      playerInfoObjArr.push(playerInfoObj);
    }

    return playerInfoObjArr;
  }

  getStartConfirmation() {
    const confirmTextArr = [];

    for (const player of this.players) {
      if (player.getType() === "ai") continue;

      confirmTextArr.push(
        "\n" + player.getName() + " : " + String(player.getBet()) + " "
      );
    }

    return "ゲームを開始しますか？ " + confirmTextArr.join("");
  }

  getPlayerLastHandObj(index) {
    const player = this.players[index];
    const lastHand = player.getLastHandObj();

    return lastHand;
  }

  getDealerScore() {
    const dealerScore = this.dealer.getScore();
    return dealerScore;
  }

  getDealerStatus() {
    const dealerStatus = this.dealer.getStatus();
    return dealerStatus;
  }

  hitDealer() {
    this.dealer.setToHit();
  }

  bustDealer() {
    this.dealer.setToBust();
  }

  standDealer() {
    this.dealer.setToStand();
  }

  getDealerFirstHandObj() {
    const firstHandObj = this.dealer.getFirstHandObj();
    return firstHandObj;
  }

  getDealerLastHandObj() {
    const lastHandObj = this.dealer.getLastHandObj();
    return lastHandObj;
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
    this.setPlayer("AI_1", "ai");
    this.setPlayer("AI_2", "ai");
  }

  initializePlayers() {
    this.setHumanPlayers();
    if (this.gameMode === "ai") this.setAIPlayers();
  }

  setDealer() {
    const gameType = this.getGameType();
    this.dealer = new BlackjackPlayer("Dealer", "dealer", gameType);
  }

  updatePlayerHands(player) {
    const newCard = this.getDeck().drawOne();
    const score = newCard.getCardRankNumberBlackjack();

    player.addHand(newCard);
    player.addScore(score);
  }

  // blackjackのplayerの状態をblackjackにする
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

  initializeBlackjackPlayer() {
    for (const player of this.players) {
      if (player.isBlackjack()) player.setToBlackjack();
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

  playersBetsCompleted() {
    for (const player of this.players) {
      if (!player.isBetCompleted()) return false;
    }

    return true;
  }

  resetBetAmount(index) {
    const player = this.players[index];
    player.initializeBet();
  }

  addPlayerBetAtIndex(index, bet) {
    const player = this.players[index];

    player.changeBet(bet);
  }

  removePlayerBetFromChips() {
    for (const player of this.players) {
      player.removeBetFromChips();
    }
  }

  betAi() {
    for (const player of this.players) {
      const playerType = player.getType();

      if (playerType === "ai") {
        const aiBetAmount = player.getAiBet();

        if (player.canBet(aiBetAmount)) player.addBet(aiBetAmount);
      }
    }
  }

  isVsAI() {
    const currentGameMode = this.getGameMode();
    return currentGameMode === "ai";
  }

  isBustPlayerAtIndex(index) {
    const player = this.players[index];
    return player.isBust();
  }

  canHitAtIndex(index) {
    const player = this.players[index];

    return player.canHit();
  }

  canDoubleAtIndex(index) {
    const player = this.players[index];

    return player.canDouble();
  }

  canPlayerBetAtIndex(index, betToAdd) {
    const player = this.players[index];

    return player.canBet(betToAdd);
  }

  bustPlayerAtIndex(index) {
    const player = this.players[index];
    player.setToBust();
  }

  standPlayerAtIndex(index) {
    const player = this.players[index];
    player.setToStand();
  }

  hitPlayerAtIndex(index) {
    const player = this.players[index];

    player.setToHit();
    this.updatePlayerHands(player);
  }

  doublePlayerAtIndex(index) {
    const player = this.players[index];

    player.setToDouble();
    player.doubleProcess();
    this.updatePlayerHands(player);
  }

  surrenderPlayerAtIndex(index) {
    const player = this.players[index];
    player.setToSurrender();
    player.surrenderProcess();
  }

  print() {
    console.log("\n");
    console.log("----- Start Game -----");
    console.log("\n");
    console.log("This game type : " + this.getGameType());
    console.log("This game deck : " + this.getDeck());
    console.log("This game turn : " + this.getTurn());
    console.log("This game mode : " + this.getGameMode());
    console.log("This game player number : " + this.getPlayerNumber());
    console.log("This game bet denominations : " + this.getBetDenominations());
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
