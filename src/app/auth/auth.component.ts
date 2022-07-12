import {Component, OnInit} from '@angular/core';
import {CheckRegFormService} from "../services/check-reg-form.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

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
        private authService: AuthService,) {
    }

    loginPlayer() {
        const user = {
            login: this.login,
            password: this.password
        }

        if (this.login=='' || this.login==undefined) {
            this.messageService.show('Введите имя пользователя!', {
                cssClass: 'alert-warning',
                timeout: 5000
            });
            return;
        }

        if (this.password=='' || this.password==undefined) {
            this.messageService.show('Введите пароль!', {
                cssClass: 'alert-warning',
                timeout: 5000
            });
            return;
        }

        this.authService.authPlayer(user)
            .subscribe((data: any) => {
                if (!data.success) {
                    this.messageService.show(data.msg, {
                        cssClass: 'alert-warning',
                        timeout: 5000
                    });
                } else {
                    this.messageService.show("Вы успешно авторизовались!", {
                        cssClass: 'alert-success',
                        timeout: 5000
                    });

                    this.router.navigate(['/game']);
                    this.authService.storePlayer(data.user, data.token);
                }
            });
    }
}
