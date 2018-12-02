import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PostService } from '../post.service';
import { PostListComponent } from '../post-list/post-list.component';
import { MatDialog } from '@angular/material';
import { AuthenticationService } from 'src/app/auth';
import { PostCreateDialogComponent } from '../post-create-dialog/post-create-dialog.component';

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
    this.getPosts();
  }

  protected getPosts() {
    this.getUserPosts();
  }


  private getUserPosts() {
    this.postsLoading = true;
    this.postService.getUserPosts(this.auth.getUserDetails()._id).subscribe(
      (data) => this.posts = data,
      null,
      () => this.postsLoading = false
    );
  }

  protected newPostDialog() {
    const dialogRef = this.dialog.open(PostCreateDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      // only emit if the dialog returned true
      if (result) {
        // used to cause the parent (list) component to update its data
        this.getPosts();
      }
    });
  }
}