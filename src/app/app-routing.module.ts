import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RulesComponent} from "./rules/rules.component";
import {GameComponent} from "./game/game.component";
import {AuthComponent} from "./auth/auth.component";
import {RegComponent} from "./reg/reg.component";

import {IsLoggedGuard} from "./isLogged.guard";

const routes: Routes = [
  {path: '', component: RulesComponent},
  {path: 'rules', component: RulesComponent, canActivate: [IsLoggedGuard]},
  {path: 'game', component: GameComponent, canActivate: [IsLoggedGuard]},
  {path: 'reg', component: RegComponent},
  {path: 'auth', component: AuthComponent},
  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
