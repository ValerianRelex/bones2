import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

import {User} from "../models/user";
import {GameService} from "../services";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit{

  player: User = {
    balance: 0, name: "", point: 0
  };
  isThrow: boolean = false;
  userWin: boolean = false;
  isPointGame: boolean = false;
  bet!: number;
  craps1!: number;
  craps2!: number;
  total!: number;
  point!: number;

  private querySubscription!: Subscription;

  constructor(private route: ActivatedRoute, private gameService: GameService) { }

  ngOnInit(): void {
    // магия получения значений из одного компонента в другой, с помощью параметров из URL

    this.querySubscription = this.route.queryParams.subscribe(
        (queryParam: any) => {
          this.player.name = queryParam['playerName'];
          this.player.balance = 100;
        }
    );
  }

  GetOutputVal(gameResult: any) {
    console.log('Из дочернего');
    console.log(gameResult);
    this.isPointGame = !this.isPointGame;
    this.isThrow = false;

    if (gameResult) {

      this.player.balance += this.bet * 2; // надо как-то принимать результат поинтГейма
    }
  }

  onSubmitForm(form: NgForm) {
    this.isThrow = true;
    this.reduceBalance();
    this.makeFirstShort();

    if (this.getResultFirstShort() != 0) {
      // тут будет логика запуска компоненты, в которой игра продолжится с поинтом
      this.isPointGame = true;

      console.log('ПоинтГейм!');
      console.log('point = ' + this.point);
      return;
    }

    if (this.userWin) {
      // вывод поздравления!
      console.log('Поздравляю! Победа! === ' + this.point);
      this.player.balance += this.bet * 2; // не забываем о пополнение баланса в случае выигрыша.
      this.userWin = false;
    } else
    {
      // вывод огорчалки и предложение размять косточки еще раз
      console.log('не огорчайся, друг... повезет в следующий раз... разомнем косточки еще разок? === ' + this.point);
    }

    console.log(this.player.balance);
    console.log(this.craps1);
    console.log(this.craps2);
  }

  makeFirstShort() {

    this.craps1 = this.gameService.getNumber();
    this.craps2 = this.gameService.getNumber();
    this.total = this.craps1 + this.craps2;
  }

  getResultFirstShort(): number {

    this.point = this.gameService.firstShotResult(this.total);
    if (this.point === GameService.WIN) {
      this.userWin = true;
      this.point = 0;
    }
    if (this.point === GameService.LOSS) {
      this.userWin = false; // возможно лишнее, далее по логике работы будет видно
      this.point = 0;
    }
    return this.point;
  }

  reduceBalance() {
    // добавить проверку на достаточное количество
    this.player.balance -= this.bet;
  }
}
