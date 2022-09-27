import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContasComponent } from './contas/contas.component';
import { AuthGuardService } from './core/guard/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '', component: MenuComponent, canActivateChild: [AuthGuardService], children: [
    { path: 'home', component: HomeComponent },
    { path: 'admin', children: [
      { path: 'usuarios', component: UsuariosComponent },
    ]},
    {path: 'vendas', children: [
      { path: 'pedidos', component: PedidosComponent },
      { path: 'contas', component: ContasComponent }
    ]}
  ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
