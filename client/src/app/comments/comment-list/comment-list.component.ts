import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Comment } from '../comment.model';
import { CommentService } from '../comment.service';
import { UserDetails } from 'src/app/auth';
import { MatDialog } from '@angular/material';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { CommentCreateDialogComponent } from '../comment-create-dialog/comment-create-dialog.component';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {

  // TODO: better to get these from AuthService?
  @Input()
  protected userDetails: UserDetails;
  @Input()
  showAll: boolean;

  protected comments: Comment[] = [];
  protected isUserData: boolean = false;
  
  @Output() posted = new EventEmitter();

  constructor(
    protected postService: CommentService,
    protected dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getComments();
  }

  getComments() {
    this.postService.getComments().subscribe(
      (data) => this.comments = data,
      (err) => console.log(err),
      null
    );
  }

  onDelete(id: String) {
    this.postService.deleteComment(id).subscribe(() => {
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
    const dialogRef = this.dialog.open(CommentCreateDialogComponent, {
      width: '400px',
      data: {
        userDetails: this.userDetails
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getComments();
      this.posted.emit();
    })
  }

  // onSearchChange(value: string) {
  //   console.log("changed: " + value);
  //   this.getComments();
  //   if (value.length > 0) {
  //     this.posts = this.posts.filter(p => {
  //       return p.title.toLowerCase().includes(value) || p.content.toLowerCase().includes(value);
  //     });
  //   }
  // }

  // clearSearch() {
  //   this.searchQuery = "";
  //   this.getComments();
  // }
}
