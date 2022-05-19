import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})

export class ProductoService {

  productoURL = "http://localhost:8090/producto/";

  constructor(private httpClient: HttpClient){}

  //1. LISTAR
  public lista(): Observable<Producto[]>{
    return this.httpClient.get<Producto[]>(this.productoURL+'lista');
  }

  //2. LISTAR SINGLE POR ID
  public detail(id: number): Observable<Producto>{
    return this.httpClient.get<Producto>(this.productoURL+`detail/${id}`);
  }

  //3. LISTAR SINGLE POR NOMBRE
  public detailName(nombre: string): Observable<Producto>{
    return this.httpClient.get<Producto>(this.productoURL+`detailname/${nombre}`);
  }

  //4. GUARDAR PRODUCTO
  public save(producto: Producto): Observable<any>{
    return this.httpClient.post<any>(this.productoURL+'create',producto);

  }

  //5. ACTUALIZAR PRODUCTO
  public update(id:number, producto: Producto): Observable<any>{
    return this.httpClient.put<any>(this.productoURL+`update/${id}`,producto);
  }

  //6. ELIMINAR PRODUCTO
  public delete(id: number):Observable<any>{
    return this.httpClient.delete<any>(this.productoURL + `delete/${id}`);
  }
}
















































