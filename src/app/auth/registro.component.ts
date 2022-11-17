import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { TokenService } from '../service/token.service';
import { AuthService } from '../service/auth.service';
import { NuevoUsuario } from '../models/nuevo-usuario';

@Component({
    selector: 'app-registro',
    templateUrl: './registro.component.html',
    styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  nuevoUsuario: NuevoUsuario;
  nombre: string;
  nombreUsuario: string;
  email: string;
  password: string;
  errMsj: string;
  isLogged = false;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    //Revisa si estamos logeados
    if(this.tokenService.getToken()){
      this.isLogged = true;
    }
  }

  onRegister(): void{
    this.nuevoUsuario = new NuevoUsuario(this.nombre, this.nombreUsuario, this.email, this.password);
    this.authService.nuevo(this.nuevoUsuario).subscribe(
      data => {
        this.toastr.success('Cuenta creada', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        this.router.navigate(['/login']);
      },
      err => {
        this.errMsj = err.error.mensaje;
        this.toastr.error(err.error.mensaje, 'FAIL', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        console.log(this.errMsj);
      }
    )
  }

}
