import {Component} from '@angular/core';
import {CheckRegFormService} from "../services/check-reg-form.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {GameService} from "../services";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
    login: String = '';
    password!: String;

    constructor(
        private checkRegFormService: CheckRegFormService,
        private messageService: FlashMessagesService,
        private router: Router,
        private authService: AuthService,
        private gameService: GameService,
        ){}

    loginPlayer() {
        const user = {
            login: this.login,
            password: this.password
        }

        if (this.login=='' || this.login==undefined) {
            this.messageService.show('Введите имя пользователя!', {
                cssClass: 'alert-warning',
                timeout: 3000
            });
            return;
        }

        if (this.password=='' || this.password==undefined) {
            this.messageService.show('Введите пароль!', {
                cssClass: 'alert-warning',
                timeout: 3000
            });
            return;
        }

        this.authService.authPlayer(user)
            .subscribe((data: any) => {
                if (!data.success) {
                    this.messageService.show(data.msg, {
                        cssClass: 'alert-warning',
                        timeout: 3000
                    });
                } else {
                    this.messageService.show("Вы успешно авторизовались!", {
                        cssClass: 'alert-success',
                        timeout: 2000
                    });

                    this.authService.storePlayer(data.user, data.token); // TODO: здесь зашита основная логика работы с пользователем.

                    console.log(data.user.name);

                    this.gameService.player = {
                        name: data.user.name,
                        point: 0,
                        balance: 100,

                        email: data.user.email,
                        login: data.user.login,
                        password: data.user.password,
                    }

                    this.router.navigate(['game']);
                }
            });
    }
}
