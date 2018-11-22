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
  private post: Post = { user_id: "", title: "", content: "", created_utc: "" };
  // private post: any;
  private userId: String = "";
  // private post_id: String;

  private isEdit: boolean = false;

  ngOnInit() {
    this.post._id = this.route.snapshot.params['id'];
    console.log(this.post._id);
    if (this.post._id) {
      this.isEdit = true;
      this.postService.getPost(this.post._id).subscribe(data => {
        this.post = data;
      });
    }

    if (this.authService.isLoggedIn && !this.isEdit) {
      this.userId = this.authService.getUserDetails()._id;
      this.post.user_id = this.userId;
    }
  }

  createPost() {
    let createdUTC = new Date();
    this.post.created_utc = createdUTC;

    console.log(this.post.created_utc);
    //this.post.created_utc = 
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
    return this.postService.updatePost(this.post._id, this.post).subscribe(
      () => { this.goBack(); }
    );
  }

  goBack() {
    //this.router.navigate(['/post/list']);
    this.location.back();
  }

}
