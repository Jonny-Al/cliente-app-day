import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorsComponent } from './Pages/Errors/errors.component';
import { HomeComponent } from './Pages/Home/home.component';
import { UsereditComponent } from './Usuarios/useredit/useredit.component';
import { UsersComponent } from './Usuarios/users/users.component';

const routes: Routes = [
  { path: 'usuarios', component: UsersComponent },
  { path: 'usuario/:id', component: UsereditComponent },
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: '**', component: ErrorsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
