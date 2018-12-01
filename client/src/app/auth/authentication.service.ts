import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserDetails, TokenResponse, TokenPayload } from './auth.models';

@Injectable()
export class AuthenticationService {
  private token: string;

  constructor(private http: HttpClient, private router: Router) { }

  private saveToken(token: string): void {
    localStorage.setItem('mean_token', token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean_token');
    }
    return this.token;
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  // private saveUserToLocalStorage(userDetails: UserDetails) {
  //   localStorage.setItem('user_id', userDetails._id);
  //   localStorage.setItem('username', userDetails.name);
  //   console.log(window.localStorage.getItem('is_admin'));
  //   console.log(userDetails);
  //   if (userDetails.isAdmin) {
  //     console.log("IS ADMIN");
  //     localStorage.setItem('is_admin', (userDetails.isAdmin).toString());
  //   } else {
  //     localStorage.setItem('is_admin', 'false');
  //   }
  // }

  // private removeUserFromLocalStorage() {
  //   window.localStorage.removeItem('user_id');
  //   window.localStorage.removeItem('username');
  //   window.localStorage.removeItem('is_admin');
  // }


  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      // this.saveUserToLocalStorage(user);
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  public request(method: 'post' | 'get', type: 'login' | 'register' | 'profile' | 'post/list' | 'user/list', user?: TokenPayload): Observable<any> {
    let base;

    if (method === 'post') {
      base = this.http.post(`/api/${type}`, user);
    } else {
      base = this.http.get(`/api/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` } });
    }

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );

    return request;
  }

  public register(user: TokenPayload): Observable<any> {
    return this.request('post', 'register', user);
  }

  public login(user: TokenPayload): Observable<any> {
    return this.request('post', 'login', user);
  }

  public profile(): Observable<any> {
    return this.request('get', 'profile');
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('mean_token');
    // this.removeUserFromLocalStorage();
    this.router.navigateByUrl('/');
  }
}
