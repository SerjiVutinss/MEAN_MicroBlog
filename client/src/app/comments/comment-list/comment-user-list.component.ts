import { Component, OnInit } from '@angular/core';
import { CommentService } from '../comment.service';
import { CommentListComponent } from '../comment-list/comment-list.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-comment-user-list',
  templateUrl: '../comment-list/comment-list.component.html',
  styleUrls: ['../comment-list/comment-list.component.css',]
})
export class CommentUserListComponent extends CommentListComponent implements OnInit {

  constructor(
    protected commentService: CommentService,
    protected dialog: MatDialog
  ) {
    super(commentService, dialog);
  }

  getUserComments() {
    this.commentService.getUserComments(this.userDetails._id).subscribe(
      (data) => this.comments = data,
      null,
      () => this.isUserData = true
    )
  }
}