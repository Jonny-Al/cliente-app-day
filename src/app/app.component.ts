import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private keycloakService: KeycloakService) { }

  username!: any;

  ngOnInit(): void {
    this.initializeUserOptions();
  }

  private initializeUserOptions(): void {
    this.keycloakService.loadUserProfile().then(user => {
      //console.log(user);
      this.username = user.firstName;
    });
  }

  logout(): void {
    this.keycloakService.logout('http://localhost:4200/');
  }
}
