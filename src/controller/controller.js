import { Table, BlackjackTable } from "../models/table.js";
import { View, BlackjackView } from "../view/view.js";

class Controller {
  constructor() {
    this.gameMode = "player";
    this.gameType = "blackjack";
    this.playerCount = 2;

    this.initialize();
  }

  hiddenPlayerCount() {
    const playerCountEle = document.getElementById("playerCount");

    playerCountEle.style.display = "none";
  }

  displayPlayerCount() {
    const playerCountEle = document.getElementById("playerCount");

    playerCountEle.style.display = "flex";
  }

  updateGameMode() {
    const gameModeSelect = document.getElementById("gameModeSelect");

    gameModeSelect.addEventListener("change", () => {
      this.gameMode = gameModeSelect.value;

      if (this.gameMode === "ai") {
        this.hiddenPlayerCount();
        this.playerCount = 3;
      } else {
        this.displayPlayerCount();

        const playerCountsEle = document.querySelectorAll(
          ".game-player-count-input"
        );

        playerCountsEle.forEach((playerCountEle) => {
          if (playerCountEle.checked)
            this.playerCount = Number(playerCountEle.value);
        });
      }
    });
  }

  updateGameType() {
    const gameTypeSelect = document.getElementById("gameTypeSelect");

    gameTypeSelect.addEventListener("change", () => {
      this.gameType = gameTypeSelect.value;
    });
  }

  updatePlayerCount() {
    const playerCountsEle = document.querySelectorAll(
      ".game-player-count-input"
    );

    playerCountsEle.forEach((playerCountEle) => {
      playerCountEle.addEventListener("change", () => {
        this.playerCount = Number(playerCountEle.value);
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
    this.updateGameMode();
    this.updateGameType();
    this.updatePlayerCount();
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
    this.selectedPlayerIndex = 0;
    this.betAmount = 0;
    this.blackJackTable = new BlackjackTable(this.gameMode, this.playerCount);
    this.blackjackView = new BlackjackView();

    this.displayBetScreen();
  }

  loadDealerDataToView() {
    const dealer = this.blackJackTable.getCurrentDealer();
    const dealerHand = dealer.getCurrentHands()[0].getCardInfoObj();
    this.blackjackView.addDealerElement(dealerHand);
  }

  loadPlayerDataToView() {
    const players = this.blackJackTable.getCurrentPlayers();

    for (const player of players) {
      const playerInfo = {
        playerName: player.getCurrentPlayerName(),
        playerStatus: player.getCurrentStatus(),
        playerHands: {
          hand1: player.getCurrentHands()[0].getCardInfoObj(),
          hand2: player.getCurrentHands()[1].getCardInfoObj(),
        },
        playerChips: player.getCurrentChips(),
        playerBets: player.getCurrentBets(),
        playerScore: player.getTotalHandsScore(),
      };

      this.blackjackView.addPlayerElement(playerInfo);
    }
  }

  switchGameDisplay() {
    this.blackjackView.addGameDisplay();
  }

  playersBetsCompleted() {
    const players = this.blackJackTable.getCurrentPlayers();

    for (const player of players) {
      if (!player.isBetCompleted()) {
        return false;
      }
    }

    return true;
  }

  startBtnClick() {
    const startBtn = document.getElementById("startBtn");

    startBtn.addEventListener("click", () => {
      if (this.playersBetsCompleted()) {
        const gameBetModal = document.getElementById("gameBetModal");
        this.blackjackView.removeDisplay(gameBetModal);
        this.switchGameDisplay();
        this.loadDealerDataToView();
        this.loadPlayerDataToView();
      } else {
        alert(
          "ベットが完了していないプレーヤーがいます。(ベット額は0以上にして下さい。)"
        );
      }
    });
  }

  updateSelectedPlayer() {
    const betsSelect = document.getElementById("playerSelect");

    betsSelect.addEventListener("change", () => {
      const playerIndex = Number(betsSelect.value);

      this.selectedPlayerIndex = playerIndex;

      const currentPlayer =
        this.blackJackTable.getCurrentPlayers()[this.selectedPlayerIndex];

      this.betAmount = currentPlayer.getCurrentBets();

      this.updateBetTotalElement();
    });
  }

  updatePlayerBets() {
    const betTotal = document.getElementById("betTotal");

    betTotal.addEventListener("change", () => {
      const currentPlayer =
        this.blackJackTable.getCurrentPlayers()[this.selectedPlayerIndex];

      this.betAmount = Number(betTotal.value);
    });
  }

  updateBetTotalElement() {
    this.blackjackView.updateBetTotal(this.betAmount);
  }

  betConfirmBtnClick() {
    const betConfirmBtn = document.getElementById("betConfirmBtn");

    betConfirmBtn.addEventListener("click", () => {
      const currentPlayer =
        this.blackJackTable.getCurrentPlayers()[this.selectedPlayerIndex];

      if (currentPlayer.canBets(this.betAmount)) {
        currentPlayer.addBets(this.betAmount);

        this.updateBetTotalElement();

        console.log(currentPlayer.getCurrentBets());
      } else {
        alert("ベッド額がマイナス値か、ベッド額の合計が所持金を上回ります。");
      }
    });
  }

  resetBtnClick() {
    const resetBetBtn = document.getElementById("resetBetBtn");

    resetBetBtn.addEventListener("click", () => {
      if (confirm("ベッド額をリセットしますか？")) {
        this.betAmount = 0;

        const currentPlayer =
          this.blackJackTable.getCurrentPlayers()[this.selectedPlayerIndex];

        currentPlayer.initializeBets();

        this.blackjackView.updateBetTotal(
          String(currentPlayer.getCurrentBets())
        );

        alert("ベッド額のリセットを完了しました。");
      } else {
        alert("ベッド額のリセットを中止しました。");
      }
    });
  }

  bet5BtnClick() {
    const bet5Btn = document.getElementById("bet5");

    bet5Btn.addEventListener("click", () => {
      this.betAmount += 5;

      this.updateBetTotalElement();
    });
  }

  bet20BtnClick() {
    const bet20Btn = document.getElementById("bet20");

    bet20Btn.addEventListener("click", () => {
      this.betAmount += 20;

      this.updateBetTotalElement();
    });
  }

  bet50BtnClick() {
    const bet50Btn = document.getElementById("bet50");

    bet50Btn.addEventListener("click", () => {
      this.betAmount += 50;

      this.updateBetTotalElement();
    });
  }

  bet100BtnClick() {
    const bet100Btn = document.getElementById("bet100");

    bet100Btn.addEventListener("click", () => {
      this.betAmount += 100;
      this.updateBetTotalElement();
    });
  }

  hitBtnClick() {
    const hitBtn = document.getElementById("hitBtn");

    hitBtn.addEventListener("click", () => {
      console.log("push hit btn");
    });
  }

  doubleBtnClick() {
    const doubleBtn = document.getElementById("doubleBtn");

    doubleBtn.addEventListener("click", () => {
      console.log("push double btn");
    });
  }

  standBtnClick() {
    const standBtn = document.getElementById("standBtn");

    standBtn.addEventListener("click", () => {
      console.log("push stand btn");
    });
  }

  surrenderBtnClick() {
    const surrenderBtn = document.getElementById("surrenderBtn");

    surrenderBtn.addEventListener("click", () => {
      console.log("push surrender btn");
    });
  }

  removeStartScreen() {
    this.blackjackView.removeStartScreen();
  }

  processBet() {
    this.blackjackView.addBetModal();

    if (this.gameMode === "ai") {
      this.blackjackView.addBetOption(1);
    } else {
      this.blackjackView.addBetOption(this.playerCount);
    }

    this.startBtnClick();
    this.bet5BtnClick();
    this.bet20BtnClick();
    this.bet50BtnClick();
    this.bet100BtnClick();
    this.resetBtnClick();
    this.updatePlayerBets();
    this.betConfirmBtnClick();
    this.updateSelectedPlayer();
  }

  displayBetScreen() {
    this.removeStartScreen();
    this.processBet();
  }
}

const controller = new Controller();
