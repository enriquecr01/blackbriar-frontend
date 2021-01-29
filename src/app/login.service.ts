import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) {}

  login(email, password) {
    return this.http.post("https://blackbriar.herokuapp.com/api/users/login", {
      email: email,
      password: password
    });
  }

  getInfoUser(userId) {
    return this.http.get<User>(`https://blackbriar.herokuapp.com/api/users/${userId}`);
  }
}
