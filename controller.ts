{
  class Controller {
    public updateGameMode(): void {
      const modeSelect = <HTMLSelectElement>(
        document.getElementById("modeSelect")
      );
      const peopleElement = <HTMLInputElement>(
        document.getElementById("peopleSelect")
      );

      modeSelect.addEventListener("click", () => {
        const currentMode: string = modeSelect.value;

        if (currentMode === "ai") {
          peopleElement.style.display = "none";
        } else if (currentMode === "player") {
          peopleElement.style.display = "flex";
        }
      });
    }

    public selectGameType(): void {
      const modeSelect = <HTMLSelectElement>(
        document.getElementById("modeSelect")
      );
      const typeSelect = <HTMLSelectElement>(
        document.getElementById("typeSelect")
      );
      const gameMode: string = modeSelect.value;
      const gameType: string = typeSelect.value;
      let peopleNumber: number = 3;

      if (gameMode === "player") {
        const peopleNumberElements =
          document.querySelectorAll<HTMLInputElement>(".input-people-number");

        peopleNumberElements.forEach((peopleNumberElement) => {
          if (peopleNumberElement.checked)
            peopleNumber = Number(peopleNumberElement.value);
        });
      }

      if (gameType === "blackjack") {
        const blackjack: BlackjackController = new BlackjackController();
        blackjack.startBlackjack();
      } else {
        console.log("いつか追加！");
      }
    }
  }

  class BlackjackController extends Controller {
    public startBlackjack(): void {}
  }

  const controller: Controller = new Controller();
  controller.updateGameMode();
  controller.selectGameType();
}
