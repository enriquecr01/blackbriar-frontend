import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css/dist/js/materialize';

@Component({
  selector: 'app-navbar-instructor',
  templateUrl: './navbar-instructor.component.html',
  styleUrls: ['./navbar-instructor.component.css']
})
export class NavbarInstructorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  open() 
  {
    const elem = document.getElementById("drop");
    const instance = M.Dropdown.init(elem);
    instance.open();
  }

}
