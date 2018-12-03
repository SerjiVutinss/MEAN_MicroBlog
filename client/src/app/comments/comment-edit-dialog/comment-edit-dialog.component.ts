import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Comment } from '../comment.model';
import { DateFunctions } from 'src/app/shared/date.functions';
import { CommentService } from '../comment.service';
import { CommentDialogComponent } from '../comment.dialog';

@Component({
  selector: 'app-comment-edit-dialog',
  templateUrl: './comment-edit-dialog.component.html',
  styleUrls: ['./comment-edit-dialog.component.css']
})
export class CommentEditDialogComponent extends CommentDialogComponent implements OnInit {

  protected comment: Comment;

  constructor(
    protected commentService: CommentService,
    public dialogRef: MatDialogRef<CommentEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    super(commentService, dialogRef, MAT_DIALOG_DATA)
  }

  ngOnInit() {
    this.comment = this.data.comment as Comment;
  }

  onCommentUpdate() {
    this.commentService.updateComment(this.comment._id, this.comment).subscribe();
    this.dialogRef.close(true);
  }
}
