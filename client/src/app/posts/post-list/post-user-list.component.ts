import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { PostListComponent } from '../post-list/post-list.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-post-user-list',
  templateUrl: '../post-list/post-list.component.html',
  styleUrls: ['../post-list/post-list.component.css',]
})
export class PostUserListComponent extends PostListComponent implements OnInit {

  constructor(
    protected postService: PostService,
    protected dialog: MatDialog
  ) {
    super(postService, dialog);
  }

  getPosts() {
    this.postService.getUserPosts(this.userDetails._id).subscribe(
      (data) => this.posts = data,
      null,
      () => this.isUserData = true
    )
  }
}