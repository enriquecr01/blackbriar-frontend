import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Group } from '../../../app/models/group';
import { Forum } from '../../../app/models/forum';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EndpointsService {

  siteUrl: string = 'https://api.blackbriar.site/api';
  userId = localStorage.getItem('userId');

  token = "Bearer " + localStorage.getItem("token");

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token
    })
  }


  constructor(private http: HttpClient) { }

  get_StudentRegisteredGroups() {
    var studentsRegisteredGroupsAPI = `${this.siteUrl}/users/${this.userId}/groups/subscribed`;
    return this.http.get<Group[]>(studentsRegisteredGroupsAPI, this.httpOptions);
  }

  get_AllGroups() {
    //var userId = "KbgSRGca21WWzyJ901xNKGeQk2kOfW";
    var AllGroupsAPI = `${this.siteUrl}/groups`;
    return this.http.get<Group[]>(AllGroupsAPI, this.httpOptions);
  }

  joinGroup(groupId: number) {
    var membershipGroupAPI = `${this.siteUrl}/memberships`;
    let jsonCoded = { groupId: groupId };
    return this.http.post(membershipGroupAPI, jsonCoded, this.httpOptions);
  }

  // GET Forums from a Group
  getGroupForums(groupId: number) {
    var groupForums = `${this.siteUrl}/groups/${groupId}/forums`;
    return this.http.get(groupForums, this.httpOptions);
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

  // Add Forum
  addForum(groupId: number, forum: Forum): Observable<Forum> {
    var addForum = `${this.siteUrl}/groups/${groupId}/forums`;
    return this.http.post<Forum>(addForum, forum, this.httpOptions);
  }
}
