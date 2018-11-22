import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService, TokenPayload } from '../authentication.service';

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