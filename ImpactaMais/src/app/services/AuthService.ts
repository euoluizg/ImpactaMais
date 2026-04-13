import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  cadastrarUsuario(usuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/auth/signup`, usuario, { responseType: 'text' });
  }

  validarCodigoRegistro(dados: { email: string, codigo: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/auth/verify-signup`, dados, { responseType: 'text' });
  }

  loginUsuario(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/auth/login`, credentials);
  }
}