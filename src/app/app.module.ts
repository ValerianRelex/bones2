import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { RulesComponent } from './rules/rules.component';
import { GameComponent } from './game/game.component';
import { HellopageComponent } from './hellopage/hellopage.component';
import { GameService } from "./services";
import { PointgameComponent } from './pointgame/pointgame.component';
import { ResetInput } from "./directives/reset-input.directive";
import { RegComponent } from './reg/reg.component';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './header/header.component';

import { CheckRegFormService } from "./services/check-reg-form.service";

import { FlashMessagesModule } from "angular2-flash-messages";

@NgModule({
    declarations: [
        AppComponent,
        RulesComponent,
        GameComponent,
        HellopageComponent,
        PointgameComponent,
        ResetInput,
        RegComponent,
        AuthComponent,
        HeaderComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        ReactiveFormsModule,
        FormsModule,
        FlashMessagesModule.forRoot()
    ],
    providers: [GameService, CheckRegFormService],
    bootstrap: [AppComponent]
})
export class AppModule { }
