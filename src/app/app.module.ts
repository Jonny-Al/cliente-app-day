import { NgModule, APP_INITIALIZER } from '@angular/core';

// ===== COMPONENTES
import { AppComponent } from './app.component';
import { UsersComponent } from './Usuarios/users/users.component';
import { UsereditComponent } from './Usuarios/useredit/useredit.component';
import { HomeComponent } from './Pages/Home/home.component';
import { ErrorsComponent } from './Pages/Errors/errors.component';

// ===== MATERIAL
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker'; // DatePicker
import { MatNativeDateModule } from '@angular/material/core'; // DatePicker
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; // Se agrega los servicios que se van a usar
import { NgbToastModule } from 'ngb-toast';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';

// ===== KEYCLOAK
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { initializeKeycloak } from './Utilidades/app.init';

// ===== AUTH TOKEN HTTP INTERCEPTOR
import { AuthInterceptor } from './Utilidades/AuthInterceptor';

// ====== SERVICES HTTP APIREST-APPDAY
import { UsuarioServiceService } from './Services/Usuario/usuario-service.service';
import { RolServiceService } from './Services/Rol/rol-service.service';
import { AreaServiceService } from './Services/Area/area-service.service';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UsereditComponent,
    HomeComponent,
    ErrorsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
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
    KeycloakAngularModule
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initializeKeycloak,
    multi: true,
    deps: [KeycloakService],
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
    UsuarioServiceService,
    RolServiceService,
    AreaServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
