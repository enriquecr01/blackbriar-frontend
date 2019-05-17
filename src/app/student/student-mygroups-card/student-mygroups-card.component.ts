import { Component, OnInit, Input } from '@angular/core';
import { Group } from 'src/app/models/group';

@Component({
  selector: 'app-student-mygroups-card',
  templateUrl: './student-mygroups-card.component.html',
  styleUrls: ['./student-mygroups-card.component.css']
})
export class StudentMygroupsCardComponent implements OnInit {

  @Input() group : Group;
  
  constructor() { }

  ngOnInit() {
  }

}
