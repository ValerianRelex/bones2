import { Injectable } from '@angular/core';
import {GameComponent} from "../game/game.component";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  public static readonly WIN = 7;
  public static readonly LOSS = 12;
  winCombo: number[] = [7, 11] ;
  lossCombo: number[] = [2, 8, 12];
  // total!: number;

  constructor() { }

  pointGameShort(point: number) {

  }

  firstShotResult(total: number): number {
    if (this.winCombo.includes(total)) {
      return GameService.WIN;
    }
    if (this.lossCombo.includes(total))
    return GameService.LOSS;
    return total;
  }

  getNumber() {
    return Math.floor((Math.random() * 6) + 1); // от 1 до 6
  }
}
