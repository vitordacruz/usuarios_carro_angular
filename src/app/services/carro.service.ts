import { Carro, CarroInput } from './../models/carro';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario, UsuarioOutputDTO } from '../models/usuario';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarroService {

  private readonly baseUrl = environment.apiUrl + '/cars';

  constructor(private http: HttpClient) {}

  create(data: CarroInput): Observable<CarroInput> {
    return this.http.post<CarroInput>(this.baseUrl, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

}
