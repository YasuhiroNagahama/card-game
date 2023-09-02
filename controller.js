{
    var Controller = /** @class */ (function () {
        function Controller() {
        }
        Controller.prototype.updateGameMode = function () {
            var modeSelect = (document.getElementById("modeSelect"));
            var people = document.getElementById("peopleSelect");
            modeSelect.addEventListener("click", function () {
                var currentMode = modeSelect.value;
                if (currentMode === "ai") {
                    people.style.display = "none";
                }
                else if (currentMode === "player") {
                    people.style.display = "flex";
                }
            });
        };
        return Controller;
    }());
    var controller = new Controller();
    controller.updateGameMode();
}
