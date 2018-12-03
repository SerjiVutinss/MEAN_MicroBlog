import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PostService } from '../post.service';
import { AuthenticationService } from 'src/app/auth';
import { PostDialogComponent } from '../post.dialog';

@Component({
  selector: 'app-post-create-dialog',
  templateUrl: './post-create-dialog.component.html',
  styleUrls: ['./post-create-dialog.component.css']
})
export class PostCreateDialogComponent extends PostDialogComponent implements OnInit {

  constructor(
    protected postService: PostService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private auth: AuthenticationService
  ) {
    super(postService, dialogRef, data);
  }

  ngOnInit() {
    let userDetails = this.auth.getUserDetails();
    this.post.user_id = userDetails._id;
    this.post.username = userDetails.name;
  }

  onPostCreate() {
    this.postService.addPost(this.post).subscribe();
    this.dialogRef.close(true);
  }
}
