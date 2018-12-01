import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { DateFunctions } from 'src/app/shared/date.functions';

@Component({
  selector: 'app-post-create-dialog',
  templateUrl: './post-create-dialog.component.html',
  styleUrls: ['./post-create-dialog.component.css']
})
export class PostCreateDialogComponent implements OnInit {

  private post: Post = { user_id: "", title: "", content: "", created_utc: "", username: "" };
  constructor(
    public dialogRef: MatDialogRef<PostCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private postService: PostService
  ) { }

  ngOnInit() {
    this.post.user_id = this.data.userDetails._id;
    this.post.username = this.data.userDetails.name;
  }

  onPostCreate() {
    this.post.created_utc = DateFunctions.getCurrentUTCEpoch();
    this.postService.addPost(this.post).subscribe();
    this.dialogRef.close();
  }

  goBack() {
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
