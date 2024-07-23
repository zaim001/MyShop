import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;
  userRoles: string[] = [];
  isHeaderCollapsed = false;

  constructor(private keycloakService: KeycloakService) {}

  ToggleHeaderCollapsed(){
    this.isHeaderCollapsed = true;
  }

  async ngOnInit(): Promise<void> {
    this.isAuthenticated = await this.keycloakService.isLoggedIn();
    if (this.isAuthenticated) {
      this.userRoles = this.keycloakService.getUserRoles();
    }
  }

  async login(): Promise<void> {
    await this.keycloakService.login();
    this.isAuthenticated = true;
    this.userRoles = this.keycloakService.getUserRoles();
  }

  async logout(): Promise<void> {
    await this.keycloakService.logout(window.location.origin);
    this.isAuthenticated = false;
    this.userRoles = [];
  }
  hasRole(role: string): boolean {
    return this.userRoles.includes(role);
  }
}
