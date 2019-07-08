import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Group } from '../../../app/models/group';
import { Forum } from '../../../app/models/forum';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EndpointsService {
  siteUrl: string = 'https://api.blackbriar.site/api';

  constructor(private http: HttpClient, private router: Router) { }

  get_StudentRegisteredGroups() {
    let userId = localStorage.getItem('userId');
    var studentsRegisteredGroupsAPI = `${this.siteUrl}/groups/subscribed`;
    
    return this.http.get<Group[]>(studentsRegisteredGroupsAPI);
  }

  get_AllGroups() {
    var AllGroupsAPI = `${this.siteUrl}/groups`;

    return this.http.get<Group[]>(AllGroupsAPI);
  }

  joinGroup(groupId: number) {
    var membershipGroupAPI = `${this.siteUrl}/memberships`;

    return this.http.post(membershipGroupAPI, { groupId: groupId });
  }

  getGroupForums(groupId: number) {
    var groupForums = `${this.siteUrl}/groups/${groupId}/forums`;

    return this.http.get(groupForums);
  }
  getOneGroup(groupId: number) {
    var groupForums = `${this.siteUrl}/groups/${groupId}`;

    return this.http.get<Group>(groupForums);
  }

  // Add Forum
  addForum(groupId: number, forum: Forum): Observable<Forum> {
    var addForum = `${this.siteUrl}/groups/${groupId}/forums`;

    return this.http.post<Forum>(addForum, forum);
  }

  public unsubcribeFromGroup(membershipId : number){
    const url = this.siteUrl + "/memberships/";
    return this.http.delete(url + membershipId);
    
  }

  
}
