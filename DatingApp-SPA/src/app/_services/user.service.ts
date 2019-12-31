import { User } from './../_models/user';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

// const httpOptions = {
//   headers: new HttpHeaders({
//     Authorization: 'Bearer ' + localStorage.getItem('token')
//   })
// };

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseURL = environment.apiURL;

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<User[]> {
    // return this.httpClient.get<User[]>(this.baseURL + '/users', httpOptions);
    return this.httpClient.get<User[]>(this.baseURL + '/users');
  }

  getUser(id): Observable<User> {
    // return this.httpClient.get<User>(this.baseURL + '/users/' + id, httpOptions);
    return this.httpClient.get<User>(this.baseURL + '/users/' + id);
  }

  updateUser(id: number, user: User) {
    return this.httpClient.put(this.baseURL + '/users/' + id, user);
  }

  setMainPhoto(userId: number, id: number) {
    return this.httpClient.post(this.baseURL + '/users/' + userId + '/photos/' + id + '/setMain', {});
  }

  deletePhoto(userId: number, id: number) {
    return this.httpClient.delete(this.baseURL + '/users/' + userId + '/photos/' + id);
  }

}
