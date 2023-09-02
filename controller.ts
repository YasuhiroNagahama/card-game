{
  class Controller {
    public updateGameMode(): void {
      const modeSelect = <HTMLSelectElement>(
        document.getElementById("modeSelect")
      );
      const people = <HTMLInputElement>document.getElementById("peopleSelect");

      modeSelect.addEventListener("click", () => {
        const currentMode: string = modeSelect.value;

        if (currentMode === "ai") {
          people.style.display = "none";
        } else if(currentMode === "player") {
          people.style.display = "flex";
        }
      });
    }

    public startBlackjack(): void {

    }

    public startGame(): void {
      const modeSelect = <HTMLSelectElement>document.getElementById("modeSelect");
      const typeSelect = <HTMLSelectElement>document.getElementById("typeSelect");

      const gameMode:string = modeSelect.value;
      const gameType: string = typeSelect.value;
    }
  }

  class BlackjackController extends Controller {

  }

  const controller: Controller = new Controller();
  controller.updateGameMode();
}
