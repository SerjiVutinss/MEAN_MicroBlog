import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Post } from './post.model';
import { PostService } from './post.service';

@Component({})
export abstract class PostDialogComponent implements OnInit {

    protected post: Post = { user_id: "", title: "", content: "", created_utc: "", username: "" };

    constructor(
        protected postService: PostService,
        public dialogRef: MatDialogRef<any>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

    ngOnInit() {
        this.post = this.data.post as Post;
    }

    goBack() {
        this.dialogRef.close();
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
