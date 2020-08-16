import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { IGetCotacoesRaw, Cotacao, PlacesRaw, PlacesListRaw } from './skyscanner.model';
import { get } from 'http';
import { map } from 'rxjs/operators';
import { tripmock } from '../pages/home/trip.mock';
import { of } from 'rxjs/internal/observable/of';
import { Compra, CompraSkyscanner } from '../models/compra.model';
import { environment } from '../../environments/environment';
import { User } from '../models/usuario.model';


@Injectable({ providedIn: 'root' })
export class SkyscannerService {
  userService: any;
  token: string;

  constructor(private http: HttpClient) { }

  
  readonly headers: HttpHeaders = new HttpHeaders({
    "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
    "x-rapidapi-key": "aad51d7798msh64379b66a9bb4e6p171338jsnfee5f152113d",
    "useQueryString": "true"
  })

  getPlaces(searchTerm: string, pais = 'BR', moeda = 'BRL',) {
    return this.http.get<{Places: PlacesListRaw[]}>(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/${pais}/${moeda}/pt-BR/`, {
      headers: this.headers,
      params: { query: searchTerm }
    }).pipe(map(e => e.Places))
  }

  getMock() {
    return of(Cotacao.fromRaw(tripmock))
  }

  buyFlight(compra: CompraSkyscanner) {
    return this.http.post<{ compra: CompraSkyscanner, usuario: User }>(
        `${environment.apiBase}usuarios/${this.userService.userData.id}/voos`,
        compra,
        {
            headers: {
                Authorization: 'Bearer ' + this.token
            }
        }
    )
}

  getQuotations(
    origemId: string,
    destinoId: string,
    dataSaida: string,
    dataVolta?: string,  
    pais = 'BR',
    moeda = 'BRL',) {

    return this.http
      .get<IGetCotacoesRaw>(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/${pais}/${moeda}/pt-BR/${origemId}/${destinoId}/${dataSaida}` + (dataVolta? `/${dataVolta}` : ''),
        { headers: this.headers })
      .pipe(
        map(e => Cotacao.fromRaw(e))
      )
  }

}