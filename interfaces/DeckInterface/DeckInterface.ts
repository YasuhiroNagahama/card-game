import { Card } from "../../models/Card/Card";

export interface DeckInterface {
  initialize(): void;
  setJokerToDeck(): void;
  setDeck(): void;
  shuffle(): void;
  resetDeck(): void;
  drawOne(): Card | undefined;
  getCurrentDeckLength(): number;
  isEmpty(): boolean;
}
