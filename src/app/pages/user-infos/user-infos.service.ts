import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User, UserPut } from '../../models/usuario.model';
import { environment } from '../../../environments/environment';
import { LocalStorage } from 'ngx-store';

@Injectable({
  providedIn: 'root'
})
export class UserInfosService {

  @LocalStorage() token;

  constructor(private http: HttpClient) {

  }

  public dispatchInfos(user: UserPut, id: number) {
    return this.http.put<User>(environment.apiBase + 'usuarios/' + id, user)
  }

}