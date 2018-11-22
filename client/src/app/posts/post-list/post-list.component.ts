import { Component, OnInit, Input } from '@angular/core';

import { Post } from '../post.model';
import { PostService } from '../post.service';
import { DateFunctions } from 'src/app/shared/date.functions';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  @Input()
  userID: String;

  private posts: Post[] = [];
  private isUserData: boolean = false;

  constructor(
    private postService: PostService
  ) { }

  ngOnInit() {

    if (this.userID) {
      this.postService.getUserPosts(this.userID).subscribe(
        (data) => this.posts = data,
        null,
        () => this.isUserData = true
      )
    }
    else {
      this.postService.getPosts().subscribe(
        (data) => this.posts = data
      );
    }
  }

  onDelete(id: String) {
    this.postService.deletePost(id).subscribe(() => {
      this.ngOnInit();
    })
  }

}
