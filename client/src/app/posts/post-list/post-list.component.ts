import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Post } from '../post.model';
import { PostService } from '../post.service';
import { UserDetails, AuthenticationService } from 'src/app/auth';
import { MatDialog } from '@angular/material';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { PostCreateDialogComponent } from '../post-create-dialog/post-create-dialog.component';
import { PostEditDialogComponent } from '../post-edit-dialog/post-edit-dialog.component';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  @Input()
  showAll: boolean;

  protected posts: Post[] = [];
  @Output() posted = new EventEmitter();

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

  private isUserPost(post_user_id: string): boolean {
    let belongsToUser: boolean = false;
    if (this.auth.getUserDetails()) {
      belongsToUser = post_user_id === this.auth.getUserDetails()._id;
    }
    return belongsToUser;
  }

  onDelete(id: String) {
    this.postService.deletePost(id).subscribe(() => {
      this.ngOnInit();
    })
  }


  newPostDialog() {
    const dialogRef = this.dialog.open(PostCreateDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getPosts();
      this.posted.emit();
    })
  }

  editDialog(post: Post) {
    const dialogRef = this.dialog.open(PostEditDialogComponent, {
      width: '400px',
      data: {
        post: post
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getPosts();
      this.posted.emit();
    })
  }

  deleteDialog(id: String): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed: ' + result);
      if (result) this.onDelete(id);
    });
  }

  // onSearchChange(value: string) {
  //   console.log("changed: " + value);
  //   this.getPosts();
  //   if (value.length > 0) {
  //     this.posts = this.posts.filter(p => {
  //       return p.title.toLowerCase().includes(value) || p.content.toLowerCase().includes(value);
  //     });
  //   }
  // }

  // clearSearch() {
  //   this.searchQuery = "";
  //   this.getPosts();
  // }
}
