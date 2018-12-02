import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Post } from '../post.model';
import { DateFunctions } from 'src/app/shared/date.functions';
import { PostService } from '../post.service';
import { PostDialogComponent } from '../post.dialog';

@Component({
  selector: 'app-post-edit-dialog',
  templateUrl: './post-edit-dialog.component.html',
  styleUrls: ['./post-edit-dialog.component.css']
})
export class PostEditDialogComponent extends PostDialogComponent implements OnInit {

  protected post: Post;

  constructor(
    protected postService: PostService,
    public dialogRef: MatDialogRef<PostEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    super(postService, dialogRef, MAT_DIALOG_DATA)
  }

  ngOnInit() {
    this.post = this.data.post as Post;
  }

  onPostUpdate() {
    this.postService.updatePost(this.post._id, this.post).subscribe();
    this.dialogRef.close();
  }
}
