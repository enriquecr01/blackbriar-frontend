import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-instructor-group',
  templateUrl: './instructor-group.component.html',
  styleUrls: ['./instructor-group.component.css']
})
export class InstructorGroupComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  
    $(document).ready(function(){
      $('.fixed-action-btn').floatingActionButton();
    });
   
  }

}
