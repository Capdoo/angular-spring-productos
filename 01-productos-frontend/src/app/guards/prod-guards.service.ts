import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../service/token.service';

@Injectable({
  providedIn: 'root'
})

// Para el acceso de rutas dentro del front, es necesario tener token y roles
export class ProdGuardsService implements CanActivate{

  //Es el rol real que se tiene como: User o Admin
  realRol: string;

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    
    //Es el rol que se espera para acceder a la ruta
    const expectedRol = route.data.expectedRol;

    this.realRol = this.tokenService.isAdmin() ? 'admin' : 'user';

    //Verifica si el rol esperado es el que yo tengo
    //Verifica si existe un token (primero)
    if( !this.tokenService.isLogged() || expectedRol.indexOf(this.realRol) < 0){
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
