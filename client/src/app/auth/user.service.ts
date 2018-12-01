import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(
        private http: HttpClient
    ) { }

    getUsers(): Observable<any> {
        return this.http.get('/api/user/list');
    }

    // getUser(id: String): Observable<any> {
    //     return this.http.get("api/User/" + id);
    // }

    // addUser(User: User): Observable<any> {
    //     return this.http.User('/api/User', User, { responseType: 'text' });
    // }

    // updateUser(id: String, User: User): Observable<any> {
    //     return this.http.put("/api/User/" + id, User, { responseType: 'text' });
    // }

    deleteUser(id: any): Observable<any> {
        return this.http.delete("/api/user/" + id);
    }

    // getUserUsers(userID: String): Observable<any> {
    //     // console.log("Get Users for: " + userID);
    //     return this.http.get("/api/User/user/" + userID);
    // }
}
