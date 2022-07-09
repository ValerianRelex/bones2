import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RulesComponent } from "./rules/rules.component";
import { GameComponent } from "./game/game.component";
import { HellopageComponent } from "./hellopage/hellopage.component";
import {AuthComponent} from "./auth/auth.component";
import {RegComponent} from "./reg/reg.component";

const routes: Routes = [
  {path: '', component: HellopageComponent},
  {path: 'rules', component: RulesComponent},
  {path: 'game', component: GameComponent},
  {path: 'reg', component: RegComponent},
  {path: 'auth', component: AuthComponent},
  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
