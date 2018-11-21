import { Component } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {
  credentials: TokenPayload = {
    email: '',
    password: ''
  };

  private isSubmitted: boolean = true;

  constructor(private auth: AuthenticationService, private router: Router) { }

  login() {
    this.isSubmitted = false;
    this.auth.login(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/profile');
    }, (err) => {
      console.error(err);
    },
      () => this.isSubmitted = true
    );
  }
}