import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Comment } from '../comment.model';
import { CommentService } from '../comment.service';
import { DateFunctions } from 'src/app/shared/date.functions';
import { AuthenticationService } from 'src/app/auth';
import { CommentDialogComponent } from '../comment.dialog';

@Component({
  selector: 'app-comment-create-dialog',
  templateUrl: './comment-create-dialog.component.html',
  styleUrls: ['./comment-create-dialog.component.css']
})
export class CommentCreateDialogComponent extends CommentDialogComponent implements OnInit {

  protected comment: Comment = { user_id: "", post_id: "", content: "", created_utc: "", username: "" };

  constructor(
    protected commentService: CommentService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private auth: AuthenticationService
  ) {
    super(commentService, dialogRef, data);
  }

  ngOnInit() {
    let userDetails = this.auth.getUserDetails();
    this.comment.post_id = this.data.post_id;
    this.comment.user_id = userDetails._id;
    this.comment.username = userDetails.name;
  }

  onCommentCreate() {
    this.commentService.addComment(this.comment).subscribe();
    this.dialogRef.close(true);
  }
}
