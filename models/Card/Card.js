"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
var Card = /** @class */ (function () {
    function Card(suit, rank) {
        this.suit = suit;
        this.rank = rank;
    }
    Object.defineProperty(Card.prototype, "cardSuit", {
        get: function () {
            return this.suit;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card.prototype, "cardRank", {
        get: function () {
            return this.rank;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card.prototype, "cardRankNumber", {
        get: function () {
            switch (this.rank) {
                case "A":
                    return 1;
                case "J":
                    return 11;
                case "Q":
                    return 12;
                case "K":
                    return 13;
                default:
                    return Number(this.rank);
            }
        },
        enumerable: false,
        configurable: true
    });
    Card.prototype.print = function () {
        console.log("This suit : " + this.suit);
        console.log("This rank : " + this.rank);
        console.log("This card rank  : " + this.cardRankNumber);
    };
    Object.defineProperty(Card.prototype, "cardRankNumberBlackjack", {
        // 以下特定のゲームのカードのランクを返す
        get: function () {
            switch (this.rank) {
                case "A":
                    return 1;
                case "J":
                case "Q":
                case "K":
                    return 10;
                default:
                    return Number(this.rank);
            }
        },
        enumerable: false,
        configurable: true
    });
    return Card;
}());
exports.Card = Card;
var card = new Card("H", "J");
card.print();
