import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) {
    console.log("marrano");
  }

  login(email, password) {
    return this.http.post("https://api.blackbriar.site/api/users/login", {
      email: email,
      password: password
    });
  }

  getInfoUser(userId) {
    return this.http.get<User>(`https://api.blackbriar.site/api/users/${userId}`);
  }
}
