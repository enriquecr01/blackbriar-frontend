import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Group} from '../../../app/models/group';

@Injectable({
  providedIn: 'root'
})
export class EndpointsService {

  userId = localStorage.getItem('userId');

  constructor(private http:HttpClient) { }

  get_StudentRegisteredGroups(){
  
    this.userId = "KbgSRGca21WWzyJ901xNKGeQk2kOfW";
    var studentsRegisteredGroupsAPI = `http://api.blackbriar.site/api/users/${this.userId}/groups/subscribed`;

    let token = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJWT2pWRkxESWpSRXR0VzZZQTdKT3lzTUhYVjZuYnciLCJleHAiOjE1NTg4OTM2ODd9.dLhECLIeElRcfx7k5prse08WiCb5ett55qq3KaNd3ZaJWVwUk2TDBwtPwtz-lJeqHgrd9iV18-qoT2l9slEd2A";
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
  })
    
    return this.http.get<Group[]>(studentsRegisteredGroupsAPI);
  }

  get_AllGroups(){
    //var userId = "KbgSRGca21WWzyJ901xNKGeQk2kOfW";
    var AllGroupsAPI = 'http://api.blackbriar.site/api/groups';
    
    console.log(``);
    let token = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJWT2pWRkxESWpSRXR0VzZZQTdKT3lzTUhYVjZuYnciLCJleHAiOjE1NTg4OTM2ODd9.dLhECLIeElRcfx7k5prse08WiCb5ett55qq3KaNd3ZaJWVwUk2TDBwtPwtz-lJeqHgrd9iV18-qoT2l9slEd2A";
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
   })
    return this.http.get<Group[]>(AllGroupsAPI);
  }
}
