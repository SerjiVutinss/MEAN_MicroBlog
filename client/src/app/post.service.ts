import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from './models/Post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getPosts(): Observable<any> {
    return this.http.get('/api/post/list');
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
}
