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
exports.BlackjackTable = exports.Table = void 0;
var Deck_1 = require("../Deck/Deck");
var Player_1 = require("../Player/Player");
var Table = /** @class */ (function () {
    function Table(gameType) {
        this.resultLog = new Array();
        this.gameType = gameType;
        this.initializeTable();
    }
    Table.prototype.initializeTable = function () {
        this.deck = new Deck_1.Deck(this.gameType);
        this.turnCounter = 0;
        this.gamePhase = "";
    };
    Table.prototype.getCurrentGameType = function () {
        return this.gameType;
    };
    Table.prototype.getCurrentDeck = function () {
        return this.deck;
    };
    Table.prototype.getCurrentTurn = function () {
        return this.turnCounter;
    };
    Table.prototype.getCurrentGamePhase = function () {
        return this.gamePhase;
    };
    Table.prototype.getCurrentResultLog = function () {
        return this.resultLog;
    };
    return Table;
}());
exports.Table = Table;
var BlackjackTable = /** @class */ (function (_super) {
    __extends(BlackjackTable, _super);
    function BlackjackTable(gameMode, playerNumber) {
        var _this = _super.call(this, "blackjack") || this;
        _this.playerNumber = 0;
        _this.betDenominations = new Array();
        _this.players = new Array();
        _this.gameMode = gameMode;
        _this.playerNumber = playerNumber;
        _this.betDenominations = [5, 25, 50, 100];
        _this.initializeBlackjackTable();
        return _this;
    }
    BlackjackTable.prototype.initializeBlackjackTable = function () {
        this.players = new Array();
        this.initializePlayers();
        this.setDealer();
        this.initializePlayersHands();
    };
    BlackjackTable.prototype.setPlayer = function (playerName, playerType) {
        var gameType = _super.prototype.getCurrentGameType.call(this);
        this.players.push(new Player_1.BlackjackPlayer(playerName, playerType, gameType));
    };
    BlackjackTable.prototype.setAIPlayers = function () {
        this.setPlayer("Player", "player");
        this.setPlayer("AI", "ai");
        this.setPlayer("AI", "ai");
    };
    BlackjackTable.prototype.setHumanPlayers = function () {
        for (var i = 1; i <= this.playerNumber; i++) {
            this.setPlayer("Player_" + String(i), "player");
        }
    };
    BlackjackTable.prototype.initializePlayers = function () {
        if (this.gameMode === "ai") {
            this.setAIPlayers();
        }
        else {
            this.setHumanPlayers();
        }
    };
    BlackjackTable.prototype.setDealer = function () {
        var gameType = _super.prototype.getCurrentGameType.call(this);
        this.dealer = new Player_1.BlackjackPlayer("Dealer", "dealer", gameType);
    };
    BlackjackTable.prototype.setPlayerHands = function (player) {
        var newCard = _super.prototype.getCurrentDeck.call(this).drawOne();
        player.addHand(newCard);
    };
    BlackjackTable.prototype.initializePlayersHands = function () {
        for (var _i = 0, _a = this.players; _i < _a.length; _i++) {
            var player = _a[_i];
            for (var i = 0; i < 2; i++) {
                this.setPlayerHands(player);
            }
        }
        for (var i = 0; i < 2; i++) {
            this.setPlayerHands(this.dealer);
        }
    };
    BlackjackTable.prototype.clearPlayersBets = function () {
        for (var _i = 0, _a = this.players; _i < _a.length; _i++) {
            var player = _a[_i];
            player.clearBets();
        }
    };
    BlackjackTable.prototype.clearPlayersCards = function () {
        for (var _i = 0, _a = this.players; _i < _a.length; _i++) {
            var player = _a[_i];
            player.clearHands();
        }
    };
    BlackjackTable.prototype.allPlayerActionsResolved = function () {
        for (var _i = 0, _a = this.players; _i < _a.length; _i++) {
            var player = _a[_i];
            var currentPlayerStatus = player.getCurrentStatus();
            // doubleの時もfalseかも
            if (currentPlayerStatus == "betting" || currentPlayerStatus == "hit")
                return false;
        }
        return true;
    };
    BlackjackTable.prototype.addPlayerBets = function (player, bets) {
        player.addBets(bets);
    };
    BlackjackTable.prototype.removePlayerBets = function (player, bets) {
        player.removeBets(bets);
    };
    BlackjackTable.prototype.addPlayerChips = function (player, chips) {
        player.addChips(chips);
    };
    BlackjackTable.prototype.removePlayerChips = function (player, chips) {
        player.removeChips(chips);
    };
    BlackjackTable.prototype.canUpdatePlayerBet = function (player) {
        var currentPlayerBets = player.getCurrentBets();
        var currentPlayerChips = player.getCurrentChips();
        return currentPlayerBets < currentPlayerChips;
    };
    BlackjackTable.prototype.getCurrentGameMode = function () {
        return this.gameMode;
    };
    BlackjackTable.prototype.getCurrentPlayerNumber = function () {
        return this.playerNumber;
    };
    BlackjackTable.prototype.getCurrentBetDenominations = function () {
        return this.betDenominations;
    };
    BlackjackTable.prototype.print = function () {
        console.log("----- Start Game -----");
        console.log();
        console.log("This game type : " + _super.prototype.getCurrentGameType.call(this));
        console.log("This game deck : " + _super.prototype.getCurrentDeck.call(this));
        console.log("This game turn : " + _super.prototype.getCurrentTurn.call(this));
        console.log("This game mode : " + this.getCurrentGameMode());
        console.log("This game player number : " + this.getCurrentPlayerNumber());
        console.log("This game bet denominations : " + this.getCurrentBetDenominations());
        console.log();
        console.log("----- Players -----");
        console.log();
        var i = 1;
        this.players.forEach(function (player) {
            console.log("Player_" + i);
            console.log();
            player.print();
            console.log();
            i++;
        });
        console.log("----- Dealer -----");
        console.log();
        this.dealer.print();
        console.log();
    };
    return BlackjackTable;
}(Table));
exports.BlackjackTable = BlackjackTable;
