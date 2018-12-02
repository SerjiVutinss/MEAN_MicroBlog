import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../user.service';
import { UserModel } from '../user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  @Output() usersLoaded = new EventEmitter();
  private users: UserModel[] = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  /**
   * get all users from API
   */
  getUsers() {
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
  onDelete(id: any) {
    this.userService.deleteUser(id).subscribe(
      null,
      (error) => console.log(error),
      () => this.getUsers()
    );
  }
}
