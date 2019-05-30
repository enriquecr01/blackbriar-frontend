import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-instructor-group',
  templateUrl: './instructor-group.component.html',
  styleUrls: ['./instructor-group.component.css']
})
export class InstructorGroupComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  
    var elems = document.querySelectorAll('.fixed-action-btn');
    var instances = M.FloatingActionButton.init(elems);
  }

}
