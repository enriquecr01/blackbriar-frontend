import { Component, OnInit, EventEmitter } from '@angular/core';
import {MaterializeAction } from 'angular2-materialize';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { InboxService } from './../../inbox.service';
import { Message } from './../../models/message';


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

  notifications = [];
  

  constructor(private router:Router, private inboxService: InboxService) 
  { 
  }

  ngOnInit()
  {
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems, {constrainWidth: false});

    var elems1 = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems1);

    var elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems, {edge: "right"});

    setInterval(() => {
      this.inboxService.getInstructorLatestNotification().subscribe(
        data  => 
        { 
          this.notifications.push(data);
          console.log("GET Request is successful ", data);
        },
        error  => 
        { 
          console.log("Error", error);
        }
      );
    }, 1000);
  }

  goToDashboard(){
    this.router.navigate(['instructor/instructor-dashboard']);
  }
}
