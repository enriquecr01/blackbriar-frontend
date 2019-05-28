import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-instructor-group',
  templateUrl: './instructor-group.component.html',
  styleUrls: ['./instructor-group.component.css']
})
export class InstructorGroupComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  
    // Left Side Nav
    $(document).ready(function(){
      $('.sidenav').sidenav();
    });
    console.log($('.sidenav'));
  }

}
