import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from './models/message';

@Injectable({
  providedIn: 'root'
})
export class InboxService {

  constructor(private http: HttpClient) { }

  getStudentLatestNotification()
  {
    setInterval(function() {
      let token = "Bearer " + localStorage.getItem("token");
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      });
      return this.http.get("https://api.blackbriar.site/api/inbox/latest", {headers: headers});
    }, 1000);
  }


  getInstructorLatestNotification()
  {
    let token = "Bearer " + localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Authorization': token
    });
    return this.http.get<Message[]>("https://api.blackbriar.site/api/inbox/latest", {headers: headers});
  }
}


