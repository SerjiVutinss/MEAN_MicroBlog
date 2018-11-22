import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../models/Post';
import { PostService } from '../post.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  constructor(private postService: PostService, private authService: AuthenticationService) { }

  @Input()
  private post: Post;
  private userId: String = "";

  ngOnInit() {

    if (!this.post) {
      this.post = { user_id: "", title: "", content: "" };
    }

    if (this.authService.isLoggedIn) {
      this.userId = this.authService.getUserDetails()._id;
      this.post.user_id = this.userId;
    }
  }

  savePost() {
    return this.postService.addPost(this.post).subscribe();
  }

}
