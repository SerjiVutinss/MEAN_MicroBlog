import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from './comment.model';

import { AuthenticationService } from '../auth';
import { DateFunctions } from '../shared/date.functions';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private http: HttpClient,
    private auth: AuthenticationService
  ) { }

  getComments(): Observable<any> {
    console.log("GETTING COMMENTS");
    return this.http.get('/api/comment/list');
    // return this.auth.request('get', 'comment/list');
  }

  getPostComments(post_id: String): Observable<any> {

    console.log("GETTING COMMENTS FOR: " + post_id);
    return this.http.get("api/comment/post/" + post_id);
  }

  getUserComments(userID: String): Observable<any> {
    // console.log("Get posts for: " + userID);
    return this.http.get("/api/user/" + userID + "/comments");
  }

  getComment(id: String): Observable<any> {
    return this.http.get("api/comment/" + id);
  }

  addComment(comment: Comment): Observable<any> {
    comment.created_utc = DateFunctions.getCurrentUTCEpoch();
    console.log("FROM SERVICE: " + comment.title);
    return this.http.post('/api/comment', comment, { responseType: 'text' });
  }

  updateComment(id: String, comment: Comment): Observable<any> {
    comment.updated_utc = DateFunctions.getCurrentUTCEpoch();
    return this.http.put("/api/comment/" + id, comment, { responseType: 'text' });
  }

  deleteComment(id: String): Observable<any> {
    return this.http.delete("/api/comment/" + id);
  }

}
