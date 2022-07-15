import {Component, OnInit} from '@angular/core';
import {User} from "../models/user";
import {CheckRegFormService} from "../services/check-reg-form.service";
import {AuthService} from "../services/auth.service";

import {Router} from "@angular/router"; // для переадресации при регистрации

import {FlashMessagesService} from "angular2-flash-messages";
import {TestDto} from "../models/testDto";

@Component({
    selector: 'app-reg',
    templateUrl: './reg.component.html',
    styleUrls: ['./reg.component.scss']
})
export class RegComponent implements OnInit {
    player!: User;

    constructor(
        private checkRegFormService: CheckRegFormService,
        private messageService: FlashMessagesService,
        private router: Router,
        private authService: AuthService,
    ) {
    }

    ngOnInit(): void {
        this.player = {
            name: '',
            login: '',
            email: '',
            password: '',

            balance: 100,
            point: 0,
        };
    }

    registerNewPlayer() {
        // простая проверка на заполненность формы (со временем можно добавить валидацию по каждому полю)
        if (!this.checkRegFormService.checkPlayer(this.player)) {
            this.messageService.show('Неверно заполнена форма: ', {
                cssClass: 'alert-danger',
                timeout: 4000
            });
            return false;
        }

        this.authService.registerPlayer(this.player)
            .subscribe((data: TestDto) => {
                // success и data.msg - это поля заданные мною самим на бэкэнде в функции отправки коллбека
                if (!data.success) {
                    this.messageService.show(data.msg, {
                        cssClass: 'alert-danger',
                        timeout: 5000
                    });
                    this.router.navigate(['/reg']);
                } else {
                    this.messageService.show(data.msg, {
                        cssClass: 'alert-success',
                        timeout: 5000
                    });
                    this.router.navigate(['/auth']); // при успешной регистрации - на страницу авторизации. Токен уже есть в БД.
                }
            });

        return true;
    }
}
