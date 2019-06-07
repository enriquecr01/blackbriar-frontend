import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Group } from '../../../app/models/group';
import { Forum } from '../../../app/models/forum';

let token = "Bearer " + localStorage.getItem("token");

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': token
  })
}

@Injectable({
  providedIn: 'root'
})
export class EndpointsService {

  siteUrl: string = 'https://api.blackbriar.site/api';
  userId = localStorage.getItem('userId');

  constructor(private http: HttpClient) { }

  get_StudentRegisteredGroups() {
    var studentsRegisteredGroupsAPI = `${this.siteUrl}/users/${this.userId}/groups/subscribed`;
    return this.http.get<Group[]>(studentsRegisteredGroupsAPI, httpOptions);
  }

  get_AllGroups() {
    //var userId = "KbgSRGca21WWzyJ901xNKGeQk2kOfW";
    var AllGroupsAPI = `${this.siteUrl}/groups`;
    return this.http.get<Group[]>(AllGroupsAPI, httpOptions);
  }

  joinGroup(groupId: number) {
    var membershipGroupAPI = `${this.siteUrl}/memberships`;
    let jsonCoded = { groupId: groupId };
    return this.http.post(membershipGroupAPI, jsonCoded, httpOptions);
  }

  // GET Forums from a Group
  getGroupForums(groupId: number) {
    var groupForums = `${this.siteUrl}/groups/${groupId}/forums`;
    return this.http.get(groupForums, httpOptions);
  }

  getOneGroup(groupId: number)
  {
    let token = "Bearer " + localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });
    var groupForums = `${this.siteUrl}/groups/${groupId}`;
    return this.http.get<Group>(groupForums, {headers: headers});
  }
}
