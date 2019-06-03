import { Component, OnInit, Input } from '@angular/core';
import { Forum } from '../../models/forum';

@Component({
  selector: 'app-student-forum',
  templateUrl: './student-forum.component.html',
  styleUrls: ['./student-forum.component.css']
})
export class StudentForumComponent implements OnInit {

  @Input() forum: Forum;

  constructor() { }

  ngOnInit() {
  }

  setClasses() {
    let classes = {
      forum: true,
      'visible': this.forum.visible
    };

    return classes;
  }

}
