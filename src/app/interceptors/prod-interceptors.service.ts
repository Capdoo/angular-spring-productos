import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../service/token.service';

@Injectable({
  providedIn: 'root'
})

//Se coloca en medio de la peticion http de front y la recepcion en backend
//Adjunta las credenciales (token) necesarias
export class ProdInterceptorsService implements HttpInterceptor{

  constructor(private tokenService: TokenService) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //Porque es req interceptado
    let intReq = req;
    const token = this.tokenService.getToken();
    if(token != null){
      intReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer '+token)});
    }

    return next.handle(intReq); 
    throw new Error('Method not implemented.');
  }

}

export const interceptorProvider = [{provide: HTTP_INTERCEPTORS, useClass: ProdInterceptorsService, multi: true}];
