import { Table, BlackjackTable } from "../models/table.js";
import { View, BlackjackView } from "../view/view.js";

class Controller {
  constructor() {
    this.gameMode = "player";
    this.gameType = "blackjack";
    this.playerNumber = 2;

    this.initialize();
  }

  initialize() {
    this.updateGameMode();
    this.updateGameType();
    this.updatePlayerNumber();
    this.selectGameType();
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
    const modeSelectBox = document.getElementById("modeSelectBox");

    modeSelectBox.addEventListener("change", () => {
      this.gameMode = modeSelectBox.value;

      if (this.gameMode === "ai") {
        this.hiddenPlayerCount();
        this.playerNumber = 3;
      } else {
        this.displayPlayerCount();
      }
    });
  }

  updateGameType() {
    const typeSelectBox = document.getElementById("typeSelectBox");

    typeSelectBox.addEventListener("change", () => {
      this.gameType = typeSelectBox.value;
    });
  }

  updatePlayerNumber() {
    const playerNumberElements = document.querySelectorAll(
      ".input-player-number"
    );

    playerNumberElements.forEach((playerNumberElement) => {
      playerNumberElement.addEventListener("change", () => {
        this.playerNumber = Number(playerNumberElement.value);
      });
    });
  }

  selectGameType() {
    const startBtn = document.getElementById("startBtn");

    startBtn.addEventListener("click", () => {
      if (this.gameType === "blackjack") {
        const blackjack = new BlackjackController(
          this.gameMode,
          this.playerNumber
        );
      } else {
        console.log("いつか追加！");
      }
    });
  }

  print() {
    console.log("\n");
    console.log("This game mode : " + this.gameMode);
    console.log("This game type : " + this.gameType);
    console.log("This player number : " + this.playerNumber);
  }
}

class BlackjackController {
  constructor(gameMode, playerNumber) {
    this.gameMode = gameMode;
    this.playerNumber = playerNumber;
    this.currentPlayerIndex = 0;
    this.selectedPlayerIndex = 0;
    this.betsTotal = 0;
    this.blackJackTable = new BlackjackTable(this.gameMode, this.playerNumber);
    this.blackjackView = new BlackjackView();

    this.startBlackjack();
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

  removeStartDisplay() {
    this.blackjackView.removeStartDisplay();
  }

  processBet() {
    this.blackjackView.addBetsModal();

    if (this.gameMode === "ai") {
      this.blackjackView.addBetsOption(1);
    } else {
      this.blackjackView.addBetsOption(this.playerNumber);
    }

    this.blackjackStartBtnClick();
    this.updateSelectedPlayer();
    this.updatePlayerBets();
    this.resetBtnClick();
    this.bet5BtnClick();
    this.bet20BtnClick();
    this.bet50BtnClick();
    this.bet100BtnClick();
    this.betBtnClick();
  }

  switchGameDisplay() {
    this.blackjackView.addGameDisplay();
  }

  startBlackjack() {
    this.removeStartDisplay();
    this.processBet();
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

  blackjackStartBtnClick() {
    const blackjackStartBtn = document.getElementById("blackjackStartBtn");

    blackjackStartBtn.addEventListener("click", () => {
      if (this.playersBetsCompleted()) {
        const gameBetWrap = document.getElementById("gameBetWrap");
        this.blackjackView.removeDisplay(gameBetWrap);
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

      this.betsTotal = currentPlayer.getCurrentBets();

      this.updateBetsTotalElement();
    });
  }

  updatePlayerBets() {
    const betsTotal = document.getElementById("betsTotal");

    betsTotal.addEventListener("change", () => {
      const currentPlayer =
        this.blackJackTable.getCurrentPlayers()[this.selectedPlayerIndex];

      this.betsTotal = Number(betsTotal.value);
    });
  }

  updateBetsTotalElement() {
    this.blackjackView.updateBetsTotal(this.betsTotal);
  }

  betBtnClick() {
    const betBtn = document.getElementById("betBtn");

    betBtn.addEventListener("click", () => {
      const currentPlayer =
        this.blackJackTable.getCurrentPlayers()[this.selectedPlayerIndex];

      if (currentPlayer.canBets(this.betsTotal)) {
        currentPlayer.addBets(this.betsTotal);

        this.updateBetsTotalElement();

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
        const currentPlayer =
          this.blackJackTable.getCurrentPlayers()[this.selectedPlayerIndex];

        currentPlayer.initializeBets();

        this.blackjackView.updateBetsTotal(
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
      this.betsTotal += 5;

      this.updateBetsTotalElement();
    });
  }

  bet20BtnClick() {
    const bet20Btn = document.getElementById("bet20");

    bet20Btn.addEventListener("click", () => {
      this.betsTotal += 20;

      this.updateBetsTotalElement();
    });
  }

  bet50BtnClick() {
    const bet50Btn = document.getElementById("bet50");

    bet50Btn.addEventListener("click", () => {
      this.betsTotal += 50;

      this.updateBetsTotalElement();
    });
  }

  bet100BtnClick() {
    const bet100Btn = document.getElementById("bet100");

    bet100Btn.addEventListener("click", () => {
      this.betsTotal += 100;
      this.updateBetsTotalElement();
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
}

const controller = new Controller();
