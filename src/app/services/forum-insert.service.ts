import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Forum } from '../models/forum';
import { Title } from '@angular/platform-browser';


@Injectable({
  providedIn: 'root'
})
export class ForumInsertService {

  GroupId: number;

  constructor(private http: HttpClient) { }

}