import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    return this.http.post("https://api.blackbriar.site/api/users/login", jsonCoded);
  }

  getInfoUser(userId)
  {
    let token = "Bearer " + localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    })
    return this.http.get<User>(`https://api.blackbriar.site/api/users/${userId}`, { headers: headers});
  }
}
