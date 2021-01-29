import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Forum } from '../models/forum';
import { ForumRequest, ForumResponse, ForumRole } from '../models/forum';
import { map } from 'rxjs/operators';
import { Answer } from '../models/answer';

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  constructor(private http: HttpClient) { }

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

  createForum(forum: ForumRequest, groupId: number) {
    return this.http.post<ForumResponse>(
      `https://blackbriar.herokuapp.com/api/groups/${groupId}/forums`,
      forum
    );
  }

  get roleInfo() {
    return this.roles;
  }

  getForum(forumId) {
    return this.http.get<Forum>(`${environment.apiURL}forums/${forumId}`);
  }


  // Forum Responses
  getForumResponses(forumId: number) {
    return this.http.get<Answer[]>(`${environment.apiURL}forums/${forumId}/answers`);
  }

  // Decline/Approve forum response
  toggleForumResponse(answer: number, action: boolean, reason: string) {
    const url = `${environment.apiURL}answers/${answer}/review`;
    return this.http.put(url, {
      reason: reason,
      approved: action
    });
  }

  // Decline/Approve response feedback
  toggleForumFeedback(feedback: number, action: boolean, reason: string) {
    const url = `${environment.apiURL}feedback/${feedback}/review`;
    return this.http.put(url, {
      reason: reason,
      approved: action
    });
  }

  // Delete Forum Feedback
  deleteForumFeedback(feedback: number) {
    const url = `${environment.apiURL}feedback/${feedback}`;
    return this.http.delete(url);
  }


  getStudents(forumId: number) {
    return this.http.get<ForumResponse>(`https://blackbriar.herokuapp.com/api/forums/${forumId}`);
  }

  finishForum(forumId: number) {
    return this.http.put<ForumResponse>(`${environment.apiURL}forums/${forumId}/finish`, null);
  }
}
