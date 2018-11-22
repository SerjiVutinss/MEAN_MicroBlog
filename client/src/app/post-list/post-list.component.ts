import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../models/Post';
import { RedditLink } from '../models/RedditLink';
import { RedditService } from '../reddit.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  constructor(
    private postService: PostService,
    private redditService: RedditService
  ) { }

  private posts: Post[] = [];
  private redditPosts: RedditLink[] = [];

  ngOnInit() {
    this.postService.getPosts().subscribe(
      (data) => this.posts = data
    );
    this.redditService.fetchPosts("/r/ireland", "top", 5).subscribe(
      (data) => this.redditPosts = data
    )
  }

  onDelete(id: String) {
    this.postService.deletePost(id).subscribe(() => {
      this.ngOnInit();
    })
  }

}
