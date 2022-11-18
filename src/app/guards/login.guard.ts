import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { TokenService } from '../service/token.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {


  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { }


  //Si el usuario esta logeado pero intenta acceder a la vista de Login se le redirige a Home (Index)
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    
    if (this.tokenService.isLogged()){
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
  
}
