import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsereditComponent } from './Usuarios/useredit/useredit.component';
import { UsersComponent } from './Usuarios/users/users.component';

const routes: Routes = [
  { path: 'usuarios', component: UsersComponent },
  { path: 'edit', component: UsereditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
