import { Injectable, OnDestroy } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LocalStorage, LocalStorageService } from 'ngx-store';
import { User } from '../../models/usuario.model';

interface userServiceOptions {
    apiBase: string;
    apiPath?: string;
    authPath?: string;
}

@Injectable()
export class UserService implements OnDestroy {
    constructor(
        private http: HttpClient,
    ) {}

    private apiBase = 'http://localhost:4300/';
    private apiPath = '';
    private authenticatedSubject = new Subject<any>();
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        })
    };

    @LocalStorage() private token: string;
    @LocalStorage() public userData: User;

    login(username?: string, password?: string): Observable<{isLogged: boolean, userInfo?: User}> {
        let apiPath = 'usuarios/login';
        let params;

        params = {
            username: `${username}`,
            password: `${password}`,
        };

        return this.http.post<{token: string, user:User}>(
            this.apiBase + apiPath, params, this.httpOptions,
        ).pipe(
            untilDestroyed(this),
            map(response => {
                const token = response.token;
                const user = response.user;

                if (token) {
                    // store username and jwt token in local storage to keep user logged in between page refreshes

                    this.userData = user;
                    this.token = token;

                    return { isLogged: true, userInfo: user};
                } else {
                    // return false to indicate failed login
                    return { isLogged: false };
                }
            }),
        );
    }

    upsert(data: any) :Observable<any> {
        let apiPath = 'usuarios';

        return this.http.post<any>(
            this.apiBase + apiPath, data, this.httpOptions, 
        ).pipe(
            untilDestroyed(this),
            map(response => {
                return response;
            })
        )
    }

    logout() {
        this.token = undefined;
        this.userData = undefined;
    }

    ngOnDestroy() {}
}
