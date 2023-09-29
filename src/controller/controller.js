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

    // this.switchGameDisplay();
    // this.loadDealerDataToView();
    // this.loadPlayerDataToView();
  }

  betBtnClick() {
    const betBtn = document.getElementById("betBtn");

    betBtn.addEventListener("click", () => {});
  }

  bet5BtnClick() {
    const bet5Btn = document.getElementById("bet5");

    bet5Btn.addEventListener("click", () => {
      console.log(5);
    });
  }

  bet20BtnClick() {
    const bet20Btn = document.getElementById("bet20");

    bet20Btn.addEventListener("click", () => {
      console.log(20);
    });
  }

  bet50BtnClick() {
    const bet50Btn = document.getElementById("bet50");

    bet50Btn.addEventListener("click", () => {
      console.log(50);
    });
  }

  bet100BtnClick() {
    const bet100Btn = document.getElementById("bet100");

    bet100Btn.addEventListener("click", () => {
      console.log(100);
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
