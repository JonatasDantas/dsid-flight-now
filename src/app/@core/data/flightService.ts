import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorage } from 'ngx-store';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { map } from 'rxjs/operators';

@Injectable()
export class FlightService implements OnDestroy {
    constructor(
        private http: HttpClient,
    ) {}

    @LocalStorage() private token: string;

    private apiBase = 'http://localhost:4300/';
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        })
    };

    getFlights(exitDate, backDate): Observable<{flights: any[]}> {
        const apiPath = 'voos';
        const params = {
            exitDate: `${exitDate}`,
            backDate: `${backDate}`,
        };

        return this.http.get<{flights: any[]}>(
            this.apiBase + apiPath, {...this.httpOptions, params},
        ).pipe(
            untilDestroyed(this),
            map(response => {
                return response;
            })
        );
    }

    ngOnDestroy() {}
}
