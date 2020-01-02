import { PaginationResult } from './../_models/pagination';
import { User } from './../_models/user';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

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

  getUsers(page?, itemsPerPage?, userParams?): Observable<PaginationResult<User[]>> {
    const paginatedResult: PaginationResult<User[]> = new PaginationResult<User[]>();
    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);

    }

    if (userParams != null) {
      params = params.append('minAge', userParams.minAge);
      params = params.append('maxAge', userParams.maxAge);
      params = params.append('gender', userParams.gender);
      params = params.append('orderBy', userParams.orderBy);
    }

    return this.httpClient.get<User[]>(this.baseURL + '/users', { observe: 'response', params })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        })
      );
  }

  getUser(id): Observable<User> {
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
