import { Injectable } from '@angular/core';
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  public static readonly WIN = 7;
  public static readonly LOSS = 12;
  winCombo: number[] = [7, 11] ;
  lossCombo: number[] = [2, 8, 12];
  private _player!: User;

  constructor() { }

  pointShortResult(point: number, total: number): boolean {
    return point === total;
  }

  firstShotResult(total: number): number {
    if (this.winCombo.includes(total)) {
      return GameService.WIN;
    }
    if (this.lossCombo.includes(total))
    return GameService.LOSS;
    // если дошли до сюда, будет ПоинтГейм
    return total;
  }

  getNumber() {
    return Math.floor((Math.random() * 6) + 1); // от 1 до 6
  }

  get player(): User {
    return this._player;
  }

  set player(value: User) {
    this._player = value;
  }
}