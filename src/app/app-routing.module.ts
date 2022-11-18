import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaProductoComponent } from './producto/lista-producto.component';
import { DetalleProductoComponent } from './producto/detalle-producto.component';
import { NuevoProductoComponent } from './producto/nuevo-producto.component';
import { EditarProductoComponent } from './producto/editar-producto.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './auth/login.component';
import { RegistroComponent } from './auth/registro.component';

import { ProdGuardsService } from './guards/prod-guards.service';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [

    { path: '', component: IndexComponent },
    { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
    { path: 'registro', component: RegistroComponent, canActivate: [LoginGuard] },

    { path: 'lista', component: ListaProductoComponent, canActivate: [ProdGuardsService], data: { expectedRol: ['admin', 'user'] } },
    { path: 'detalle/:id', component: DetalleProductoComponent, canActivate: [ProdGuardsService], data: { expectedRol: ['admin', 'user'] } },

    { path: 'nuevo', component: NuevoProductoComponent, canActivate: [ProdGuardsService], data: { expectedRol: ['admin'] } },
    { path: 'editar/:id', component: EditarProductoComponent, canActivate: [ProdGuardsService], data: { expectedRol: ['admin'] } },
    
    { path: '**', redirectTo: '', pathMatch: 'full' }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }