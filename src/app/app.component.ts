import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConfig, NullValidationHandler, OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private oauthService: OAuthService) {
    this.configure();
  }

  username!: string;
  isLogged: boolean | undefined;
  isAdmin: boolean | undefined;

  authConfig: AuthConfig = {
    issuer: 'http://localhost:8080/auth/realms/tutorial',
    redirectUri: window.location.origin,// + '/index.html',
    clientId: 'tutorial-frontend',
    responseType: 'code',
    scope: 'openid profile email offline_access',
    showDebugInformation: true,
  };

  configure(): void {

    this.oauthService.configure(this.authConfig);
    this.oauthService.tokenValidationHandler = new NullValidationHandler();
    this.oauthService.setupAutomaticSilentRefresh();
    //this.oauthService.loadDiscoveryDocumentAndTryLogin();
    this.oauthService.loadDiscoveryDocument().then(() => this.oauthService.tryLogin().then(() => {
      if (this.oauthService.getIdentityClaims()) {
        this.isLogged = this.getIsLogged();
        this.isAdmin = this.getIsAdmin();
      } else {
        this.oauthService.initImplicitFlowInternal();
      }
    }));
  }

  // Valida si esta autenticado o es admin
  public getIsLogged(): boolean {
    return (this.oauthService.hasValidIdToken() && this.oauthService.hasValidAccessToken());
  }

  public getIsAdmin(): boolean {
    const token = this.oauthService.getAccessToken();
    const payload = token.split('.')[1];
    const payloadDecodeJson = atob(payload);
    const payloadDecode = JSON.parse(payloadDecodeJson);
    return payloadDecode.realm_access.roles.indexOf('realm-admin') !== -1;
  }

  login(): void {
    this.oauthService.initImplicitFlowInternal();
  }

  logout(): void {
    this.oauthService.logOut();
  }
}
