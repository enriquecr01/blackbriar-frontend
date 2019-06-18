import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { InboxService } from './../../inbox.service';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Component({
  selector: 'app-student-navbar',
  templateUrl: './student-navbar.component.html',
  styleUrls: ['./student-navbar.component.css']
})
export class StudentNavbarComponent implements OnInit {



  firstName = localStorage.getItem("firstName");
  lastName = localStorage.getItem("lastName");

  photo = localStorage.getItem('photo');
  instance: any;

  notifications = [];

  constructor(private router: Router) {
    this.initializeWebSocketConnection();
  }

  ngOnInit() {
    var elems1 = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems1);


    var elems = document.querySelectorAll('#slide-out');
    M.Sidenav.init(elems, { edge: "right" });

    var elems = document.querySelectorAll('.dropdown-trigger');
    var instance = M.Dropdown.init(elems, {
      coverTrigger: false,
      constrainWidth: false,
    });

  }



  initializeWebSocketConnection() {
    var socket = new SockJS('https://api.blackbriar.site/gs-guide-websocket');
    var stompClient = Stomp.over(socket);
    var userId = localStorage.getItem('userId');

    let that = this;

    stompClient.connect({}, function (frame) {
      stompClient.subscribe(`/topic/${userId}`, function ({ body }) {
        var data = JSON.parse(body);
        console.log(data);
        that.notifications.unshift(data);
      });
    });
  }

  goToMyGroups() {
    this.router.navigate(['student/dashboard']);
  }

  goToExplore() {
    this.router.navigate(['student/explore']);
  }

}
