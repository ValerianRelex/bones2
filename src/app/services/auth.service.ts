import {Injectable} from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';

import {User} from "../models/user";
import {TestDto} from "../models/testDto";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    player: any;
    token: any;

    constructor(private http: HttpClient) {
    }

    registerPlayer(user: User) {
        // let headers = new HttpHeaders ({ 'Content-Type': 'application/json' }); // это вариант другой, тоже так можно - может это бест практик?
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json')
        return this.http.post<TestDto>(
            'http://localhost:3000/account/reg',
            user,
            {headers: headers});
    }

    authPlayer(user: any) {
        let headers = new HttpHeaders();

        headers.append('Content-Type', 'application/json')
        return this.http.post(
            'http://localhost:3000/account/auth',
            user,
            {headers: headers});
    }

    storePlayer(user: any, token: String) {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token.toString());
        this.player = user;
        this.token = token;
    }

    logout() {
        this.token = null;
        this.player = null;
        localStorage.clear();
    }

    isLogged() {
        console.log('isLogged => ' + localStorage.getItem('token'));
        if (localStorage.getItem('token')!=undefined) {
            return true;
        } else {
            return false;
        }
    }
}
