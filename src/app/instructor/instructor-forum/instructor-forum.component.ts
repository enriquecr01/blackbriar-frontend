import { Component, OnInit, Input } from '@angular/core';
import { Forum } from '../../models/forum';

@Component({
  selector: 'app-instructor-forum',
  templateUrl: './instructor-forum.component.html',
  styleUrls: ['./instructor-forum.component.css']
})
export class InstructorForumComponent implements OnInit {

  @Input() forums: Forum;

  constructor() { }

  ngOnInit() {
  }
}
