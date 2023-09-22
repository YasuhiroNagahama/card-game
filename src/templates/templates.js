export const templates = {
  startDisplay: `
  <div id="startDisplay" class="start-display-wrapper">
  <div class="start-display-text-wrapper">
  <p class="start-display-text">Welcome to card game</p>
  </div>
  <div class="select-box-wrapper">
  <ul class="select-box-list">
    <li class="select-box-item">
      <div class="select-box-type-wrapper">
        <label for="mode-select" class="select-box-type">Game Mode</label>
      </div>
      <select id="modeSelectBox" class="game-select game-mode-select">
        <option value="player" class="game-mode">vs Player</option>
        <option value="ai" class="game-mode">vs AI</option>
      </select>
    </li>
    <li class="select-box-item">
      <div class="select-box-type-wrapper">
        <label for="type-select" class="select-box-type">Game Type</label>
      </div>
      <select id="typeSelectBox" class="game-select game-type-select">
        <option value="blackjack" class="game-type">Blackjack</option>
      </select>
    </li>
  </ul>
  </div>
  <div id="playerCount" class="select-player-number-wrapper">
  <div class="player-number-wrapper">
    <input
      type="radio"
      id="two"
      class="input-player-number"
      name="radio"
      value="2"
      checked
    />
    <label for="two" class="player-number">2</label>
  </div>
  <div class="player-number-wrapper">
    <input
      type="radio"
      id="three"
      class="input-player-number"
      name="radio"
      value="3"
    />
    <label for="three" class="player-number">3</label>
  </div>
  </div>
  <div id="startBtn" class="start-btn-wrapper">
  <button class="start-btn">StartGame</button>
  </div>
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
  bets: `
<div class="game-bet-player-name-wrapper">
  <p class="game-bet-player-name">Player_1</p>
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
<div id="betBtn" class="game-bet-confirm-btn-wrapper">
  <button class="game-bet-confirm-btn">Bet</button>
</div>
<div class="game-bet-controller-wrapper">
  <div class="game-bet-reset-btn-wrapper">
    <button class="game-bet-reset-btn">RESET</button>
  </div>
  <div class="game-bet-total-wrapper">
    <p class="game-bet-total">
      Total : <span id="totalBets">0</span>
    </p>
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
