import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { PostCreateDialogComponent } from '../post-create-dialog/post-create-dialog.component';
import { PostEditDialogComponent } from '../post-edit-dialog/post-edit-dialog.component';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { Post } from '../post.model';
import { AuthenticationService } from 'src/app/auth';
import { PostService } from '../post.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post: Post;
  @Input() disableLink: boolean;

  @Output() posts_changed = new EventEmitter();

  constructor(
    protected auth: AuthenticationService,
    protected postService: PostService,
    protected dialog: MatDialog
  ) { }

  ngOnInit() { }

  private isUserPost(post_user_id: string): boolean {
    if (this.auth.getUserDetails()) {
      return post_user_id === this.auth.getUserDetails()._id;
    }
    return false;
  }

  private onDelete(id: String) {
    this.postService.deletePost(id).subscribe(() => {
      this.posts_changed.emit();
    })
  }


  private newPostDialog() {
    const dialogRef = this.dialog.open(PostCreateDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.posts_changed.emit();
    })
  }

  private editDialog(post: Post) {
    const dialogRef = this.dialog.open(PostEditDialogComponent, {
      width: '400px',
      data: {
        post: post
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.posts_changed.emit();
    })
  }

  private deleteDialog(id: String): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.postService.deletePost(id).subscribe(() => {
          this.posts_changed.emit();
        });
      }
    });
  }
}