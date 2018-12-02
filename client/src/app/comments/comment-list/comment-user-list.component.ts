import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from '../comment.service';
import { CommentListComponent } from '../comment-list/comment-list.component';
import { MatDialog } from '@angular/material';
import { AuthenticationService } from 'src/app/auth';

@Component({
  selector: 'app-comment-user-list',
  templateUrl: '../comment-list/comment-list.component.html',
  styleUrls: ['../comment-list/comment-list.component.css',]
})
export class CommentUserListComponent extends CommentListComponent implements OnInit {

  @Input() user_id: String;

  constructor(
    protected auth: AuthenticationService,
    protected commentService: CommentService,
    protected dialog: MatDialog
  ) {
    super(auth, commentService, dialog);
  }

  getUserComments() {
    this.commentService.getUserComments(this.user_id).subscribe(
      (data) => this.comments = data,
      null
    )
  }
}