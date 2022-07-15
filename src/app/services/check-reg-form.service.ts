import { Injectable } from '@angular/core';
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class CheckRegFormService {

  constructor() { }

  checkPlayer(player: User) {
    console.log('проверка запускается');
    if (!player.name || !player.login || !player.password || !player.email) {
      return false;
    } else
      console.log('проверка пройдена');
      return true;
  }
}
