import { User } from 'src/app/_models/user';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseURL = environment.apiURL + '/auth/';

  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: User;

  photoURL= new BehaviorSubject<string>('../../assets/users.png');
  currentPhotURL = this.photoURL.asObservable();


  constructor(private http: HttpClient) { }

changeMemberPhoto(photoURL:string){
  this.photoURL.next(photoURL);
}


  login(model: any) {
    console.log(this.baseURL);

    return this.http.post(this.baseURL + 'login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          localStorage.setItem('user', JSON.stringify(user.user));

          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          this.currentUser = user.user;
          this.changeMemberPhoto(this.currentUser.photoURL);

        }
      })
    );
  }

  register(user: User) {
    return this.http.post(this.baseURL + 'register', user);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);

  }
}
