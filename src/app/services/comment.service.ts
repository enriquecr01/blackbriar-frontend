import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Answer } from '../models/answer';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  commentForum(comment: string, forumId: number)
  {
    return this.http.post<Answer>(`${environment.apiURL}forums/${forumId}/answers`, {
      content: comment,
    });
  }
}
