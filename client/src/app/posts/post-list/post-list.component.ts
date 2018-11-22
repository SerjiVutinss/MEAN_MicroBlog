import { Component, OnInit } from '@angular/core';

import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  private posts: Post[] = [];

  constructor(
    private postService: PostService
  ) { }

  ngOnInit() {
    this.postService.getPosts().subscribe(
      (data) => this.posts = data
    );
  }

  onDelete(id: String) {
    this.postService.deletePost(id).subscribe(() => {
      this.ngOnInit();
    })
  }

}
