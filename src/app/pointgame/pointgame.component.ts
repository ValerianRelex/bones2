import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {GameService} from "../services";
import {Craps} from "../models/craps";
// import {valueReferenceToExpression} from "@angular/compiler-cli/src/ngtsc/annotations/common";

@Component({
  selector: 'app-pointgame',
  templateUrl: './pointgame.component.html',
  styleUrls: ['./pointgame.component.scss']
})

export class PointgameComponent {

  public static readonly WIN_POINT_GAME = 'Поздравляем победителя! Нажмите кнопку ОК - для продолжения игры.';
  public static readonly LOSS_POINT_GAME = 'К сожалению вы проиграли этот раунд. Нажмите кнопку ОК - для продолжения игры.';
  gameResult: any;

  @Input() isPointGame!: boolean;
  @Input() point!: number;
  // craps: Craps = {value1Crap: 0, value2Crap: 0, totalValue: 0};
  craps!: Craps; // без инициализации - js ошибка^ ERROR TypeError: Cannot set properties of undefined (setting 'value1Crap')

  isPointThrow: boolean = false;

  constructor(private gameservice: GameService) {
    this.craps = {value1Crap: 0, value2Crap: 0, totalValue: 0};
  }

  // если до этого была магия, то здесь - совсем чудеса )))
  @Output() outputToParent = new EventEmitter<boolean>();

  sendToParent(gameResult: any) {
    console.log(gameResult);
    this.outputToParent.emit(this.getPointGameResult());
  }

  pointThrow() {
    this.isPointThrow = true;
    this.craps.value1Crap = this.gameservice.getNumber();
    this.craps.value2Crap = this.gameservice.getNumber();
    this.craps.totalValue = this.craps.value1Crap + this.craps.value2Crap;

    if (this.craps.totalValue === 7) {

      this.gameResult = PointgameComponent.LOSS_POINT_GAME;
      this.isPointGame = false;
      return;
    }

    if (this.craps.totalValue === this.point) {

      this.gameResult = PointgameComponent.WIN_POINT_GAME;
      this.isPointGame = false;
      return;
    }

    console.log('Еще бросок!');
  }

  getPointGameResult(): boolean {
    return this.gameResult === PointgameComponent.WIN_POINT_GAME;
  }
}
