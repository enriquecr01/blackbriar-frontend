import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Membership } from './models/membership';

@Injectable({
  providedIn: 'root'
})
export class InboxService {

  constructor(private http: HttpClient) { }

  instructorAcceptMembership(membershipId)
  {
    let token = "Bearer " + localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Authorization': token
    });
    //Cuando no se le envia un body se ingresa un null
    return this.http.put<Membership>(`https://api.blackbriar.site/api/memberships/${membershipId}/approve`, null,{headers: headers});
  }

  rejectInstructorMembership(membershipId)
  {
    let token = "Bearer " + localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Authorization': token
    });
    return this.http.delete(`https://api.blackbriar.site/api/memberships/${membershipId}/deny`, {headers: headers});
  }
}


