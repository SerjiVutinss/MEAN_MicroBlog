import { Injectable } from '@angular/core';
import { Jsonp } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RedditLink } from './reddit-link.model';
@Injectable({
  providedIn: 'root'
})
export class RedditService {

  constructor(private jsonp: Jsonp) { }

  fetchPosts(
    subreddit: string,
    sort?: string,
    limit?: number
  ): Observable<RedditLink[]> {

    let qrySort = "/hot";

    let qryLimit: String = limit ? "&limit=" + limit : "";
    return this.jsonp.get("https://www.reddit.com" +
      subreddit +
      qrySort +
      "/.json?jsonp=JSONP_CALLBACK" + qryLimit).
      pipe(
        map(data => {
          return this.unwrapData(data);
        }
        ));
  }

  private unwrapData(data: any) {
    var redditPosts: RedditLink[] = [];
    let children = data.json().data.children;
    console.log(children);
    for (var i = 0; i < children.length; i++) {
      let post: RedditLink = new RedditLink();
      post.title = children[i].data.title;
      post.url = children[i].data.url;
      post.thumbnail = children[i].data.thumbnail;
      post.permalink = children[i].data.permalink;
      post.created_utc = children[i].data.created_utc;
      post.is_self = children[i].data.is_self;
      post.selftext = children[i].data.selftext;
      post.ups = children[i].data.ups;
      post.downs = children[i].data.downs;
      post.author = children[i].data.author;

      redditPosts.push(post);
    }
    return redditPosts;
  }
}
