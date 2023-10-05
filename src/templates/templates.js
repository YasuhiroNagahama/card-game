export const templates = {
  startScreen: `
  <div class="start-screen-text-wrapper">
    <p class="start-screen-text">Welcome to card game</p>
  </div>
  <div class="game-options-select-wrapper">
    <ul class="game-options-select-list">
      <li class="game-options-select-item">
        <div class="game-options-type-wrapper">
          <label for="mode-select" class="game-options-type"
            >Game Mode</label>
        </div>
        <select
          id="gameModeSelect"
          class="game-options-select game-mode-select"
        >
          <option value="player" class="game-mode">vs Player</option>
          <option value="ai" class="game-mode">vs AI</option>
        </select>
      </li>
      <li class="game-options-select-item">
        <div class="game-options-type-wrapper">
          <label for="type-select" class="game-options-type"
            >Game Type</label>
        </div>
        <select
          id="gameTypeSelect"
          class="game-options-select game-type-select"
        >
          <option value="blackjack" class="game-type">Blackjack</option>
        </select>
      </li>
    </ul>
  </div>
  <div id="playerCount" class="game-player-count-inputs-wrapper">
    <div class="game-player-count-input-wrapper">
      <input
        type="radio"
        id="twoPlayer"
        class="game-player-count-input"
        name="radio"
        value="2"
        checked
      />
      <label for="twoPlayer" class="game-player-count">2</label>
    </div>
    <div class="game-player-count-input-wrapper">
      <input
        type="radio"
        id="threePlayer"
        class="game-player-count-input"
        name="radio"
        value="3"
      />
      <label for="threePlayer" class="game-player-count">3</label>
    </div>
  </div>
  <div id="gameStartBtn" class="game-start-btn-wrapper">
    <button class="game-start-btn">StartGame</button>
  </div>
`,
  playerAbout: `<div class="game-player-about-wrapper">
    <p class="game-player-name"></p>
    <span class="game-player-status"></span>
  </div>`,
  playerCards: `<div class="game-player-cards-wrapper">
  <div class="game-player-card">
    <ul class="game-player-card-element-list">
      <li
        id="cardSymbol"
        class="game-card-element-item game-card-img"
      >
      </li>
      <li id="cardNumber" class="game-card-element-item"></li>
    </ul>
  </div>
</div>`,
  playerDetails: ``,
  gameBtn: {
    blackjack: `<div class="game-btn-list-wrapper">
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
  </div>`,
  },
  bet: `
  <div class="game-bet-top-wrapper">
    <div id="startBtn" class="game-bet-start-btn-wrapper">
      <button class="game-bet-start-btn">START</button>
    </div>
    <div class="game-bet-player-select-wrapper">
      <select id="playerSelect" class="game-bet-player-select" name="playerSelect">
      </select>
    </div>
  </div>
  <div class="game-bet-list-wrapper">
    <ul class="game-bet-list">
      <li id="bet5" class="game-bet-item">
        <button class="game-bet-btn">5</button>
      </li>
      <li id="bet20" class="game-bet-item">
        <button class="game-bet-btn">20</button>
      </li>
      <li id="bet50" class="game-bet-item">
        <button class="game-bet-btn">50</button>
      </li>
      <li id="bet100" class="game-bet-item">
        <button class="game-bet-btn">100</button>
      </li>
    </ul>
  </div>
  <div id="betConfirmBtn" class="game-bet-confirm-btn-wrapper">
    <button class="game-bet-confirm-btn">BET</button>
  </div>
  <div class="game-bet-controller-wrapper">
    <div id="resetBetBtn" class="game-bet-reset-btn-wrapper">
      <button class="game-bet-reset-btn">RESET</button>
    </div>
    <div class="game-bet-total-wrapper">
      <p class="game-bet-total">Total</p>
      <input id="betTotal" class="game-bet-input" type="number" min="0" value="0"></input>
    </div>
  </div>
`,
  cardBack: `
<div class="game-player-card">
<ul class="game-card-back-list">
  <li class="game-card-back-item card-back-top">&#x2588;</li>
  <li class="game-card-back-item card-back-bottom">&#x2588;</li>
</ul>
</div>`,
  resultBtn: `<button class="game-result-btn">
  <i class="fa-solid fa-square-poll-horizontal"></i>
</button>`,
  symbol: {
    backMark: "&#x2588;",
  },
};
