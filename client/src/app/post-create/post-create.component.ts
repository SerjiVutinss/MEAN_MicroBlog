import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../models/Post';
import { PostService } from '../post.service';
import { AuthenticationService } from '../authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  constructor(
    private postService: PostService,
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  @Input()
  private post: Post = { user_id: "", title: "", content: "" };
  // private post: any;
  private userId: String = "";
  private post_id: String;

  private isEdit: boolean = false;

  ngOnInit() {
    this.post._id = this.route.snapshot.params['id'];
    if (this.post._id) {
      this.isEdit = true;
      this.postService.getPost(this.post_id).subscribe(data => {
        this.post = data;
      });
    }

    if (this.authService.isLoggedIn && !this.isEdit) {
      this.userId = this.authService.getUserDetails()._id;
      this.post.user_id = this.userId;
    }
  }

  createPost() {
    return this.postService.addPost(this.post).subscribe(
      () => {
        this.goBack();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  updatePost() {
    return this.postService.updatePost(this.post_id, this.post).subscribe(
      () => { this.goBack(); }
    );
  }

  goBack() {
    //this.router.navigate(['/post/list']);
    this.location.back();
  }

}
