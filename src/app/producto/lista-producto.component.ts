import { Component, OnInit } from '@angular/core';
import { Producto } from '../models/producto';
import { ProductoService } from '../service/producto.service';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-lista-producto',
  templateUrl: './lista-producto.component.html',
  styleUrls: ['./lista-producto.component.css']
})

export class ListaProductoComponent implements OnInit {

  productos: Producto[] = [];
  roles: string[];

  isAdmin = false;

  constructor(
    private productoService: ProductoService, 
    private toastr: ToastrService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.cargarProductos();

    this.roles = this.tokenService.getAuthorities();
    console.log("Estos roles vienen de token service");
    console.log(this.roles);
    this.roles.forEach( rol => {
      if(rol == 'ROLE_ADMIN'){
        this.isAdmin = true;
      }
    });
  }

  cargarProductos(): void{
    this.productoService.lista().subscribe(
      data => {
        this.productos = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  borrar(id: any){
    this.productoService.delete(id).subscribe(
      data=>{
        this.toastr.success('Producto eliminado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        this.cargarProductos();
      },
      err=>{
        this.toastr.error(err.error.mensaje, 'FAIL', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );

  }

}
