import { Injectable } from "@angular/core";
import { LocalStorage } from 'ngx-store';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor{
  @LocalStorage() token

 intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   const newReq = req.clone({
    headers: req.headers.set(
      'Authorization', 'Bearer ' + this.token
    )
   })
   return next.handle(newReq);
  }
  

  
}