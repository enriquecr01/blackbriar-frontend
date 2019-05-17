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
    var userId = "QFFnJ0apbv1NdXf8EJHtLa5ukur2Xo";
    console.log(`http://api.blackbriar.site/users/${userId}/groups/member`);
    let token = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJRRkZuSjBhcGJ2MU5kWGY4RUpIdExhNXVrdXIyWG8iLCJleHAiOjE1NTg5NzY2MTJ9.wq8_fRWykzq1xpHkk6_aEuR6lw8JkXTKfEPZkZAV5-s2VETVjOSXUdOvQLau9PWX3_beycka8RCiFdbb6rSCag";
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    })
    return this.http.get<Group[]>(`http://api.blackbriar.site/api/users/${userId}/groups/owned`, { headers: headers });
  }
}
