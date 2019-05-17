import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) 
  { 
    console.log("marrano");
  }

  login(email, password)
  {
    console.log(JSON.stringify({ email: email, password: password }));
    let jsonCoded = JSON.stringify({ email: email, password: password });
    return this.http.post("http://api.blackbriar.site/api/users/login", jsonCoded);
  }

  getInfoUser(userId)
  {
    return this.http.get<User>(`http://api.blackbriar.site/api/users/${userId}`);
  }
}
