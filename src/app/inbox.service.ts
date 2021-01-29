import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Membership } from './models/membership';
import { Message } from './models/message';

@Injectable({
  providedIn: 'root'
})
export class InboxService {

  constructor(private http: HttpClient) { }

  getUserNotifications() {
    return this.http.get<Message[]>(`https://blackbriar.herokuapp.com/api/messages`);
  }

  instructorAcceptMembership(membershipId) {
    return this.http.put<Membership>(`https://blackbriar.herokuapp.com/api/memberships/${membershipId}/approve`, null);
  }

  rejectInstructorMembership(membershipId) {
    return this.http.delete(`https://blackbriar.herokuapp.com/api/memberships/${membershipId}/deny`);
  }
}


