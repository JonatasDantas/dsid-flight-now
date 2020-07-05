import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { User } from '../../../../models/usuario.model';
import { UserService } from '../../../../@core/data/userService';

@Injectable({
  providedIn: 'root'
}) 
export class GetCreditsService {

  constructor(private http: HttpClient, private userService: UserService) { }

  PostCredits(credits: number) {
    return this.http.post<User>(
      `${environment.apiBase}usuarios/${this.userService.userData.id}/creditos`,
      {
        credits
      }
    )
  }

}