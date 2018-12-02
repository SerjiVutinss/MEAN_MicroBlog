import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { PostListComponent } from '../post-list/post-list.component';
import { MatDialog } from '@angular/material';
import { AuthenticationService } from 'src/app/auth';

@Component({
  selector: 'app-post-user-list',
  templateUrl: '../post-list/post-list.component.html',
  styleUrls: ['../post-list/post-list.component.css',]
})
export class PostUserListComponent extends PostListComponent implements OnInit {

  constructor(
    protected auth: AuthenticationService,
    protected postService: PostService,
    protected dialog: MatDialog
  ) {
    super(auth, postService, dialog);
  }

  ngOnInit() {
    this.getUserPosts();
  }

  getUserPosts() {
    this.postService.getUserPosts(this.auth.getUserDetails()._id).subscribe(
      (data) => this.posts = data
    );
  }

  // getPosts() {

  //   this.postService.getUserPosts(this.auth.getUserDetails()._id).subscribe(
  //     (data) => this.posts = data,
  //     null,
  //     () => this.isUserData = true
  //   )
  // }
}