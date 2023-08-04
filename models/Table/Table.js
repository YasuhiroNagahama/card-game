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
    Table.prototype.getCurrentTurnCounter = function () {
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
    // vs Playerの場合は2人または3人でプレイ可能
    function BlackjackTable(gameMode, playerNames) {
        var _this = _super.call(this, "blackjack") || this;
        // blackjack => 1-3
        _this.playerNames = new Array();
        _this.betDenominations = new Array();
        _this.players = new Array();
        _this.gameMode = gameMode;
        _this.playerNames = playerNames;
        _this.betDenominations = [5, 25, 50, 100];
        _this.initializeBlackjackTable();
        return _this;
    }
    BlackjackTable.prototype.initializeBlackjackTable = function () {
        this.players = new Array();
        this.initializePlayers();
        this.setDealer();
        this.initializePlayersHands();
        this.showPlayersCards();
    };
    BlackjackTable.prototype.initializePlayers = function () {
        if (this.gameMode === "AI") {
            this.setAIPlayers();
        }
        else {
            this.setHumanPlayers();
        }
    };
    BlackjackTable.prototype.setAIPlayers = function () {
        this.setPlayer("Player", "player");
        this.setPlayer("AI", "ai");
        this.setPlayer("AI", "ai");
    };
    BlackjackTable.prototype.setHumanPlayers = function () {
        for (var _i = 0, _a = this.playerNames; _i < _a.length; _i++) {
            var playerName = _a[_i];
            this.setPlayer(playerName, "player");
        }
    };
    BlackjackTable.prototype.setPlayer = function (playerName, playerType) {
        var gameType = _super.prototype.getCurrentGameType.call(this);
        this.players.push(new Player_1.BlackjackPlayer(playerName, playerType, gameType));
    };
    BlackjackTable.prototype.setDealer = function () {
        var gameType = _super.prototype.getCurrentGameType.call(this);
        this.dealer = new Player_1.BlackjackPlayer("Dealer", "dealer", gameType);
    };
    BlackjackTable.prototype.initializePlayersHands = function () {
        for (var _i = 0, _a = this.players; _i < _a.length; _i++) {
            var player = _a[_i];
            for (var i = 0; i < 2; i++) {
                this.setPlayerHands(player);
            }
        }
    };
    BlackjackTable.prototype.clearPlayersCards = function () {
        for (var _i = 0, _a = this.players; _i < _a.length; _i++) {
            var player = _a[_i];
            player.clearHands();
        }
    };
    BlackjackTable.prototype.setPlayerHands = function (player) {
        var newCard = _super.prototype.getCurrentDeck.call(this).drawOne();
        player.addHand(newCard);
    };
    BlackjackTable.prototype.showPlayersCards = function () {
        for (var i = 0; i < this.players.length; i++) {
            this.players[i].showPlayerCards();
            console.log();
        }
    };
    return BlackjackTable;
}(Table));
exports.BlackjackTable = BlackjackTable;
var table = new BlackjackTable("Player", [
    "Naga",
    "Toshi",
    "Sam",
]);
