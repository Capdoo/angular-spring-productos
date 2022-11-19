import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, concatMap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { TokenService } from '../service/token.service';
import { ToastrService } from 'ngx-toastr';
import { JwtDTO } from '../models/jwt-dto';
import { AuthService } from '../service/auth.service';

const AUTHORIZATION = 'Authorization';

@Injectable({
  providedIn: 'root'
})

//Se coloca en medio de la peticion http de front y la recepcion en backend
//Adjunta las credenciales (token) necesarias
export class ProdInterceptorsService implements HttpInterceptor{

  constructor(private tokenService: TokenService, 
    private toastr: ToastrService,
    private authService: AuthService
    ) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
    if(!this.tokenService.isLogged()){
      return next.handle(req);
    }
  
    //Porque es req interceptado
    let intReq = req;
    const token = this.tokenService.getToken();
    intReq = this.addToken(req, token);
    
    return next.handle(intReq).pipe(catchError((err: HttpErrorResponse) => {
      if(err.status === 401){
        //Necesitamos un dto para enviar al servidor
        const dto: JwtDTO = new JwtDTO(this.tokenService.getToken());
        return this.authService.refresh(dto).pipe(
          //Se realiza el pipe-concat map para ordenar la ejecucion de los observables
          concatMap((data: any) => {
            console.log('refreshing ...');
            this.tokenService.setToken(data.token);
            intReq = this.addToken(req, data.token);
            return next.handle(intReq);
          })
        );
      }else{
        this.tokenService.logOut();
        return throwError(err);
      }

    })); 
  }


  //Metodo para formatear el token a enviar al servidor
  private addToken(req: HttpRequest<any>, token: string): HttpRequest<any>{
    return req.clone({ headers: req.headers.set(AUTHORIZATION, 'Bearer '+token)}); 
  } 


}

export const interceptorProvider = [{provide: HTTP_INTERCEPTORS, useClass: ProdInterceptorsService, multi: true}];
