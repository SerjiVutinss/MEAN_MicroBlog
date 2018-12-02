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

  constructor(
    protected auth: AuthenticationService,
    protected commentService: CommentService,
    protected dialog: MatDialog
  ) {
    super(auth, commentService, dialog);
  }

  @Input() post_id: String;

  ngOnInit() {
    this.getComments();
  }

  getComments() {
    this.getPostComments(this.post_id);
  }

  getPostComments(post_id: String) {
    this.commentService.getPostComments(post_id).subscribe(
      (data) => this.comments = data
    );
  }
}