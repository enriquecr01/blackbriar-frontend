import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ForumRequest, ForumResponse, ForumRole } from '../models/forum';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  roles: ForumRole[] = [
    {
      name: 'warrior',
      iconPath: 'assets/Images/Icons/helmet.svg',
      description: 'If the student with this role is the first person to have a comment approved by the instructor, extra points will be assigned to them.'
    },
    {
      name: 'healer',
      iconPath: 'assets/Images/Icons/healer.svg',
      description: 'Students who give feedback to comments will give extra points to every participant once when the instructor approves their reply.'
    },
    {
      name: 'warlock',
      iconPath: 'assets/Images/Icons/warlock.svg',
      description: 'When the activity finishes, for every student with this role who didn\'t make any comment, points will be subtracted to everyone.'
    }
  ]

  constructor(private http: HttpClient) { }

  createForum(forum: ForumRequest, groupId: number) {
    return this.http.post<ForumResponse>(
      `https://api.blackbriar.site/api/groups/${groupId}/forums`,
      forum,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    ).pipe(
      map(({ scoreboard }) => {
        return scoreboard.filter(({healer, warrior, warlock}) => {
          console.log(`${healer} ${warrior} ${warlock}`);
          return healer || warrior || warlock;
        })
      })
    )
  }

  get roleInfo() {
    return this.roles;
  }
}
