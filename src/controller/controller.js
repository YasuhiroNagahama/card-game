import { Table, BlackjackTable } from "../models/table.js";
import { View, BlackjackView } from "../view/view.js";

// Tableで行うべきことをControllerに書いてしまったので、書き換える
// dealer時のクリック制御
// 多少リファクタリングする

class Controller {
  constructor() {
    this.gameMode = "player";
    this.gameType = "blackjack";
    this.playerCount = 2;

    this.initialize();
  }

  setGameMode(gameMode) {
    this.gameMode = gameMode;
  }

  setGameType(gameType) {
    this.gameType = gameType;
  }

  setPlayerCount(playerCount) {
    this.playerCount = playerCount;
  }

  hiddenPlayerCount() {
    const playerCountEle = document.getElementById("playerCount");

    playerCountEle.style.display = "none";
  }

  displayPlayerCount() {
    const playerCountEle = document.getElementById("playerCount");

    playerCountEle.style.display = "flex";
  }

  addGameModeChangeListeners() {
    const gameModeSelect = document.getElementById("gameModeSelect");

    gameModeSelect.addEventListener("change", () => {
      const gameMode = gameModeSelect.value;
      this.setGameMode(gameMode);

      if (this.gameMode === "ai") {
        this.hiddenPlayerCount();
        this.setPlayerCount(3);
      } else {
        this.displayPlayerCount();
        this.addPlayerCountCheckedElemment();
      }
    });
  }

  addGameTypeChangeListeners() {
    const gameTypeSelect = document.getElementById("gameTypeSelect");

    gameTypeSelect.addEventListener("change", () => {
      const gameType = gameTypeSelect.value;
      this.setGameType(gameType);
    });
  }

  addPlayerCountCheckedElemment() {
    const playerCountElemments = document.querySelectorAll(
      ".game-player-count-input"
    );

    playerCountElemments.forEach((playerCountElemment) => {
      if (playerCountElemment.checked) {
        const playerCount = Number(playerCountElemment.value);
        this.setPlayerCount(playerCount);
      }
    });
  }

  addPlayerCountChangeListeners() {
    const playerCountElemments = document.querySelectorAll(
      ".game-player-count-input"
    );

    playerCountElemments.forEach((playerCountElemment) => {
      playerCountElemment.addEventListener("change", () => {
        const playerCount = Number(playerCountElemment.value);
        this.setPlayerCount(playerCount);
      });
    });
  }

  gameStartBtnClick() {
    const gameStartBtn = document.getElementById("gameStartBtn");

    gameStartBtn.addEventListener("click", () => {
      if (this.gameType === "blackjack") {
        const blackjack = new BlackjackController(
          this.gameMode,
          this.playerCount
        );
      } else {
        console.log("いつか追加！");
      }
    });
  }

  initialize() {
    this.addGameModeChangeListeners();
    this.addGameTypeChangeListeners();
    this.addPlayerCountChangeListeners();
    this.gameStartBtnClick();
  }

  print() {
    console.log("\nThis game mode : " + this.gameMode);
    console.log("This game type : " + this.gameType);
    console.log("This player count : " + this.playerCount);
  }
}

class BlackjackController {
  constructor(gameMode, playerCount) {
    this.gameMode = gameMode;
    this.playerCount = playerCount;
    this.currenPlayerIndex = 0;
    this.betAmount = 0;
    this.selectedPlayerIndex = 0;
    this.blackjackView = new BlackjackView();
    this.blackjackTable = new BlackjackTable(this.gameMode, this.playerCount);

    this.displayBetScreen();
    this.callBetModalEventListeners();
  }

  updateDealerView() {
    const dealer = this.blackjackTable.getCurrentDealer();
    const dealerHand = dealer.getCurrentHands()[1].getCardInfoObj();
    const dealerScore = dealer.getCurrentScore();
    
    this.blackjackView.removeDealerCardBack();
    this.blackjackView.addDealerCard(dealerHand);
    this.blackjackView.updateDealerScore(dealerScore);
  }

  // dealerTurn(dealer, dealerScore) {
  //   let score = dealerScore;

  //   while(score < 18) {

  //     break;
  //   }
  // }

  changeDealerTurn() {
    const dealer = this.blackjackTable.getCurrentDealer();
    const dealerHand = dealer.getCurrentHands()[1].getCardInfoObj();
    const dealerScore = dealer.getCurrentScore();

    this.updateDealerView(dealerHand, dealerScore);
    // this.dealerTurn(dealer, dealerScore);
  }

  handleBust(player) {
    player.setToBust();
    this.updatePlayerAndViewState(player);
    this.skipBlackjackPlayer();
  }

  standAction() {
    const player =
      this.blackjackTable.getCurrentPlayers()[this.currenPlayerIndex];

    player.setToStand();
    this.updatePlayerAndViewState(player);
    this.skipBlackjackPlayer();
  }

  hitAction() {
    const player =
      this.blackjackTable.getCurrentPlayers()[this.currenPlayerIndex];

    if (player.canHit()) {
      player.setToHit();

      this.blackjackTable.updatePlayerHands(player);

      const playerHands = player.getCurrentHands();
      const playerScore = player.getCurrentScore();

      this.blackjackView.addPlayerCard(
        this.currenPlayerIndex,
        playerHands.slice(-1)[0]
      );
      this.blackjackView.updatePlayerScore(this.currenPlayerIndex, playerScore);
      this.updatePlayerStatus(player);

      if (playerScore === 21) this.standAction();
      else if (player.isBust()) this.handleBust(player);
    }
  }

  standBtnClick() {
    const standBtn = document.getElementById("standBtn");

    standBtn.addEventListener("click", () => {
      this.standAction();
    });
  }

  hitBtnClick() {
    const hitBtn = document.getElementById("hitBtn");

    // HITできない場合で、HITボタンが押せることはないと思う
    hitBtn.addEventListener("click", () => {
      this.hitAction();
    });
  }

  doubleBtnClick() {
    const doubleBtn = document.getElementById("doubleBtn");

    doubleBtn.addEventListener("click", () => {
      const player =
        this.blackjackTable.getCurrentPlayers()[this.currenPlayerIndex];

      player.setToDouble();
      this.updatePlayerAndViewState(player);
    });
  }

  surrenderBtnClick() {
    const surrenderBtn = document.getElementById("surrenderBtn");

    surrenderBtn.addEventListener("click", () => {
      const player =
        this.blackjackTable.getCurrentPlayers()[this.currenPlayerIndex];

      player.setToSurrender();
      this.updatePlayerAndViewState(player);
    });
  }

  updatePlayerAndViewState(player) {
    this.updatePlayerStatus(player);

    if (this.currenPlayerIndex === this.playerCount - 1) {
      this.togglePlayerNameColor();
      this.changeDealerTurn();
    } else {
      this.togglePlayerNameColor();
      this.updateCurrenPlayerIndex();
      this.togglePlayerNameColor();
    }
  }

  updatePlayerStatus(player) {
    const playerStatus = player.getPlayerStatus();

    this.blackjackView.updatePlayerStatus(this.currenPlayerIndex, playerStatus);
  }

  updateCurrenPlayerIndex() {
    if (this.currenPlayerIndex + 1 < this.playerCount) {
      this.currenPlayerIndex++;
    }
  }

  togglePlayerNameColor() {
    this.blackjackView.togglePlayerNameColor(this.currenPlayerIndex);
  }

  playersBetsCompleted() {
    const players = this.blackjackTable.getCurrentPlayers();

    for (const player of players) {
      // AIの場合どうするか
      if (!player.isBetCompleted()) {
        return false;
      }
    }

    return true;
  }

  getStartConfirmation() {
    const players = this.blackjackTable.getCurrentPlayers();
    let confirmText = "";

    for (const player of players) {
      if (player.getPlayerType() === "ai") continue;

      confirmText +=
        "\n" +
        player.getPlayerName() +
        " : " +
        String(player.getCurrentBet()) +
        " ";
    }

    confirmText = "ゲームを開始しますか？ " + confirmText;

    return confirm(confirmText);
  }

  removeGameBetModal() {
    const gameBetModal = document.getElementById("gameBetModal");
    this.blackjackView.removeDisplay(gameBetModal);
  }

  gameDisplayMethod() {
    this.blackjackView.addGameDisplay();
  }

  displayGameScreen() {
    this.removeGameBetModal();
    this.gameDisplayMethod();
  }

  loadDealerDataToView() {
    const dealer = this.blackjackTable.getCurrentDealer();
    const dealerHand = dealer.getCurrentHands()[0].getCardInfoObj();
    this.blackjackView.addDealerElement(dealerHand);
  }

  loadPlayerDataToView() {
    const players = this.blackjackTable.getCurrentPlayers();

    for (const player of players) {
      const playerInfo = {
        playerName: player.getPlayerName(),
        playerStatus: player.getPlayerStatus(),
        playerHands: {
          hand1: player.getCurrentHands()[0].getCardInfoObj(),
          hand2: player.getCurrentHands()[1].getCardInfoObj(),
        },
        playerChips: player.getCurrentChips(),
        playerBets: player.getCurrentBet(),
        playerScore: player.getCurrentScore(),
      };

      this.blackjackView.addPlayerElement(playerInfo);
    }
  }

  loadDataToView() {
    this.loadDealerDataToView();
    this.loadPlayerDataToView();
  }

  callBlackjackEventListener() {
    this.hitBtnClick();
    this.doubleBtnClick();
    this.standBtnClick();
    this.surrenderBtnClick();
  }

  skipBlackjackPlayer() {
    const players = this.blackjackTable.getCurrentPlayers();

    for (let i = this.currenPlayerIndex; i < players.length; i++) {
      const player = players[i];
      const playersHands = player.getCurrentHands();

      if (player.isBlackjack(playersHands))
        this.updatePlayerAndViewState(player);
      else break;
    }
  }

  alertUnbetPlayers() {
    const players = this.blackjackTable.getCurrentPlayers();
    let unbetPlayers = "";

    for (const player of players) {
      const betData = player.getCurrentBet();

      if (betData === 0) {
        unbetPlayers += "\n" + player.getPlayerName();
      }
    }

    alert("ベットが完了していないプレーヤーがいます。" + unbetPlayers);
  }

  startBtnClick() {
    const startBtn = document.getElementById("startBtn");

    startBtn.addEventListener("click", () => {
      if (this.playersBetsCompleted()) {
        if (this.getStartConfirmation()) {
          this.displayGameScreen();
          this.loadDataToView();
          this.togglePlayerNameColor();
          this.callBlackjackEventListener();
          this.skipBlackjackPlayer();
        }
      } else {
        this.alertUnbetPlayers();
      }
    });
  }

  addBetAmount(bet) {
    const currentPlayer =
      this.blackjackTable.getCurrentPlayers()[this.selectedPlayerIndex];

    if (currentPlayer.canBet(this.betAmount + bet)) {
      this.betAmount += bet;
    } else {
      alert("ベット額が所持金を上回ります。");
    }
  }

  changeBetAmount(bet) {
    this.betAmount = bet;
  }

  bet5BtnClick() {
    const bet5Btn = document.getElementById("bet5");

    bet5Btn.addEventListener("click", () => {
      this.addBetAmount(5);
      this.updateBetTotalElement();
    });
  }

  bet20BtnClick() {
    const bet20Btn = document.getElementById("bet20");

    bet20Btn.addEventListener("click", () => {
      this.addBetAmount(20);
      this.updateBetTotalElement();
    });
  }

  bet50BtnClick() {
    const bet50Btn = document.getElementById("bet50");

    bet50Btn.addEventListener("click", () => {
      this.addBetAmount(50);
      this.updateBetTotalElement();
    });
  }

  bet100BtnClick() {
    const bet100Btn = document.getElementById("bet100");

    bet100Btn.addEventListener("click", () => {
      this.addBetAmount(100);
      this.updateBetTotalElement();
    });
  }

  resetBtnClick() {
    const resetBetBtn = document.getElementById("resetBetBtn");

    resetBetBtn.addEventListener("click", () => {
      if (confirm("ベット額をリセットしますか？")) {
        this.changeBetAmount(0);

        const currentPlayer =
          this.blackjackTable.getCurrentPlayers()[this.selectedPlayerIndex];
        currentPlayer.initializeBet();

        this.updateBetTotalElement();

        alert("ベット額のリセットを完了しました。");
      } else {
        alert("ベット額のリセットを中止しました。");
      }
    });
  }

  resetCurrentBet() {
    this.changeBetAmount(0);

    const currentPlayer =
      this.blackjackTable.getCurrentPlayers()[this.selectedPlayerIndex];
    currentPlayer.initializeBet();

    this.updateBetTotalElement();
  }

  betConfirmBtnClick() {
    const betConfirmBtn = document.getElementById("betConfirmBtn");

    betConfirmBtn.addEventListener("click", () => {
      if (this.betAmount !== 0) {
        const currentPlayer =
          this.blackjackTable.getCurrentPlayers()[this.selectedPlayerIndex];

        if (currentPlayer.canBet(this.betAmount)) {
          currentPlayer.addBet(this.betAmount);

          this.updateBetTotalElement();
          alert("ベット完了 : " + String(this.betAmount) + "bet");
        } else {
          alert("ベット額がマイナス値か、ベット額が所持金を上回ります。");
          this.resetCurrentBet();
        }
      }
    });
  }

  updatePlayerBet() {
    const betTotalEle = document.getElementById("betTotal");

    betTotalEle.addEventListener("change", () => {
      const currentPlayer =
        this.blackjackTable.getCurrentPlayers()[this.selectedPlayerIndex];
      const betTotal = Number(betTotalEle.value);

      if (
        betTotal > 0 &&
        !Number.isInteger(betTotal) &&
        currentPlayer.canBet(betTotal)
      ) {
        this.changeBetAmount(betTotal);
      } else {
        alert("ベット不可能です。");
        this.resetCurrentBet();
      }
    });
  }

  updateBetTotalElement() {
    this.blackjackView.updateBetTotal(this.betAmount);
  }

  updateSelectedPlayer() {
    const playerSelect = document.getElementById("playerSelect");

    playerSelect.addEventListener("change", () => {
      const playerIndex = Number(playerSelect.value);

      this.selectedPlayerIndex = playerIndex;

      const currentPlayer =
        this.blackjackTable.getCurrentPlayers()[this.selectedPlayerIndex];
      const betData = currentPlayer.getCurrentBet();

      this.changeBetAmount(betData);
      this.updateBetTotalElement();
    });
  }

  betAi() {
    const players = this.blackjackTable.getCurrentPlayers();

    for (const player of players) {
      const playerType = player.getPlayerType();

      if (playerType === "ai") {
        const aiBetAmount = player.getAiBet();

        if (player.canBet(aiBetAmount)) player.addBet(aiBetAmount);
      }
    }
  }

  callBetModalEventListeners() {
    this.startBtnClick();
    this.bet5BtnClick();
    this.bet20BtnClick();
    this.bet50BtnClick();
    this.bet100BtnClick();
    this.resetBtnClick();
    this.updatePlayerBet();
    this.betConfirmBtnClick();
    this.updateSelectedPlayer();

    if (this.gameMode === "ai") this.betAi();
  }

  removeStartScreen() {
    const startScreen = document.getElementById("startScreen");
    this.blackjackView.removeDisplay(startScreen);
  }

  addBetModalMethod() {
    this.blackjackView.addBetModal();

    if (this.gameMode === "ai") this.blackjackView.addBetOption(1);
    else this.blackjackView.addBetOption(this.playerCount);
  }

  displayBetScreen() {
    this.removeStartScreen();
    this.addBetModalMethod();
  }
}

const controller = new Controller();
