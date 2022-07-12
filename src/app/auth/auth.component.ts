import {Component, OnInit} from '@angular/core';
import {CheckRegFormService} from "../services/check-reg-form.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

// import {User} from "../models/user";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
    login: String = '';
    password: String = '';

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

        this.authService.authPlayer(user)
            .subscribe((data: any) => {
                if (!data.success) {
                    this.messageService.show(data.msg, {
                        cssClass: 'alert-warning',
                        timeout: 5000
                    });
                } else {
                    this.messageService.show(data.msg, {
                        cssClass: 'alert-success',
                        timeout: 5000
                    });

                }
            });
    }
}
