import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Comment } from '../comment.model';
import { CommentService } from '../comment.service';
import { AuthenticationService } from 'src/app/auth';
import { MatDialog } from '@angular/material';
import { CommentCreateDialogComponent } from '../comment-create-dialog/comment-create-dialog.component';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {

  @Input() private showAll: boolean;

  protected comments: Comment[] = [];

  constructor(
    protected auth: AuthenticationService,
    protected commentService: CommentService,
    protected dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getComments();
  }

  getComments() {
    this.getAllComments();
  }

  getAllComments() {
    this.commentService.getComments().subscribe(
      (data) => this.comments = data,
      (e) => { console.log(e) },
      () => console.log(this.comments)
    );
  }

  newCommentDialog() {
    const dialogRef = this.dialog.open(CommentCreateDialogComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(
      () => { this.getComments(); });
  }
}
