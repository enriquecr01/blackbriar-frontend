import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { InboxService } from './../../inbox.service';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { MatDialog } from '@angular/material/dialog';
import { HealerInfoComponent } from 'src/app/notifications/healerinfo.component';
import { HealerAlertComponent } from 'src/app/notifications/healeralert.component';
import { WarlockAlertComponent } from 'src/app/notifications/warlockalert.component';

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

  constructor(private router: Router, public dialog: MatDialog) {
    this.initializeWebSocketConnection();
    console.log('Me inicialize wao woa wao');
  }

  ngOnInit() {

    var nav = document.getElementById('nav-student');
    var optionMenu = document.getElementById('menuOption');
    /*
    window.onscroll = function () {
      if (window.pageYOffset > 100) {
        nav.style.background = "linear-gradient(90deg, rgba(69,0,99,1) 13%, " + " rgba(67,40,116,1) 40%, " + " rgba(67,40,116,1) 86%)";
        nav.style.opacity = "0.97";

      } else {
        nav.style.background = "rgba(0, 0, 0, 0.3)";

      }
    }
    */

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

        if (data.category === 'FMHLA') {
          that.dialog.open(HealerAlertComponent, {
            width: '600px',
            data: { dialogMessage: data.content }
          });
        } else if (data.category === 'FMHLI') {
          that.dialog.open(HealerInfoComponent, {
            width: '600px',
            data: { dialogMessage: data.content }
          });
        } else if (data.category === 'FMWLK') {
          that.dialog.open(WarlockAlertComponent, {
            width: '600px',
            data: { dialogMessage: data.content }
          });
        } else {
          that.notifications.unshift(data);
        }
      });
    });
  }

  goToMyGroups() {
    this.router.navigate(['student/dashboard']);
  }

  goToExplore() {
    this.router.navigate(['student/explore']);
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

}
