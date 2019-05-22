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
    var userId = localStorage.getItem("userId");
    console.log(`http://api.blackbriar.site/users/${userId}/groups/member`);
    let token = "Bearer " + localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    })
    return this.http.get<Group[]>(`http://api.blackbriar.site/api/users/${userId}/groups/owned`, { headers: headers });
  }

  addGroup(title, description, image, publicGroup)
  {
    var userId = localStorage.getItem("userId");
    let jsonCoded = JSON.stringify({ title: title, description: description, image: image, publicGroup: publicGroup });
    let token = "Bearer " + localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    })
    return this.http.post<Group>(`http://api.blackbriar.site/api/users/${userId}/groups/owned`, jsonCoded, { headers: headers });
  }
}
