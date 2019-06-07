import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Group } from './models/group';
import { User } from './models/user';

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
    var userId = localStorage.getItem("userId");

    let token = "Bearer " + localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    })
    return this.http.get<Group[]>(`https://api.blackbriar.site/api/users/${userId}/groups/owned`, { headers: headers });
  }

  addGroupService(title, description, image, publicGroup)
  {
    var userId = localStorage.getItem("userId");
    let jsonCoded = JSON.stringify({ title: title, description: description, image: image, publicGroup: publicGroup });
    let token = "Bearer " + localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    })
    return this.http.post<Group>(`https://api.blackbriar.site/api/users/${userId}/groups/owned`, jsonCoded, { headers: headers });
  }

  getOneGroup(groupId: number)
  {
    let token = "Bearer " + localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });
    var groupForums = `https://api.blackbriar.site/api/groups/${groupId}`;
    return this.http.get<Group>(groupForums, {headers: headers});
  }

  getStudentsOfGroup(groupId: number)
  {
    let token = "Bearer " + localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });
    var groupForums = `https://api.blackbriar.site/api/groups/${groupId}/students`;
    return this.http.get<User[]>(groupForums, {headers: headers});
  }
}
