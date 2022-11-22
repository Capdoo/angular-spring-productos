import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  //Obtener address de environment
  productoURL = environment.productoURL;

  constructor(private httpClient: HttpClient){}

  //1. LISTAR
  public lista(): Observable<Producto[]>{
    const url = `${this.productoURL}/lista`;
    return this.httpClient.get<Producto[]>(url);
  }

  //2. LISTAR SINGLE POR ID
  public detail(id: number): Observable<Producto>{
    const url = `${this.productoURL}/detail/${id}`;
    return this.httpClient.get<Producto>(url);
  }

  //3. LISTAR SINGLE POR NOMBRE
  public detailName(nombre: string): Observable<Producto>{
    const url = `${this.productoURL}/detailname/${nombre}`;
    return this.httpClient.get<Producto>(url);
  }

  //4. GUARDAR PRODUCTO
  public save(producto: Producto): Observable<any>{
    const url = `${this.productoURL}/create`;
    return this.httpClient.post<any>(url, producto);
  }

  //5. ACTUALIZAR PRODUCTO
  public update(id:number, producto: Producto): Observable<any>{
    const url = `${this.productoURL}/update/${id}`;
    return this.httpClient.put<any>(url, producto);
  }

  //6. ELIMINAR PRODUCTO
  public delete(id: number):Observable<any>{
    const url = `${this.productoURL}/delete/${id}`;
    return this.httpClient.delete<any>(url);
  }
}
















































