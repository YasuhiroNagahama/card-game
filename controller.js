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
            var modeSelect = (document.getElementById("modeSelect"));
            var typeSelect = (document.getElementById("typeSelect"));
            var gameMode = modeSelect.value;
            var gameType = typeSelect.value;
            var peopleNumber = 3;
            if (gameMode === "player") {
                var peopleNumberElements = document.querySelectorAll(".input-people-number");
                peopleNumberElements.forEach(function (peopleNumberElement) {
                    if (peopleNumberElement.checked)
                        peopleNumber = Number(peopleNumberElement.value);
                });
            }
            if (gameType === "blackjack") {
                var blackjack = new BlackjackController_1();
                blackjack.startBlackjack();
                console.log(gameMode);
                console.log(gameType);
                console.log(peopleNumber);
            }
            else {
                console.log("いつか追加！");
            }
        };
        return Controller;
    }());
    var BlackjackController_1 = /** @class */ (function (_super) {
        __extends(BlackjackController, _super);
        function BlackjackController() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BlackjackController.prototype.startBlackjack = function () { };
        return BlackjackController;
    }(Controller));
    var controller = new Controller();
    controller.updateGameMode();
    controller.selectGameType();
}
