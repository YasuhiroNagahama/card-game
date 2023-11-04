import { Table, BlackjackTable } from "../models/table.js";
import { View, BlackjackView } from "../view/view.js";

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
        this.addPlayerCountCheckedElement();
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

  addPlayerCountCheckedElement() {
    const playerCountElements = document.querySelectorAll(
      ".game-player-count-input"
    );

    playerCountElements.forEach((playerCountElement) => {
      if (playerCountElement.checked) {
        const playerCount = Number(playerCountElement.value);
        this.setPlayerCount(playerCount);
      }
    });
  }

  addPlayerCountChangeListeners() {
    const playerCountElements = document.querySelectorAll(
      ".game-player-count-input"
    );

    playerCountElements.forEach((playerCountElement) => {
      playerCountElement.addEventListener("change", () => {
        const playerCount = Number(playerCountElement.value);
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
    this.currentPlayerIndex = 0;
    this.betAmount = 0;
    this.selectedPlayerIndex = 0;
    this.blackjackView = new BlackjackView();
    this.blackjackTable = new BlackjackTable(this.gameMode, this.playerCount);

    this.displayBetScreen();
    this.callBetModalEventListeners();
  }

  updateDealerView() {
    // 非表示になっていた2番目のカードを取得
    const dealerHand = this.blackjackTable.getDealerHandAtIndex(1);
    const dealerScore = this.blackjackTable.getDealerScore();

    this.blackjackView.removeDealerCardBack();
    this.blackjackView.addDealerCard(dealerHand);
    this.blackjackView.updateDealerScore(dealerScore);
    this.blackjackView.toggleDealerNameColor();
  }

  dealerProcess() {}

  changeDealerTurn() {
    this.updateDealerView();
  }

  bust() {
    this.blackjackTable.bustPlayerAtIndex(this.currentPlayerIndex);
    this.updatePlayerAndViewState();
    this.skipBlackjackPlayers();
  }

  stand() {
    this.blackjackTable.standPlayerAtIndex(this.currentPlayerIndex);
    this.updatePlayerAndViewState();
    this.skipBlackjackPlayers();
  }

  hit() {
    this.blackjackTable.hitPlayerAtIndex(this.currentPlayerIndex);
    this.addPlayerCard();
    this.updatePlayerScore();
    this.updatePlayerStatus();

    if (this.blackjackTable.isBustPlayerAtIndex(this.currentPlayerIndex)) {
      this.bust();
    }
  }

  double() {
    this.blackjackTable.doublePlayerAtIndex(this.currentPlayerIndex);
    this.addPlayerCard();
    this.updatePlayerBet();
    this.updatePlayerScore();
    this.updatePlayerChips();
    this.skipBlackjackPlayers();

    if (this.blackjackTable.isBustPlayerAtIndex(this.currentPlayerIndex)) {
      this.bust();
    } else {
      this.updatePlayerAndViewState();
    }
  }

  surrender() {
    this.blackjackTable.surrenderPlayerAtIndex(this.currentPlayerIndex);
    this.updatePlayerBet();
    this.updatePlayerChips();
    this.skipBlackjackPlayers();
    this.updatePlayerAndViewState();
  }

  alertInvalidAction(action) {
    alert("現在の状態では" + action + "することはできません。");
  }

  standBtnClick() {
    const standBtn = document.getElementById("standBtn");

    standBtn.addEventListener("click", () => {
      this.stand();
    });
  }

  hitBtnClick() {
    const hitBtn = document.getElementById("hitBtn");

    hitBtn.addEventListener("click", () => {
      if (this.blackjackTable.canHitAtIndex(this.currentPlayerIndex)) {
        this.hit();
      } else {
        this.alertInvalidAction("HIT");
      }
    });
  }

  doubleBtnClick() {
    const doubleBtn = document.getElementById("doubleBtn");

    doubleBtn.addEventListener("click", () => {
      if (this.blackjackTable.canDoubleAtIndex(this.currentPlayerIndex)) {
        this.double();
      } else {
        this.alertInvalidAction("DOUBLE");
      }
    });
  }

  surrenderBtnClick() {
    const surrenderBtn = document.getElementById("surrenderBtn");

    surrenderBtn.addEventListener("click", () => {
      if (
        confirm(
          "今回のゲームを降りますか？賭け金の半分が手元にかえってきます。"
        )
      ) {
        this.surrender();
      }
    });
  }

  addPlayerCard() {
    const playerLastHand = this.blackjackTable.getPlayerLastHand(
      this.currentPlayerIndex
    );
    this.blackjackView.addPlayerCard(this.currentPlayerIndex, playerLastHand);
  }

  updatePlayerBet() {
    const playerBet = this.blackjackTable.getPlayerBet(this.currentPlayerIndex);

    this.blackjackView.updatePlayerBet(this.currentPlayerIndex, playerBet);
  }

  updatePlayerScore() {
    const playerScore = this.blackjackTable.getPlayerScore(
      this.currentPlayerIndex
    );

    this.blackjackView.updatePlayerScore(this.currentPlayerIndex, playerScore);

    if (playerScore === 21) this.stand();
  }

  updatePlayerChips() {
    const playerChips = this.blackjackTable.getPlayerChips(
      this.currentPlayerIndex
    );

    this.blackjackView.updatePlayerChips(this.currentPlayerIndex, playerChips);
  }

  updatePlayerStatus() {
    const playerStatus = this.blackjackTable.getPlayerStatus(
      this.currentPlayerIndex
    );

    this.blackjackView.updatePlayerStatus(
      this.currentPlayerIndex,
      playerStatus
    );
  }

  togglePlayerNameColor() {
    this.blackjackView.togglePlayerNameColor(this.currentPlayerIndex);
  }

  updateCurrentPlayerIndex() {
    // 下の条件分岐いるのか
    if (this.currentPlayerIndex + 1 < this.playerCount)
      this.currentPlayerIndex++;
  }

  updatePlayerAndViewState() {
    this.updatePlayerStatus();
    this.togglePlayerNameColor();

    if (this.currentPlayerIndex + 1 === this.playerCount) {
      this.changeDealerTurn();
    } else {
      this.updateCurrentPlayerIndex();
      this.togglePlayerNameColor();
    }
  }

  getStartConfirmation() {
    const confirmText = this.blackjackTable.getConfirmText();

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
    const dealerHands = this.blackjackTable.getDealerHands();
    this.blackjackView.addDealerElement(dealerHands);
  }

  loadPlayerDataToView() {
    const playerInfoObjArr = this.blackjackTable.getPlayerInfoObjArr();

    for (const playerInfoObj of playerInfoObjArr) {
      this.blackjackView.addPlayerElement(playerInfoObj);
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

  // 変更必要かも
  skipBlackjackPlayers() {
    const players = this.blackjackTable.getCurrentPlayers();

    for (let i = this.currentPlayerIndex; i < players.length; i++) {
      const player = players[i];
      const playersHands = player.getHands();

      if (player.isBlackjack(playersHands)) {
        player.setToBlackjack();
        this.updatePlayerAndViewState();
      } else {
        break;
      }
    }
  }

  alertUnbetPlayers() {
    const unbetPlayers = this.blackjackTable.getUnbetPlayers();

    alert("ベットが完了していないプレーヤーがいます。" + unbetPlayers);
  }

  startBtnClick() {
    const startBtn = document.getElementById("startBtn");

    startBtn.addEventListener("click", () => {
      if (this.blackjackTable.playersBetsCompleted()) {
        if (this.getStartConfirmation()) {
          // chipsからbetをremoveするメソッド
          this.blackjackTable.removePlayerBetFromChips();
          this.displayGameScreen();
          this.loadDataToView();
          this.togglePlayerNameColor();
          this.callBlackjackEventListener();
          this.skipBlackjackPlayers();
        }
      } else {
        this.alertUnbetPlayers();
      }
    });
  }

  addBetAmount(bet) {
    const betToAdd = this.betAmount + bet;

    if (
      this.blackjackTable.canPlayerBetAtIndex(
        this.selectedPlayerIndex,
        betToAdd
      )
    ) {
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
        this.resetCurrentBet();
        alert("ベット額のリセットを完了しました。");
      } else {
        alert("ベット額のリセットを中止しました。");
      }
    });
  }

  resetCurrentBet() {
    this.changeBetAmount(0);
    this.blackjackTable.resetBetAmount(this.selectedPlayerIndex);
    this.updateBetTotalElement();
  }

  betConfirmBtnClick() {
    const betConfirmBtn = document.getElementById("betConfirmBtn");

    betConfirmBtn.addEventListener("click", () => {
      if (this.betAmount !== 0) {
        if (
          this.blackjackTable.canPlayerBetAtIndex(
            this.selectedPlayerIndex,
            this.betAmount
          )
        ) {
          this.blackjackTable.addPlayerBetAtIndex(
            this.selectedPlayerIndex,
            this.betAmount
          );

          this.updateBetTotalElement();
          alert("ベット完了 : " + String(this.betAmount) + "bet");
        } else {
          this.resetCurrentBet();
          alert("ベット額がマイナス値か、ベット額が所持金を上回ります。");
        }
      }
    });
  }

  updateSelectedPlayerBet() {
    const betTotalEle = document.getElementById("betTotal");

    betTotalEle.addEventListener("change", () => {
      const betTotal = Number(betTotalEle.value);

      if (
        betTotal > 0 &&
        this.blackjackTable.canPlayerBetAtIndex(
          this.selectedPlayerIndex,
          betTotal
        )
      ) {
        this.changeBetAmount(Math.floor(betTotal));
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

      const betData = this.blackjackTable.getPlayerBet(
        this.selectedPlayerIndex
      );

      this.changeBetAmount(betData);
      this.updateBetTotalElement();
    });
  }

  callBetModalEventListeners() {
    this.startBtnClick();
    this.bet5BtnClick();
    this.bet20BtnClick();
    this.bet50BtnClick();
    this.bet100BtnClick();
    this.resetBtnClick();
    this.updateSelectedPlayerBet();
    this.betConfirmBtnClick();
    this.updateSelectedPlayer();

    if (this.gameMode === "ai") this.blackjackTable.betAi();
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
