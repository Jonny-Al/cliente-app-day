import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorsComponent } from './Pages/Errors/errors.component';
import { HomeComponent } from './Pages/Home/home.component';
import { UsereditComponent } from './Usuarios/useredit/useredit.component';
import { UsersComponent } from './Usuarios/users/users.component';
import { AuthGuard } from './Utilidades/Keycloak/app.guard';
//import { AppComponent } from './app.component';

const routes: Routes = [
  { path: 'usuarios', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'usuario/:id', component: UsereditComponent, canActivate: [AuthGuard] },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '**', component: ErrorsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
