import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario, UsuarioOutputDTO } from '../models/usuario';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly baseUrl = environment.apiUrl + '/users';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.baseUrl);
  }

  getByLogin(login:string): Observable<Usuario[]> {

    login = login.trim();

    const parms = { params: new HttpParams().set('login', login) };

    return this.http.get<Usuario[]>(this.baseUrl, parms);

  }

  get(id: number): Observable<UsuarioOutputDTO> {
    return this.http.get<UsuarioOutputDTO>(`${this.baseUrl}/${id}`);
  }

  create(data: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.baseUrl, data);
  }

  update(id: number, data: any): Observable<UsuarioOutputDTO> {
    return this.http.put<UsuarioOutputDTO>(`${this.baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  logar(login:string, password:string): Observable<LoginResponse> {
    const data = { login, password };
    console.log('data', data);
    return this.http.post<LoginResponse>(environment.apiUrl + "/signin", data);
  }

  getMe(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + '/me');
  }

}

export class LoginResponse {
  content: string = "";
}
