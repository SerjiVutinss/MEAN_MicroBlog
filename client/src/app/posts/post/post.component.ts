import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { PostCreateDialogComponent } from '../post-create-dialog/post-create-dialog.component';
import { PostEditDialogComponent } from '../post-edit-dialog/post-edit-dialog.component';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { Post } from '../post.model';
import { AuthenticationService } from 'src/app/auth';
import { PostService } from '../post.service';
import { MatDialog } from '@angular/material';

/**
 * Component which takes a post object as an input and displays it.
 * 
 * It also contains functionality to open the create and edit dialogs as well
 * as navigating to the post-comments component
 * 
 * @param post Input object for this component (required). The component binds
 * to this object
 * 
 * @param disableLink Input parameter (optional).
 * Determines whether or not clicking on a post title will navigate to the 
 * post-comment component (false) or not (true)
 * 
 * @return posts_changed - Event Emitter emits when an operation has been
 * performed on a post, i.e. create, update, delete
 */
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post: Post;  // the component binds to this object
  @Input() disableLink: boolean; // optional - disable navigation on title click

  @Output() posts_changed = new EventEmitter(); // emits when posts have changed

  constructor(
    protected auth: AuthenticationService,
    protected postService: PostService,
    protected dialog: MatDialog
  ) { }

  ngOnInit() { }

  /**
   * Returns true if the post_user_id matches the user._id of the logged in user
   * 
   * @param post_user_id user_id of the post to check
   * @return {boolean} did the ids match
   */
  private isUserPost(post_user_id: string): boolean {
    if (this.auth.getUserDetails()) {
      return post_user_id === this.auth.getUserDetails()._id;
    }
    return false;
  }

  /**
   * Opens a new post dialog
   * 
   * @return emits posts_changed
   */
  private newPostDialog() {
    const dialogRef = this.dialog.open(PostCreateDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      // only emit if the dialog returned true
      if (result) {
        // used to cause the parent (list) component to update its data
        this.posts_changed.emit();
      }
    });
  }

  /**
   * Opens an edit post dialog
   * 
   * @param {Post} post - the post to be edited, it is bound to the dialog form
   * @return emits posts_changed
   */
  private editDialog(post: Post) {
    const dialogRef = this.dialog.open(PostEditDialogComponent, {
      width: '400px',
      data: {
        post: post
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      // only emit if the dialog returned true
      if (result) {
        // used to cause the parent (list) component to update its data
        this.posts_changed.emit();
      }
    })
  }

  /**
   * Opens a delete-dialog component - if user clicks Yes on the dialog, the post
   * with id of post_id will be deleted.  On dialog cancel (No), no operation will
   * be performed
   * 
   * @param {string} id - the id of the post to be deleted
   * @return emits posts_changed
   */
  private deleteDialog(post_id: String): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { // if Yes was clicked (dialog was confirmed)
        this.postService.deletePost(post_id).subscribe(() => {
          this.posts_changed.emit();
        });
      }
    });
  }
}