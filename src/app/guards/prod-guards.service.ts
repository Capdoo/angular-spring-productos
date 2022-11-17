import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../service/token.service';

@Injectable({
  providedIn: 'root'
})

// Para el acceso de rutas dentro del front, es necesario tener token y roles
export class ProdGuardsService implements CanActivate{

  //User o Admin
  realRol: string;

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRol = route.data.expectedRol;
    const roles = this.tokenService.getAuthorities();

    this.realRol = 'user';
    roles.forEach( rol => {
      if(rol ==  'ROLE_ADMIN'){
        this.realRol = 'admin';
      }
    });

    //Verifica si el rol esperado es el que yo tengo
    //Verifica si existe un token (primero)
    if( !this.tokenService.getToken() || expectedRol.indexOf(this.realRol) == -1){
      this.router.navigate(['/']);
      return false;
    }else{
      return true;
    }

  }
}
