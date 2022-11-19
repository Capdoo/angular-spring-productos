import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { NuevoUsuario } from '../models/nuevo-usuario';
import { Observable } from 'rxjs';
import { LoginUsuario } from "../models/login-usuario";
import { JwtDTO } from "../models/jwt-dto";
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {

  authURL = environment.authURL;

  constructor(private httpClient: HttpClient) {
  }

  public nuevo(nuevoUsuario: NuevoUsuario): Observable<any> {
    const url = `${this.authURL}/nuevo`;
    return this.httpClient.post<any>(url, nuevoUsuario);

  }

  public login(loginUsuario: LoginUsuario): Observable<JwtDTO> {
    const url = `${this.authURL}/login`;
    return this.httpClient.post<JwtDTO>(url, loginUsuario);
  }

  public refresh(jwtDto: JwtDTO): Observable<JwtDTO> {
    const url = `${this.authURL}/refresh`;
    return this.httpClient.post<JwtDTO>(url, jwtDto);
  }


}
