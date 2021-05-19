import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UsersComponent } from './Usuarios/users/users.component';
import { UsereditComponent } from './Usuarios/useredit/useredit.component';
import { ErrorsComponent } from './Pages/Errors/errors.component';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSelectModule } from '@angular/material/select';
import { UsuarioServiceService } from './Services/Usuario/usuario-service.service';
import { HttpClientModule } from '@angular/common/http'; // Se agrega los servicios que se van a usar
import { NgbToastModule } from 'ngb-toast';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { RolServiceService } from './Services/Rol/rol-service.service';
import { AreaServiceService } from './Services/Area/area-service.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';

import { OAuthModule } from 'angular-oauth2-oidc';
import { HomeComponent } from './Pages/Home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UsereditComponent,
    ErrorsComponent,
    HomeComponent
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
    MatMenuModule,
    MatCardModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['hhttp://localhost:8081/api'],
        sendAccessToken: true
      }
    })
  ],
  providers: [UsuarioServiceService, RolServiceService, AreaServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
