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

  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<User[]> {
    // return this.httpClient.get<User[]>(this.baseURL + '/users', httpOptions);
    return this.httpClient.get<User[]>(this.baseURL + '/users');
  }

  getUser(id): Observable<User> {
    // return this.httpClient.get<User>(this.baseURL + '/users/' + id, httpOptions);
    return this.httpClient.get<User>(this.baseURL + '/users/' + id);
  }
}
