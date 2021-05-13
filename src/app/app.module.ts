import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { UsersComponent } from './Usuarios/users/users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSelectModule } from '@angular/material/select';
import { UsuarioServiceService } from './Services/Usuario/usuario-service.service';
import { HttpClientModule } from '@angular/common/http'; // Se agrega los servicios que se van a usar
import { NgbToastModule } from 'ngb-toast';
import { UsereditComponent } from './Usuarios/useredit/useredit.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { RolServiceService } from './Services/Rol/rol-service.service';
import { AreaServiceService } from './Services/Area/area-service.service';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UsereditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTabsModule,
    MatDatepickerModule,
    MatIconModule,
    MatExpansionModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MatSelectModule,
    HttpClientModule,
    NgbToastModule,
    MatAutocompleteModule,
    MatMenuModule
  ],
  providers: [UsuarioServiceService, RolServiceService, AreaServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
