import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import {User} from "../models/user";
import { TestDto } from "../models/testDto";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  registerPlayer(user: User) {
    // let headers = new HttpHeaders ({ 'Content-Type': 'application/json' }); // это вариант другой, тоже так можно - может это бест практик?
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json')
    return this.http.post<TestDto>(
      'http://localhost:3000/account/reg',
        user,
        {headers: headers}); // ура, победил, оказывается HttpClient уже возвращает обьект в виде json и ненужно его переопределять
        // либо есть вариант, но в нем нужно явно указывать какой тип будем получать. Официал дока рулит.

        // {headers: headers}).pipe(map((response: any) => response.json())); // возврат ошибки - ERROR TypeError: response.json is not a function
        // {headers: headers}).pipe(map((response: any) => response.json())); // TODO: пробую без мапы - увидеть ошибку (без мапы не принимает обьект)
        // {headers: headers}).map(res => res.json()); // так не работает
  }
}
