import { Component, OnInit, Input } from '@angular/core';

import { Post } from '../post.model';
import { PostService } from '../post.service';
import { UserDetails } from 'src/app/auth/authentication.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  // TODO: better to get these from AuthService?
  @Input()
  userDetails: UserDetails;

  private posts: Post[] = [];
  private isUserData: boolean = false;

  constructor(
    private postService: PostService
  ) { }

  ngOnInit() {
    if (this.userDetails) {
      this.getUserPosts(this.userDetails._id);
    }
    else {
      this.getAllPosts();
    }
  }

  getAllPosts() {
    this.postService.getPosts().subscribe(
      (data) => this.posts = data
    );
  }

  getUserPosts(userID: string) {
    this.postService.getUserPosts(userID).subscribe(
      (data) => this.posts = data,
      null,
      () => this.isUserData = true
    )
  }

  onDelete(id: String) {
    this.postService.deletePost(id).subscribe(() => {
      this.ngOnInit();
    })
  }

}
