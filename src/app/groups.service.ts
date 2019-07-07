import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Group } from './models/group';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(private http: HttpClient) {
    console.log("grupos");
  }

  getInstructorGroups() {
    var userId = localStorage.getItem("userId");

    return this.http.get<Group[]>(`https://api.blackbriar.site/api/groups/owned`);
  }

  addGroupService(title, description, image, publicGroup) {
    return this.http.post<Group>(`https://api.blackbriar.site/api/groups`, {
      title: title,
      description: description,
      image: image,
      publicGroup: publicGroup
    });
  }


  editGroup(description, publicGroup, groupId) {
    return (image) => {
      return this.http.put<Group>(`https://api.blackbriar.site/api/groups/${groupId}`, {
        description: description,
        image: image,
        publicGroup: publicGroup
      });
    }
  }

    deleteGroupService(groupId){
      return this.http.delete<Group>(`https://api.blackbriar.site/api/groups/${groupId}`, {
      });
    }

    getOneGroup(groupId: number) {
      var groupForums = `https://api.blackbriar.site/api/groups/${groupId}`;
      return this.http.get<Group>(groupForums);
    }

    getStudentsOfGroup(groupId: number) {
      var groupForums = `https://api.blackbriar.site/api/groups/${groupId}/students`;
      return this.http.get<User[]>(groupForums);
    }
  }
