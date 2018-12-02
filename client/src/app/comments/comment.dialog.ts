import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Comment } from './comment.model';
import { CommentService } from './comment.service';

@Component({})
export abstract class CommentDialogComponent implements OnInit {

    protected comment: Comment;// = { user_id: "", title: "", content: "", created_utc: "", username: "" };

    constructor(
        protected commentService: CommentService,
        public dialogRef: MatDialogRef<any>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

    ngOnInit() {
        if (this.data.comment) {
            this.comment = this.data.comment as Comment;
        }
    }

    goBack() {
        this.dialogRef.close();
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
