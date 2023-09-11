import { BlackjackTable, Table } from "./models/Table/Table";

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
      const startBtn = <HTMLElement>document.getElementById("startBtn");

      startBtn.addEventListener("click", () => {
        const modeSelect = <HTMLSelectElement>(
          document.getElementById("modeSelect")
        );
        const typeSelect = <HTMLSelectElement>(
          document.getElementById("typeSelect")
        );
        const gameMode: string = modeSelect.value;
        const gameType: string = typeSelect.value;
        // vs AI の初期値である 3 を代入
        let playerNumber: number = 3;

        if (gameMode === "player") {
          const playerNumberElements =
            document.querySelectorAll<HTMLInputElement>(".input-people-number");

          playerNumberElements.forEach((playerNumberElement) => {
            if (playerNumberElement.checked)
              playerNumber = Number(playerNumberElement.value);
          });
        }

        if (gameType === "blackjack") {
          const blackjack: BlackjackController = new BlackjackController(
            gameMode,
            playerNumber
          );
          blackjack.startBlackjack();
        } else {
          console.log("いつか追加！");
        }
      });
    }
  }

  class BlackjackController extends Controller {
    private gameMode: string;
    private playerNumber: number = 0;
    private blackJackTable: BlackjackTable;

    constructor(gameMode: string, playerNumber: number) {
      super();
      this.gameMode = gameMode;
      this.playerNumber = playerNumber;
      this.blackJackTable = new BlackjackTable(
        this.gameMode,
        this.playerNumber
      );

      this.blackJackTable.print();
    }

    public startBlackjack(): void {}
  }

  const controller: Controller = new Controller();
  controller.updateGameMode();
  controller.selectGameType();
}
