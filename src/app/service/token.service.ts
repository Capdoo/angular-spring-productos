import { Injectable } from "@angular/core";
import { Router } from '@angular/router';

//Seran almacenados en el navegador
const TOKEN_KEY = 'AuthToken';

@Injectable({ 
  providedIn: 'root' 
})

export class TokenService {

  roles: Array<string> = [];

  constructor(private router: Router) { }

  public setToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }

  public isLogged(): boolean {
    if (this.getToken()) {
      return true;
    } 
    return false;
  }

  public getUserName(): string {
    if (!this.isLogged()) {
      return null;
    }
    const token = this.getToken();
    const payload = token.split('.')[1];
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    //Sub es username, lo otro es roles
    const username = values.sub;
    return username;
  }

  public isAdmin(): boolean {
    if (!this.isLogged()) {
      return false;
    }

    const token = this.getToken();
    const payload = token.split('.')[1];
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    const roles = values.roles;

    if (roles.indexOf('ROLE_ADMIN') < 0) {
      return false;
    }
    return true;
  }

  // public getAuthorities(): string[] {
  //   console.log('From token service');
  //   this.roles = [];
  //   if (sessionStorage.getItem(AUTHORITIES_KEY)) {
  //     const auth_keys = sessionStorage.getItem(AUTHORITIES_KEY);
  //     console.log(auth_keys);
  //     JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).forEach((authority:any) => {
  //       this.roles.push(authority.authority);
  //     });
  //   }
  //   return this.roles;
  // }

  public logOut(): void {
    window.localStorage.clear();
    this.router.navigate(['/login']);
  }

}
