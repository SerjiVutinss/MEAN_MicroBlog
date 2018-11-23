import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from './post.model';

import { AuthenticationService } from '../auth';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private http: HttpClient,
    private auth: AuthenticationService
  ) { }

  getPosts(): Observable<any> {
    // return this.http.get('/api/post/list');
    return this.auth.request('get', 'post/list');
  }

  getPost(id: String): Observable<any> {
    return this.http.get("api/post/" + id);
  }

  addPost(post: Post): Observable<any> {
    return this.http.post('/api/post', post, { responseType: 'text' });
  }

  updatePost(id: String, post: Post): Observable<any> {
    return this.http.put("/api/post/" + id, post, { responseType: 'text' });
  }

  deletePost(id: String): Observable<any> {
    return this.http.delete("/api/post/" + id);
  }

  getUserPosts(userID: String): Observable<any> {
    // console.log("Get posts for: " + userID);
    return this.http.get("/api/post/user/" + userID);
  }
}
