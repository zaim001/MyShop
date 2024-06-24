import { Component } from '@angular/core';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
  signupAtBottom = true;
  loginAtBottom = false;

  onSignupClick() {
    this.signupAtBottom = false;
    this.loginAtBottom = true;
  }

  onLoginClick() {
    this.signupAtBottom = true;
    this.loginAtBottom = false;
  }
}
