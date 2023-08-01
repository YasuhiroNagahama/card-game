"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deck = void 0;
var Card_1 = require("../Card/Card");
var Deck = /** @class */ (function () {
    function Deck(gameType) {
        this.gameType = gameType;
        this.suits = ["H", "D", "C", "D"];
        this.ranks = [
            "A",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "J",
            "Q",
            "K",
        ];
        this.initialize();
    }
    Deck.prototype.initialize = function () {
        this.cards = [];
        this.joker = true;
        this.setDeck();
    };
    Deck.prototype.setJokerToDeck = function () {
        // 条件が後に増える
        if (this.gameType === "blackjack") {
            this.joker = false;
        }
        else {
            this.cards.push(new Card_1.Card("Joker", "Joker"));
        }
    };
    Deck.prototype.setDeck = function () {
        for (var _i = 0, _a = this.suits; _i < _a.length; _i++) {
            var suit = _a[_i];
            for (var _b = 0, _c = this.ranks; _b < _c.length; _b++) {
                var rank = _c[_b];
                this.cards.push(new Card_1.Card(suit, rank));
            }
        }
        this.setJokerToDeck();
        this.shuffle();
    };
    Deck.prototype.shuffle = function () {
        var _a;
        for (var i = this.cards.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            _a = [this.cards[j], this.cards[i]], this.cards[i] = _a[0], this.cards[j] = _a[1];
        }
    };
    Deck.prototype.resetDeck = function () {
        this.cards = [];
        this.setDeck();
    };
    Deck.prototype.drawOne = function () {
        // 仮の戻り値undefined
        if (this.cards.length <= 0)
            return undefined;
        return this.cards.pop();
    };
    Deck.prototype.getCurrentDeckLength = function () {
        return this.cards.length;
    };
    Deck.prototype.isEmpty = function () {
        return this.cards.length <= 0;
    };
    Deck.prototype.print = function () {
        console.log("This game type : " + this.gameType);
        console.log("This cards : " + this.cards);
        console.log("This suits : " + this.suits);
        console.log("This ranks  : " + this.ranks);
        console.log("This joker  : " + this.joker);
    };
    return Deck;
}());
exports.Deck = Deck;
