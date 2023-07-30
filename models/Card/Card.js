"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
var Card = /** @class */ (function () {
    function Card(suit, rank) {
        this.suit = suit;
        this.rank = rank;
    }
    Card.prototype.getCardSuit = function () {
        return this.suit;
    };
    Card.prototype.getCardRank = function () {
        return this.rank;
    };
    Card.prototype.getCardRankNumber = function () {
        switch (this.getCardRank()) {
            case "A":
                return 1;
            case "J":
                return 11;
            case "Q":
                return 12;
            case "K":
                return 13;
            case "Joker":
                return 0;
            default:
                return Number(this.getCardRank());
        }
    };
    Card.prototype.getCardRankNumberBlackjack = function () {
        switch (this.getCardRank()) {
            case "A":
                return 1;
            case "J":
            case "Q":
            case "K":
                return 10;
            default:
                return Number(this.getCardRank());
        }
    };
    Card.prototype.print = function () {
        console.log("This suit : " + this.suit);
        console.log("This rank : " + this.rank);
        console.log("This card rank  : " + this.getCardRankNumber());
    };
    return Card;
}());
exports.Card = Card;
// const card: Card = new Card("H", "J");
// console.log(card.getCardSuit());
// console.log(card.getCardRank());
// console.log(card.getCardRankNumber());
// console.log(card.getCardRankNumberBlackjack());
