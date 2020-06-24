import { Injectable, OnDestroy } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LocalStorage, LocalStorageService } from 'ngx-store';

interface LoginServiceOptions {
    apiBase: string;
    apiPath?: string;
    authPath?: string;
}

@Injectable()
export class LoginService {

    private apiBase = '';
    private apiPath = '';
    private authPath = 'localhost:8080/usuarios/login';
    private authenticatedSubject = new Subject<any>();

    @LocalStorage() private token: any;
    @LocalStorage() private userData: any;

    constructor(
        private router: Router,
        private http: HttpClient,
        private storage: LocalStorageService
    ) {
    }

    login(username: string, password: string){
        return this.completeRequest(username, password);
    }

    private completeRequest(username?: string, password?: string): Observable<any> {
        let params;
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        params = {
            username: `${username}`,
            password: `${password}`,
        };

        return this.http.post<any>(
            this.authPath, params, httpOptions,
        ).pipe(
            untilDestroyed(this),
            map(response => {
                const token = response.token;
                const user = response.user;

                if (token) {
                    // store username and jwt token in local storage to keep user logged in between page refreshes

                    this.userData = user;
                    this.token = token;

                    // this.authenticatedSubject.next(response['user']);
                    return { isLogged: true, userInfo: user};
                } else {
                    // return false to indicate failed login
                    return { isLogged: false };
                }
            }),
        );
    }

    // logout() {
    //     this.userService.logout().pipe(
    //         untilDestroyed(this),
    //         ).subscribe(() => {
    //             this.revokeToken();
    //             this.router.navigate(['auth'])
    //     });
    // }
}
