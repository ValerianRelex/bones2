import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

import {User} from "../models/user";
import {GameService} from "../services";
import {PointgameComponent} from "../pointgame/pointgame.component";
import {AuthService} from "../services/auth.service";

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameComponent implements OnInit {
    player!: User;
    private querySubscription!: Subscription;

    isThrow: boolean = false;
    incorrectBet: boolean = false;
    isPointGame: boolean = false;

    userWin: boolean = false;
    craps1!: number;
    craps2!: number;
    total!: number;
    point!: number;

    private _bet!: number;

    win: string = PointgameComponent.WIN_POINT_GAME;
    loss: string = PointgameComponent.LOSS_POINT_GAME;

    constructor(
        private route: ActivatedRoute,
        private gameService: GameService,
        private authService: AuthService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.querySubscription = this.route.queryParams.subscribe(
            (queryParam: any) => {
                this.player = {
                    name: queryParam['playerName'],
                    point: 0,
                    balance: 100,

                    email: '',
                    login: '',
                    password: '',
                }
            }
        );

        // если ушел со странички по маршруту, то при возврате нужно заново проинициализировать переменную, дернув значение из сервиса
        if (!this.player.name) {
            console.log('записал 1 - ' + this.gameService.player.name)
            this.player = this.gameService.player;
        } else {
            console.log('записал 2 - ' + this.player.name)
            this.gameService.player = this.player;
        }
    }

    // получение результата поинтГейма из дочернего компонента
    GetOutputVal(gameResult: any) {
        this.isPointGame = !this.isPointGame;
        this.isThrow = false;

        if (gameResult) {
            this.player.balance += this._bet * 2;
        }
    }

    set bet(valueBet: number) {
        if (((this.player.balance - valueBet) < 0) || (valueBet <= 0)) {
            this.incorrectBet = true;
            // в шаблоне выводится варнинг о том, что ставка превышает баланс!
            return;
        }
        this._bet = valueBet;
        this.incorrectBet = false;
    }

    get bet(): number {
        return this._bet;
    }

    onSubmitForm(form: NgForm) {
        if (!this.isBalanceEnough()) {
            return;
        }

        this.userWin = false;
        this.isThrow = true;

        this.reduceBalance();
        this.makeFirstShort();

        if (this.getResultFirstShort() != 0) {
            // логика запуска компоненты, в которой игра продолжится с поинтом
            this.isPointGame = true;
            return;
        }

        if (this.userWin) {
            this.player.balance += this._bet * 2;
        }

        // здесь нужно реализовать логику блокировки кнопки "сделать бросок", до тех пор, пока не будет нажата кнопка ОК
        // которая уведомляет о результате первого броска (когда не начинается поинт-гейм)

    }

    isBalanceEnough(): boolean {
        return this.player.balance > 0;
    }

    makeFirstShort() {
        this.craps1 = this.getNumber();
        this.craps2 = this.getNumber();
        this.total = this.craps1 + this.craps2;
    }

    private getNumber(): number {
        return this.gameService.getNumber();
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
        if (this.isBalanceEnough()) {
            this.player.balance -= this._bet;
            return;
        }
        console.log('БАЛАНС ТЮ_ТЮ! Для продолжения игры - пополните свой баланс...')
    }

    onGameResult() {
        this.isThrow = false;
        // здесь логика проверки баланса и очистка поля, если баланс равен нулю... ну и вывод сообщения о том, что игра закончена
    }

    clickNewGame() {
        this.player.balance = 100;
        this._bet = 0;
        this.router.navigate(['game']);
    }

    clickCancelGame() {
        this.authService.logout();
        this.router.navigate(['reg']);
    }
}
