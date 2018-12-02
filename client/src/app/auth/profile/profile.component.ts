import { Component, Output } from '@angular/core';

import { AuthenticationService } from '../authentication.service';
import { UserDetails } from '..';
import { MatDialog, MatTabChangeEvent } from '@angular/material';

@Component({
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  private userDetails: UserDetails;

  private detailsLoaded: boolean = false;
  private usersLoaded: boolean = false;
  private selectedTabIndex: number = 0;

  constructor(
    private auth: AuthenticationService
  ) { }


  ngOnInit() {
    this.getUser();
  }

  private getUser() {
    this.auth.profile().subscribe(user => {
      this.userDetails = user;
    }, (err) => {
      console.error(err);
    },
      () => { this.detailsLoaded = true; });
  }

  onTabChange(event: MatTabChangeEvent) {
    this.selectedTabIndex = event.index;
  }

  onUsersLoaded(e) {
    this.usersLoaded = true;
  }

  isFullyLoaded(): boolean {
    return this.detailsLoaded && this.usersLoaded;
  }
}
