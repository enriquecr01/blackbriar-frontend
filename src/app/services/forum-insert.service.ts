import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Forum } from '../models/forum';
import { Title } from '@angular/platform-browser';


@Injectable({
  providedIn: 'root'
})
export class ForumInsertService {

  GroupId : number;

  constructor(private http: HttpClient) { }

  addForum(forum: Forum)
  {
    var userId = localStorage.getItem("userId");
    
    let jsonCoded = JSON.stringify({ 
       
        
        //GroupId: forum.GroupId,   
        
        title: forum.title,
        description: forum.description,
        content: forum.content,
        endDate: forum.eDate,
        warriorPoints: forum.warlockPoints,
        healerPoints: forum.healerPoints,
        warlockPoints: forum.warlockPoints,
        validResponsePoints: forum.validResponsePoints,
        published: forum.published
   
      });
    console.log(jsonCoded);
    let token = "Bearer " + localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    })
    
    return this.http.post<Forum>(`https://api.blackbriar.site/api/groups/${this.GroupId}/forums`, jsonCoded, { headers: headers });
  }
}