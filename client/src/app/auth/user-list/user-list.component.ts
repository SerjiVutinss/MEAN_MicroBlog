import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../user.service';
import { UserModel } from '../user.model';
import { MatDialog } from '@angular/material';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  @Output() users_changed = new EventEmitter();
  @Output() usersLoaded = new EventEmitter();
  private users: UserModel[] = [];

  constructor(

    private userService: UserService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  /**
   * get all users from API
   */
  private getUsers() {
    this.userService.getUsers().subscribe(
      (data) => { this.users = data },
      (err) => { },
      () => {
        console.log("Emit: users loaded <user-list>");
        this.usersLoaded.emit();
      });
  }

  /**
   * delete user, then reload users from API
   * @param id id of user to be deleted
   */
  private onDelete(id: any) {
    this.userService.deleteUser(id).subscribe(
      null,
      (error) => console.log(error),
      () => this.getUsers()
    );
  }

  private deleteDialog(id: String): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onDelete(id);
      }
    });
  }
}
