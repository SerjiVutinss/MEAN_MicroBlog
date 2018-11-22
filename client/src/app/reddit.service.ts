import { Injectable } from '@angular/core';
import { Jsonp } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RedditLink } from './models/RedditLink';
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

    console.log("TECHING FROM REDDIT");
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
    // <p *ngFor="let r of redditPosts">{{ r.title }} - {{ r.url }} - {{ r.permalink }}</p>
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
      redditPosts.push(post);
    }
    return redditPosts;
  }
}
