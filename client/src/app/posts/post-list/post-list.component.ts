import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Post } from '../post.model';
import { PostService } from '../post.service';
import { UserDetails } from 'src/app/auth';
import { MatDialog } from '@angular/material';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { PostCreateDialogComponent } from '../post-create-dialog/post-create-dialog.component';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  // TODO: better to get these from AuthService?
  @Input()
  protected userDetails: UserDetails;
  @Input()
  showAll: boolean;

  protected posts: Post[] = [];
  protected isUserData: boolean = false;
  
  @Output() posted = new EventEmitter();

  constructor(
    protected postService: PostService,
    protected dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.postService.getPosts().subscribe(
      (data) => this.posts = data
    );
  }

  onDelete(id: String) {
    this.postService.deletePost(id).subscribe(() => {
      this.ngOnInit();
    })
  }

  openDialog(id: String): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed: ' + result);
      if (result) this.onDelete(id);
    });
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(PostCreateDialogComponent, {
      width: '400px',
      data: {
        userDetails: this.userDetails
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getPosts();
      this.posted.emit();
    })
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
