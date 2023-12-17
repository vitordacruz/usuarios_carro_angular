import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiInterceptorService implements HttpInterceptor {

  constructor() { }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let api_key = localStorage.getItem("api_key");
    if (api_key) {

      api_key = api_key?.replace('Bearer ', 'bearer ');

      console.log("Usou o Interceptor. key:" + api_key);


      request = request.clone({
        headers: request.headers.set('Authorization', `${api_key}`)
      });

    }

    return next.handle(request);
  }


}
