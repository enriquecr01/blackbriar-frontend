import { Component, OnInit, EventEmitter } from '@angular/core';
import {MaterializeAction } from 'angular2-materialize';
import * as $ from 'jquery';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-instructor',
  templateUrl: './navbar-instructor.component.html',
  styleUrls: ['./navbar-instructor.component.css']
})
export class NavbarInstructorComponent implements OnInit {
  modalActions = new EventEmitter<string|MaterializeAction>();

  firstName = localStorage.getItem("firstName");
  lastName = localStorage.getItem("lastName");
  
  photo = localStorage.getItem('photo');
  

  constructor(private router:Router) { }

  ngOnInit()
  {
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems, {constrainWidth: false});

    var elems1 = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems1);
  }

  goToDashboard(){
    this.router.navigate(['instructor/instructor-dashboard']);
  }


}
