import { Component, OnInit, Input } from '@angular/core';
import { Forum } from '../../models/forum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-forum',
  templateUrl: './student-forum.component.html',
  styleUrls: ['./student-forum.component.css']
})
export class StudentForumComponent implements OnInit {

  @Input() forums: Forum;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToForum(forumId: number)
  {
    console.log(forumId);
    this.router.navigate(['forum/',forumId]);
  }
}
