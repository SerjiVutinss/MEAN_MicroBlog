import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Post } from './post.model';
import { PostService } from './post.service';

/**
 * An abstract base class to be used by post-create and post-edit dialog components
 */
@Component({})
export abstract class PostDialogComponent implements OnInit {

    // an empty post model
    protected post: Post = {
        user_id: "",
        title: "",
        content: "",
        created_utc: "",
        username: ""
    };

    constructor(
        protected postService: PostService,
        public dialogRef: MatDialogRef<any>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

    // this will be implemented in the sub-components
    ngOnInit() {}

    /**
     * Close the dialog component
     */
    goBack() {
        this.dialogRef.close();
    }

    /**
     * No button clicked
     */
    onNoClick(): void {
        this.dialogRef.close();
    }
}
