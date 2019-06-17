import { Component, OnInit, EventEmitter } from '@angular/core';
import {MaterializeAction } from 'angular2-materialize';
import { Router } from '@angular/router';
import { InboxService } from './../../inbox.service';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';


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
     
    this.initializeWebSocketConnection();
  }

  ngOnInit()
  {
    var elems = document.querySelectorAll('.dropdown-trigger');
    //M.Dropdown.init(elems, {constrainWidth: false});
    
    var elems1 = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems1);

    var elems2 = document.querySelectorAll('#slide-out');
    M.Sidenav.init(elems2, {edge: "right"});
  }

  initializeWebSocketConnection(){
    var socket = new SockJS('https://api.blackbriar.site/gs-guide-websocket');
    var stompClient = Stomp.over(socket);
    var userId = localStorage.getItem('userId');

    let that = this;
    
    stompClient.connect({}, function (frame) {
        stompClient.subscribe(`/topic/${userId}`, function({ body }) {
          var data = JSON.parse(body);
          console.log(data);
          that.notifications.unshift(data);
        });
    });
  }
  
  goToDashboard(){
    this.router.navigate(['instructor/instructor-dashboard']);
  }

  
  logOut()
  {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
