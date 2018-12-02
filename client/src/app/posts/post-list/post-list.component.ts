import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Post } from '../post.model';
import { PostService } from '../post.service';
import { AuthenticationService } from 'src/app/auth';
import { MatDialog } from '@angular/material';
import { PostCreateDialogComponent } from '../post-create-dialog/post-create-dialog.component';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  @Input() private showAll: boolean;

  protected posts: Post[] = [];

  constructor(
    protected auth: AuthenticationService,
    protected postService: PostService,
    protected dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.getAllPosts();
  }

  getAllPosts() {
    this.postService.getPosts().subscribe(
      (data) => this.posts = data
    );
  }

  newPostDialog() {
    const dialogRef = this.dialog.open(PostCreateDialogComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(
      () => { this.getPosts(); });
  }
}
