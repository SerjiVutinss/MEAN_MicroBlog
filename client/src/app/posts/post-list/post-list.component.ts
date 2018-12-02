import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Post } from '../post.model';
import { PostService } from '../post.service';
import { AuthenticationService } from 'src/app/auth';
import { MatDialog } from '@angular/material';
import { PostCreateDialogComponent } from '../post-create-dialog/post-create-dialog.component';

/**
 * Component used to display a number of post components in a list
 * 
 * 
 */
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  @Input() private showAll: boolean;

  protected posts: Post[] = [];
  protected postsLoading: boolean = false;

  constructor(
    protected auth: AuthenticationService,
    protected postService: PostService,
    protected dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getPosts();
  }

  /**
   * Get the posts for this component
   */
  protected getPosts() {
    this.getAllPosts();
  }

  /**
   * Get all of the posts in the database
   */
  private getAllPosts() {
    this.postsLoading = true;
    this.postService.getPosts().subscribe(
      (data) => this.posts = data,
      null,
      () => this.postsLoading = false
    );
  }

  /**
   * Opens a new post dialog
   * 
   * @return emits posts_changed
   */
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

  // newPostDialog() {
  //   const dialogRef = this.dialog.open(PostCreateDialogComponent, {
  //     width: '400px'
  //   });
  //   dialogRef.afterClosed().subscribe(
  //     (result) => {
  //       if (result) this.getPosts();
  //     });
  // }

}
