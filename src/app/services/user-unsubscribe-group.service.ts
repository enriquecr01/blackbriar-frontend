import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserUnsubscribeGroupService {
 domain : string = "https://api.blackbriar.site/api/";

  constructor(membershipId:number, private http: HttpClient) { }

  unsubcribe_from_group(membershipId : number){
    const url = this.domain + "memberships/" + membershipId;
    this.http.delete(url);
  }

}
