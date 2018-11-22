import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from './models/Post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) {

  }

  getPosts(): Observable<any> {
    return this.http.get('/api/post/list');
  }

  addPost(post: Post): Observable<any> {
    //const post: Post = { title: "SomeTitle", content: "Something" };
    console.log(post);
    return this.http.post('/api/post', post, { responseType: 'text' });
  }
}
