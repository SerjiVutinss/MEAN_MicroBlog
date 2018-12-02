import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { CommentCreateDialogComponent } from '../comment-create-dialog/comment-create-dialog.component';
import { CommentEditDialogComponent } from '../comment-edit-dialog/comment-edit-dialog.component';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { Comment } from '../comment.model';
import { AuthenticationService } from 'src/app/auth';
import { CommentService } from '../comment.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() comment: Comment;
  @Input() disableLink: boolean;
  
  @Output() comments_changed = new EventEmitter();

  constructor(
    protected auth: AuthenticationService,
    protected commentService: CommentService,
    protected dialog: MatDialog
  ) { }

  ngOnInit() { }

  private isUserComment(comment_user_id: string): boolean {
    if (this.auth.getUserDetails()) {
      return comment_user_id === this.auth.getUserDetails()._id;
    }
    return false;
  }

  private onDelete(id: String) {
    this.commentService.deleteComment(id).subscribe(() => {
      this.comments_changed.emit();
    })
  }


  private newCommentDialog() {
    const dialogRef = this.dialog.open(CommentCreateDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.comments_changed.emit();
    })
  }

  private editDialog(comment: Comment) {
    const dialogRef = this.dialog.open(CommentEditDialogComponent, {
      width: '400px',
      data: {
        comment: comment
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.comments_changed.emit();
    })
  }

  private deleteDialog(id: String): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.commentService.deleteComment(id).subscribe(() => {
          this.comments_changed.emit();
        });
      }
    });
  }
}