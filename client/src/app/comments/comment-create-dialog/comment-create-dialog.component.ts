import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Comment } from '../comment.model';
import { CommentService } from '../comment.service';
import { DateFunctions } from 'src/app/shared/date.functions';

@Component({
  selector: 'app-comment-create-dialog',
  templateUrl: './comment-create-dialog.component.html',
  styleUrls: ['./comment-create-dialog.component.css']
})
export class CommentCreateDialogComponent implements OnInit {

  private comment: Comment = { user_id: "", title: "", content: "", created_utc: "", username: "" };
  constructor(
    public dialogRef: MatDialogRef<CommentCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private commentService: CommentService
  ) { }

  ngOnInit() {
    this.comment.user_id = this.data.userDetails._id;
    this.comment.username = this.data.userDetails.name;
  }

  onCommentCreate() {
    this.comment.created_utc = DateFunctions.getCurrentUTCEpoch();
    this.commentService.addComment(this.comment).subscribe();
    this.dialogRef.close();
  }

  goBack() {
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
