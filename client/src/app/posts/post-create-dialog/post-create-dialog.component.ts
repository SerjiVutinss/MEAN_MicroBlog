import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { DateFunctions } from 'src/app/shared/date.functions';
import { AuthenticationService } from 'src/app/auth';

@Component({
  selector: 'app-post-create-dialog',
  templateUrl: './post-create-dialog.component.html',
  styleUrls: ['./post-create-dialog.component.css']
})
export class PostCreateDialogComponent implements OnInit {

  protected post: Post = { user_id: "", title: "", content: "", created_utc: "", username: "" };

  constructor(
    protected postService: PostService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private auth: AuthenticationService
  ) { }

  ngOnInit() {
    let userDetails = this.auth.getUserDetails();
    this.post.user_id = userDetails._id;
    this.post.username = userDetails.name;
  }

  onPostCreate() {
    this.postService.addPost(this.post).subscribe();
    this.dialogRef.close();
  }
}
