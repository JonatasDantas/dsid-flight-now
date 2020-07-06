import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorage } from 'ngx-store';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { map, tap } from 'rxjs/operators';
import { UserService } from './userService';
import { Compra } from '../../models/compra.model';
import { User } from '../../models/usuario.model';
import { environment } from '../../../environments/environment';
import { Flight } from '../../models/flight.model';

@Injectable({
    providedIn: 'root'
})
export class FlightService implements OnDestroy {

    @LocalStorage() token;

    constructor(
        private http: HttpClient,
        private userService: UserService,
    ) { }

    private apiBase = 'http://localhost:4300/';
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        })
    };

    getFlights(exitDate, backDate): Observable<{ flights: any[] }> {
        const apiPath = 'voos';
        const params = {
            exitDate: `${exitDate}`,
            backDate: `${backDate}`,
        };

        return this.http.get<{ flights: any[] }>(
            this.apiBase + apiPath, { ...this.httpOptions, params },
        ).pipe(
            tap(console.log),
            untilDestroyed(this),
            map(response => {
                return response;
            })
        );
    }

    getUserFlights(userId: number) {
        return this.http.get<(Compra & Flight)[]>(
            environment.apiBase + `usuarios/${userId}/voos`,
            {
                headers: {
                    Authorization: 'Bearer ' + this.token
                }
            }
        )
    }

    buyFlight(compra: Compra) {
        return this.http.post<{ compra: Compra, usuario: User }>(
            `${environment.apiBase}usuarios/${this.userService.userData.id}/voos`,
            compra,
            {
                headers: {
                    Authorization: 'Bearer ' + this.token
                }
            }
        )
    }

    ngOnDestroy() { }
}
