import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule,DashboardComponent,RouterModule],
  templateUrl: './admin.component.html',
  styles: 'a{color:#59ab6e }',
})
export class AdminComponent{
  
}
