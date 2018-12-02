import { Component, OnInit, Input } from '@angular/core';

import { AuthenticationService } from '../auth';
import { Post, PostService } from '../posts';
import { CommentService, CommentCreateDialogComponent } from '../comments';

import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-posts-comments',
  templateUrl: './posts-comments.component.html',
  styleUrls: ['./posts-comments.component.css']
})
export class PostsCommentsComponent implements OnInit {

  private post: Post;
  private comments: Comment[] = [];

  constructor(
    private auth: AuthenticationService,
    private postService: PostService,
    private commentService: CommentService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getPost();
  }

  getPost() {
    this.postService.getPost(this.route.snapshot.params['id']).subscribe(
      (data) => this.post = data,
      (e) => { console.log(e) },
      () => { this.getComments(this.post._id) }
    )
  }

  getComments(post_id: String) {
    this.commentService.getPostComments(post_id).subscribe(
      (data) => this.comments = data,
      (e) => { console.log(e) },
      () => { console.log(this.comments) }
    );
  }

  newCommentDialog() {
    const dialogRef = this.dialog.open(CommentCreateDialogComponent, {
      width: '400px',
      data: {
        post_id: this.post._id
      }
    });
    dialogRef.afterClosed().subscribe(
      () => { this.getComments(this.post._id); });
  }
}
