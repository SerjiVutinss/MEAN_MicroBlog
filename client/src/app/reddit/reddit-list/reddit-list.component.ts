import { Component, OnInit } from '@angular/core';
import { RedditLink } from '../reddit-link.model';
import { RedditService } from '../reddit.service';

@Component({
  selector: 'app-reddit-list',
  templateUrl: './reddit-list.component.html',
  styleUrls: ['./reddit-list.component.css']
})
export class RedditListComponent implements OnInit {

  private redditPosts: RedditLink[] = [];

  constructor(private redditService: RedditService) { }

  ngOnInit() {
    this.redditService.fetchPosts("/r/ireland", "top", 5).subscribe(
      (data) => this.redditPosts = data
    )
  }

}
