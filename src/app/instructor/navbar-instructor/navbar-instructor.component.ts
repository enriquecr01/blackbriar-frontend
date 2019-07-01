import { Component, OnInit, EventEmitter } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';
import { Router } from '@angular/router';
import { InboxService } from './../../inbox.service';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { MatDialog } from '@angular/material/dialog';
import { HealerInfoComponent } from 'src/app/notifications/healerinfo.component';


@Component({
  selector: 'app-navbar-instructor',
  templateUrl: './navbar-instructor.component.html',
  styleUrls: ['./navbar-instructor.component.css']
})
export class NavbarInstructorComponent implements OnInit {
  modalActions = new EventEmitter<string | MaterializeAction>();

  firstName = localStorage.getItem("firstName");
  lastName = localStorage.getItem("lastName");
  photo = localStorage.getItem('photo');

  notifications = [];

  constructor(
    private router: Router,
    private inboxService: InboxService,
    public dialog: MatDialog
  ) {
    this.initializeWebSocketConnection();
  }

  ngOnInit() {
    //this.transparentColor();
    var elems = document.querySelectorAll('.dropdown-trigger');
    //M.Dropdown.init(elems, {constrainWidth: false});

    var elems1 = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems1);

    var elems2 = document.querySelectorAll('#slide-out');
    M.Sidenav.init(elems2, { edge: "right" });
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

  goToDashboard() {
    this.router.navigate(['instructor/dashboard']);
    this.solidColor();
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('email');
    localStorage.removeItem('photo');
    localStorage.removeItem('student');
    localStorage.clear();
    this.router.navigate(['login']);
  }


  solidColor() {
    var nav = document.getElementById('nav-student');
    nav.style.background = "linear-gradient(90deg, rgba(69,0,99,1) 13%, " + " rgba(67,40,116,1) 40%, " + " rgba(67,40,116,1) 86%)";
    nav.style.opacity = "0.97";
  }

  transparentColor() {
    var nav = document.getElementById('nav-student');
    var optionMenu = document.getElementById('menuOption');
    window.onscroll = function () {
      if (window.pageYOffset > 100) {
        nav.style.background = "linear-gradient(90deg, rgba(69,0,99,1) 13%, " + " rgba(67,40,116,1) 40%, " + " rgba(67,40,116,1) 86%)";
        nav.style.opacity = "0.97";

      } else {
        nav.style.background = "rgba(0, 0, 0, 0.3)";

      }
    }
  }

  public openDialog(): void {
    const ref = this.dialog.open(HealerInfoComponent, {
      width: '600px',
      data: { forumName: 'Test Forum' }
    });

    ref.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}
