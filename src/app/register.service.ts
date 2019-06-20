import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private http: HttpClient) { }
  
  register(firstName, lastName, email, password, student) {
    return this.http.post("https://api.blackbriar.site/api/users", {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      photo: "default.jpg",
      student: student
    });
  }
}
