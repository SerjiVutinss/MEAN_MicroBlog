import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Comment } from '../comment.model';
import { CommentService } from '../comment.service';
import { AuthenticationService, UserDetails } from '../../auth';
import { DateFunctions } from 'src/app/shared/date.functions';

@Component({
  selector: 'app-comment-create',
  templateUrl: './comment-create.component.html',
  styleUrls: ['./comment-create.component.css']
})
export class CommentCreateComponent implements OnInit {

  constructor(
    private commentService: CommentService,
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  @Input()
  private comment: Comment = { user_id: "", title: "", content: "", created_utc: "" };
  @Input()
  private userId: String = "";

  // private comment: any;
  private username: String = "";
  // private comment_id: String;

  private isEdit: boolean = false;

  ngOnInit() {
    this.comment._id = this.route.snapshot.params['id'];
    console.log(this.comment._id);
    if (this.comment._id) {
      this.isEdit = true;
      this.commentService.getComment(this.comment._id).subscribe(data => {
        this.comment = data;
      });
    }

    if (this.authService.isLoggedIn && !this.isEdit) {

      let details: UserDetails = this.authService.getUserDetails();

      this.userId = details._id;
      this.username = details.name;

      this.comment.user_id = this.userId;
      this.comment.username = this.username;
    }
  }

  createComment() {
    // let createdUTC = new Date();
    // this.comment.created_utc = createdUTC;

    //
    this.comment.created_utc = DateFunctions.getCurrentUTCEpoch();

    console.log(this.comment.created_utc);
    //this.comment.created_utc = 
    return this.commentService.addComment(this.comment).subscribe(
      () => {
        this.goBack();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  updateComment() {
    return this.commentService.updateComment(this.comment._id, this.comment).subscribe(
      () => { this.goBack(); }
    );
  }

  goBack() {
    //this.router.navigate(['/comment/list']);
    this.location.back();
  }

}
