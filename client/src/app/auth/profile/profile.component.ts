import { Component } from '@angular/core';

import { AuthenticationService, UserDetails } from '../authentication.service';

@Component({
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  details: UserDetails;

  private isLoaded: boolean = true;
  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
    this.isLoaded = false;
    this.auth.profile().subscribe(user => {
      this.details = user;
    }, (err) => {
      console.error(err);
    }, () => this.isLoaded = true);
  }
}
