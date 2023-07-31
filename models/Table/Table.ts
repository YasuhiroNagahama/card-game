import { Card } from "../Card/Card";
import { Deck } from "../Deck/Deck";
import { Player } from "../Player/Player";
import { TableInterface } from "../../interfaces/TableInterface/TableInterface";

export class Table implements TableInterface {
  private gameType: string;
  // private betDenominations: number[];
  // private deck: Deck;
  private players: Player[];
  // private house: Player;
  private turnCounter: number;
  private gamePhase: string;
  private resultLog: string[];
}

export class BlackjackTable extends Table {
  
}