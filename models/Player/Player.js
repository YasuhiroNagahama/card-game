"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlackjackPlayer = exports.Player = void 0;
var Card_1 = require("../Card/Card");
var Player = /** @class */ (function () {
    function Player(playerName, playerType, gameType) {
        this.hands = new Array();
        this.playerName = playerName;
        this.playerType = playerType;
        this.gameType = gameType;
        this.initialize();
    }
    Player.prototype.initialize = function () {
        this.winAmounts = 0;
        this.status = "";
    };
    Player.prototype.getCurrentPlayerName = function () {
        return this.playerName;
    };
    Player.prototype.getCurrentPlayerType = function () {
        return this.playerType;
    };
    Player.prototype.getCurrentGameType = function () {
        return this.gameType;
    };
    Player.prototype.getCurrentWinAmounts = function () {
        return this.winAmounts;
    };
    Player.prototype.getCurrentStatus = function () {
        return this.status;
    };
    Player.prototype.getCurrentHands = function () {
        return this.hands;
    };
    Player.prototype.setPlayerStatus = function (currentStatus) {
        this.status = currentStatus;
    };
    Player.prototype.updateWinAmounts = function () {
        this.winAmounts++;
    };
    Player.prototype.addHand = function (card) {
        this.hands.push(card);
    };
    Player.prototype.clearWinAmounts = function () {
        this.winAmounts = 0;
    };
    Player.prototype.clearHands = function () {
        this.hands = [];
    };
    return Player;
}());
exports.Player = Player;
var BlackjackPlayer = /** @class */ (function (_super) {
    __extends(BlackjackPlayer, _super);
    function BlackjackPlayer(playerName, playerType) {
        var _this = _super.call(this, playerName, playerType, "blackjack") || this;
        _this.initialize();
        return _this;
    }
    BlackjackPlayer.prototype.initialize = function () {
        // プレイヤーの種類がディーラーの場合はchipsを無限にする
        var currentPlayerType = _super.prototype.getCurrentPlayerType.call(this);
        this.chips = currentPlayerType === "dealer" ? Infinity : 400;
        this.bets = 0;
        _super.prototype.setPlayerStatus.call(this, "betting");
        this.checkBlackjack();
    };
    BlackjackPlayer.prototype.checkBlackjack = function () {
        var currentHands = _super.prototype.getCurrentHands.call(this);
        var ranks = [];
        for (var _i = 0, currentHands_1 = currentHands; _i < currentHands_1.length; _i++) {
            var hand = currentHands_1[_i];
            ranks.push(hand.getCardRank());
        }
        if ((ranks.includes("A") && ranks.includes("10")) ||
            ranks.includes("J") ||
            ranks.includes("Q") ||
            ranks.includes("K")) {
            _super.prototype.setPlayerStatus.call(this, "blackjack");
        }
    };
    BlackjackPlayer.prototype.getCurrentChips = function () {
        return this.chips;
    };
    BlackjackPlayer.prototype.getCurrentBets = function () {
        return this.bets;
    };
    BlackjackPlayer.prototype.addChips = function (chipsToAdd) {
        this.chips += chipsToAdd;
    };
    BlackjackPlayer.prototype.addBets = function (betsToAdd) {
        this.bets += betsToAdd;
    };
    BlackjackPlayer.prototype.removeChips = function (chipsToRemove) {
        this.chips -= chipsToRemove;
    };
    BlackjackPlayer.prototype.removeBets = function (betsToRemove) {
        this.bets -= betsToRemove;
    };
    BlackjackPlayer.prototype.clearBets = function () {
        this.bets = 0;
    };
    BlackjackPlayer.prototype.hit = function (card) {
        _super.prototype.addHand.call(this, card);
        if (this.isBurst()) {
            this.burst();
        }
    };
    BlackjackPlayer.prototype.stand = function () {
        _super.prototype.setPlayerStatus.call(this, "stand");
    };
    BlackjackPlayer.prototype.surrender = function () {
        this.removeBets(Math.floor(this.bets / 2));
        _super.prototype.setPlayerStatus.call(this, "surrender");
    };
    BlackjackPlayer.prototype.double = function () {
        this.addBets(this.bets);
        _super.prototype.setPlayerStatus.call(this, "double");
    };
    BlackjackPlayer.prototype.insurance = function (dealer) {
        var dealerFirstCardRank = String(dealer.getCurrentHands()[0].getCardRank());
        if (dealerFirstCardRank === "A") {
            this.removeBets(Math.floor(this.getCurrentBets() / 2));
            _super.prototype.setPlayerStatus.call(this, "insurance");
        }
    };
    BlackjackPlayer.prototype.burst = function () {
        _super.prototype.setPlayerStatus.call(this, "burst");
    };
    BlackjackPlayer.prototype.isBlackjack = function () {
        var currentStatus = _super.prototype.getCurrentStatus.call(this);
        return currentStatus === "blackjack";
    };
    BlackjackPlayer.prototype.isBurst = function () {
        var totalScore = this.totalCardsScore();
        return totalScore > 21;
    };
    BlackjackPlayer.prototype.canDouble = function () {
        var currentBets = this.getCurrentBets() * 2;
        var currentChips = this.getCurrentChips();
        return currentBets * 2 < currentChips;
    };
    BlackjackPlayer.prototype.haveTurn = function () {
        var currentStatus = _super.prototype.getCurrentStatus.call(this);
        return currentStatus === "hit";
    };
    BlackjackPlayer.prototype.totalCardsScore = function () {
        var currentHands = _super.prototype.getCurrentHands.call(this);
        var totalScore = 0;
        for (var _i = 0, currentHands_2 = currentHands; _i < currentHands_2.length; _i++) {
            var hand = currentHands_2[_i];
            var cardRank = hand.getCardRankNumberBlackjack();
            totalScore += cardRank;
        }
        return totalScore;
    };
    return BlackjackPlayer;
}(Player));
exports.BlackjackPlayer = BlackjackPlayer;
var dealer = new BlackjackPlayer("dealer", "dealer");
dealer.addHand(new Card_1.Card("H", "A"));
