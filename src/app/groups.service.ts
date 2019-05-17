import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Group } from './models/group';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(private http: HttpClient) 
  {
    console.log("grupos");
  }

  getInstructorGroups()
  {
    var userId = "VOjVFLDIjREttW6YA7JOysMHXV6nbw";
    console.log(`http://api.blackbriar.site/users/${userId}/groups/member`);
    let token = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJWT2pWRkxESWpSRXR0VzZZQTdKT3lzTUhYVjZuYnciLCJleHAiOjE1NTg4OTM2ODd9.dLhECLIeElRcfx7k5prse08WiCb5ett55qq3KaNd3ZaJWVwUk2TDBwtPwtz-lJeqHgrd9iV18-qoT2l9slEd2A";
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    })
    return this.http.get<Group[]>(`http://api.blackbriar.site/api/users/${userId}/groups/owned`, { headers: headers });
  }
}
