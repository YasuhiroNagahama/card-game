import { Card } from "../../models/Card/Card";

export interface PlayerInterface {
  initializePlayer(): void;
  getCurrentPlayerName(): string;
  getCurrentPlayerType(): string;
  getCurrentGameType(): string;
  getCurrentWinAmounts(): number;
  getCurrentStatus(): string;
  getCurrentHands(): Card[];
  setPlayerStatus(currentStatus: string): void;
  updateWinAmounts(): void;
  addHand(card: Card): void;
  clearWinAmounts(): void;
  clearHands(): void;
}
