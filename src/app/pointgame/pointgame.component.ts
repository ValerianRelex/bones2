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

  @Output() outputToParent = new EventEmitter<string>();
  sendToParent() {
    console.log('aaaaaaaa');
    this.outputToParent.emit();
  }

  pointThrow() {
    this.isPointThrow = true;
    this.craps.value1Crap = this.gameservice.getNumber();
    console.log('кубик1 = ' + this.craps.value1Crap);
    this.craps.value2Crap = this.gameservice.getNumber();
    console.log('кубик2 = ' + this.craps.value2Crap);
    this.craps.totalValue = this.craps.value1Crap + this.craps.value2Crap;
    console.log('сумма чисел = ' + this.craps.totalValue);

    console.log('zzz');

    if (this.craps.totalValue === 7) {
      console.log('Вы проиграли! ');

      this.gameResult = PointgameComponent.LOSS_POINT_GAME;
      // this.isPointThrow = false; // вынести повторяющийся код в отдельный метод типа - endPointGame
      this.isPointGame = false;
      return;
    }
    if (this.craps.totalValue === this.point) {
      console.log('Вы победили! ');

      this.gameResult = PointgameComponent.WIN_POINT_GAME;
      // this.isPointThrow = false;
      this.isPointGame = false;
      return;
    }

    console.log('Еще бросок!');
  }
}
