import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrosComponent } from './Pages/erros/erros.component';
import { UsereditComponent } from './Usuarios/useredit/useredit.component';
import { UsersComponent } from './Usuarios/users/users.component';

const routes: Routes = [
  { path: 'usuarios', component: UsersComponent },
  { path: 'usuario/:id', component: UsereditComponent },
  { path: '**', component: ErrosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
