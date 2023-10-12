import { templates } from "../templates/templates.js";

export class View {
  removeDisplay(display) {
    display.remove();
  }

  createStartScreen() {
    const startScreenWrap = document.createElement("div");
    startScreenWrap.id = "startScreen";
    startScreenWrap.classList.add("start-screen-wrapper");

    startScreenWrap.innerHTML = templates.startScreen;

    return startScreenWrap;
  }

  createBetOption(index, number) {
    const betOption = document.createElement("option");
    betOption.classList.add("game-bet-player-option");
    betOption.value = index;
    betOption.innerHTML = "Player_" + number;

    return betOption;
  }

  createGameBetModal() {
    const gameBetModal = document.createElement("div");
    gameBetModal.classList.add("game-bet-modal-wrapper");
    gameBetModal.id = "gameBetModal";

    gameBetModal.innerHTML = templates.bet;

    return gameBetModal;
  }

  createCardBack() {
    const cardBackWrap = document.createElement("div");
    cardBackWrap.classList("game-card-back-wrapper");

    cardBackWrap.innerHTML = templates.cardBack;

    return cardBackWrap;
  }

  createCardFront(card) {
    const playerCard = document.createElement("div");
    playerCard.classList.add("game-player-card");

    playerCard.innerHTML = `
    <ul class="game-player-card-element-list">
      <li
        id="cardSuit"
        class="game-card-element-item game-card-suit"
      >
        ${card.suit}
      </li>
      <li id="cardRank" class="game-card-element-item game-card-rank">
        ${card.rank}
      </li>
    </ul>
    `;

    return playerCard;
  }

  createResultBtn() {
    const resultBtnWrap = document.createElement("div");
    resultBtnWrap.classList.add("game-result-btn-wrapper");
    resultBtnWrap.innerHTML = templates.resultBtn;

    return resultBtnWrap;
  }

  togglePlayerNameColor(index) {
    const playerNameEle = document.querySelectorAll("#playerName")[index];

    playerNameEle.classList.toggle("current-turn-player");
  }

  updatePlayerStatus(index, status) {
    const playerStatus = document.querySelectorAll("#playerStatus")[index];

    playerStatus.innerHTML = status;
  }

  updatePlayerScore(index, score) {
    const playerScore = document.querySelectorAll("#playerScore")[index];
    playerScore.innerHTML = String(score);
  }

  addPlayerCard(index, card) {
    const playerCardsEle = document.querySelectorAll("#playerCards")[index];
    const playerCard = this.createCardFront(card);

    playerCardsEle.append(playerCard);
  }
}

export class BlackjackView extends View {
  constructor() {
    super();
    this.container = document.getElementById("gameContainer");
  }

  createBtnList() {
    const btnListWrap = document.createElement("div");
    btnListWrap.classList.add("game-btn-list-wrapper");

    btnListWrap.innerHTML = `<div class="game-btn-list-wrapper">
    <ul class="game-btn-list">
      <li class="game-btn-item">
        <div id="doubleBtn" class="game-btn-wrapper">
          <button class="game-btn">DOUBLE</button>
        </div>
        <div id="standBtn" class="game-btn-wrapper">
          <button class="game-btn">STAND</button>
        </div>
      </li>
      <li class="game-btn-item">
        <div id="hitBtn" class="game-btn-wrapper">
          <button class="game-btn">HIT</button>
        </div>
        <div id="surrenderBtn" class="game-btn-wrapper">
          <button class="game-btn">SURRENDER</button>
        </div>
      </li>
    </ul>
  </div>`;

    return btnListWrap;
  }

  createPlayersWrap() {
    const playersWrap = document.createElement("div");
    playersWrap.id = "playersWrap";
    playersWrap.classList.add("game-players-wrapper");

    return playersWrap;
  }

  createPlayersInfoWrap() {
    const playersInfoWrap = document.createElement("div");
    playersInfoWrap.id = "playersInfoWrap";
    playersInfoWrap.classList.add(
      "game-players-info-wrapper",
      "player-info-wrapper"
    );

    return playersInfoWrap;
  }

  createDealerElement(dealerHand) {
    const dealerEle = document.createElement("div");
    dealerEle.classList.add("game-player-info-wrapper");

    dealerEle.innerHTML = `<div class="game-player-about-wrapper">
      <p id="dealerName" class="game-player-name">Dealer</p>
      <span id="dealerStatus" class="game-player-status">waiting</span>
    </div>
    <div
      id="dealerCards"
      class="game-player-cards-wrapper dealer-cards"
    >
      <div class="game-player-card">
        <ul class="game-player-card-element-list">
          <li
            id="cardSuit"
            class="game-card-element-item game-card-suit"
          >
          ${dealerHand.suit}
          </li>
          <li id="cardRank" class="game-card-element-item game-card-rank">${dealerHand.rank}</li>
        </ul>
      </div>
      <div class="game-player-card">
        <ul class="game-card-back-list">
          <li class="game-card-back-item card-back-top">&#x2588;</li>
          <li class="game-card-back-item card-back-bottom">&#x2588;</li>
        </ul>
      </div>
    </div>
    <div class="game-player-details-wrapper">
      <div class="game-player-details-list-wrapper">
        <ul class="game-player-details-list">
          <li class="game-player-details-item">
            SCORE : <span id="dealerScore">??</span>
          </li>
        </ul>
      </div>
    </div>`;

    return dealerEle;
  }

  addDealerElement(dealerHand) {
    const playersWrap = document.getElementById("playersWrap");
    const dealerEle = this.createDealerElement(dealerHand);

    playersWrap.prepend(dealerEle);
  }

  addPlayerElement(playerInfo) {
    const playersInfoWrap = document.getElementById("playersInfoWrap");

    const playerInfoWrap = document.createElement("div");
    playerInfoWrap.classList.add(
      "game-player-info-wrapper",
      "player-info-wrapper"
    );

    playerInfoWrap.innerHTML = `<div class="game-player-about-wrapper">
    <p id="playerName" class="game-player-name">${playerInfo.playerName}</p>
    <span id="playerStatus" class="game-player-status">${playerInfo.playerStatus}</span>
  </div>
  <div
    id="playerCards"
    class="game-player-cards-wrapper player-cards"
  >
    <div class="game-player-card">
      <ul class="game-player-card-element-list">
        <li
          id="cardSuit"
          class="game-card-element-item game-card-suit"
        >
          ${playerInfo.playerHands.hand1.suit}
        </li>
        <li id="cardRank" class="game-card-element-item game-card-rank">
          ${playerInfo.playerHands.hand1.rank}
        </li>
      </ul>
    </div>
    <div class="game-player-card">
      <ul class="game-player-card-element-list">
        <li
          id="cardSuit"
          class="game-card-element-item game-card-suit"
        >
          ${playerInfo.playerHands.hand2.suit}
        </li>
        <li id="cardRank" class="game-card-element-item game-card-rank">
          ${playerInfo.playerHands.hand2.rank}
        </li>
      </ul>
    </div>
  </div>
  <div class="game-player-details-wrapper">
    <div class="game-player-details-list-wrapper">
      <ul class="game-player-details-list">
        <li class="game-player-details-item">
          SCORE : <span id="playerScore">${playerInfo.playerScore}</span>
        </li>
        <li class="game-player-details-item">
          BETS : <span id="playerBets">${playerInfo.playerBets}</span>
        </li>
        <li class="game-player-details-item">
          CHIPS : <span id="playerChips">${playerInfo.playerChips}</span>
        </li>
      </ul>
    </div>
  </div>`;

    playersInfoWrap.append(playerInfoWrap);
  }

  addBetOption(playerCount) {
    const playerSelect = document.getElementById("playerSelect");

    for (let i = 0; i < playerCount; i++) {
      const betOption = super.createBetOption(i, i + 1);
      playerSelect.append(betOption);
    }
  }

  addBetModal() {
    const gameBetModal = super.createGameBetModal();

    this.container.prepend(gameBetModal);
  }

  addGameDisplay() {
    const gameDisplayWrap = document.createElement("div");
    gameDisplayWrap.id = "gameDisplay";
    gameDisplayWrap.classList.add("game-display-wrapper");

    const playersWrap = this.createPlayersWrap();
    const playersInfoWrap = this.createPlayersInfoWrap();

    playersWrap.append(playersInfoWrap);

    const resultBtnWrap = super.createResultBtn();
    const btnListWrap = this.createBtnList();

    gameDisplayWrap.append(resultBtnWrap);
    gameDisplayWrap.append(playersWrap);
    gameDisplayWrap.append(btnListWrap);
    this.container.prepend(gameDisplayWrap);
  }

  updateBetTotal(betAmount) {
    const betTotal = document.getElementById("betTotal");

    betTotal.value = betAmount;
    betTotal.innerHTML = betAmount;
  }
}
