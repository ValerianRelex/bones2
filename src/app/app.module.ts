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
import {ResetInput} from "./directives/reset-input.directive";

@NgModule({
    declarations: [
        AppComponent, RulesComponent, GameComponent, HellopageComponent, PointgameComponent, ResetInput
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        ReactiveFormsModule,
        FormsModule
    ],
    providers: [GameService],
    bootstrap: [AppComponent]
})
export class AppModule { }
