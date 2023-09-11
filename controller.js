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
var Table_1 = require("./models/Table/Table");
var jsdom_1 = require("jsdom");
{
    var Controller = /** @class */ (function () {
        function Controller() {
        }
        Controller.prototype.updateGameMode = function () {
            var modeSelect = (document.getElementById("modeSelect"));
            var peopleElement = (document.getElementById("peopleSelect"));
            modeSelect.addEventListener("click", function () {
                var currentMode = modeSelect.value;
                if (currentMode === "ai") {
                    peopleElement.style.display = "none";
                }
                else if (currentMode === "player") {
                    peopleElement.style.display = "flex";
                }
            });
        };
        Controller.prototype.selectGameType = function () {
            var startBtn = document.getElementById("startBtn");
            startBtn.addEventListener("click", function () {
                var modeSelect = (document.getElementById("modeSelect"));
                var typeSelect = (document.getElementById("typeSelect"));
                var gameMode = modeSelect.value;
                var gameType = typeSelect.value;
                // vs AI の初期値である 3 を代入
                var playerNumber = 3;
                var dom = jsdom_1.JSDOM.fromFile("index.html");
                console.log(dom);
                if (gameMode === "player") {
                    var playerNumberElements = document.querySelectorAll(".input-people-number");
                    playerNumberElements.forEach(function (playerNumberElement) {
                        if (playerNumberElement.checked)
                            playerNumber = Number(playerNumberElement.value);
                    });
                }
                if (gameType === "blackjack") {
                    var blackjack = new BlackjackController_1(gameMode, playerNumber);
                    blackjack.startBlackjack();
                }
                else {
                    console.log("いつか追加！");
                }
            });
        };
        return Controller;
    }());
    var BlackjackController_1 = /** @class */ (function (_super) {
        __extends(BlackjackController, _super);
        function BlackjackController(gameMode, playerNumber) {
            var _this = _super.call(this) || this;
            _this.playerNumber = 0;
            _this.gameMode = gameMode;
            _this.playerNumber = playerNumber;
            _this.blackJackTable = new Table_1.BlackjackTable(_this.gameMode, _this.playerNumber);
            _this.blackJackTable.print();
            return _this;
        }
        BlackjackController.prototype.startBlackjack = function () { };
        return BlackjackController;
    }(Controller));
    var controller = new Controller();
    controller.updateGameMode();
    controller.selectGameType();
}
