import { Component, OnInit } from '@angular/core';
import {ForumComponent} from './../group-activities/forum/forum.component';


@Component({
  selector: 'app-instructor-group',
  templateUrl: './instructor-group.component.html',
  styleUrls: ['./instructor-group.component.css']
})
export class InstructorGroupComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    
    // MODAL START
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
  
    // FLOATING BUTTON
    var elems = document.querySelectorAll('.fixed-action-btn');
    M.FloatingActionButton.init(elems);  
   
  }

}
