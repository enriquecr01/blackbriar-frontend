import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Answer } from '../models/answer';
import { Feedback } from '../models/feedback';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  commentForum(comment: string, forumId: number) {
    return (files: string[]) => {
      return this.http.post(`${environment.apiURL}forums/${forumId}/answers`, {
        content: comment,
        files: files.join(',')
      });
    }
  }

  responseAnswer(answerId: number, comment: string)
  {
    return (files: string[]) => {
      return this.http.post<Feedback>(`${environment.apiURL}answers/${answerId}/replies`, {
        content: comment,
        files: files.join(',')
      });
    }
  }

  editAnswer(comment: string, answerId: number)
  {
    return (files: string[]) => {
      return this.http.put<Answer>(`${environment.apiURL}answers/${answerId}`, {
        content: comment,
        files: files.join(',')
      });
    }
  }
}
