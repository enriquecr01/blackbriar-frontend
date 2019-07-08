import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { InboxService } from './../../inbox.service';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { MatDialog } from '@angular/material/dialog';
import { HealerInfoComponent } from 'src/app/notifications/healerinfo.component';
import { HealerAlertComponent } from 'src/app/notifications/healeralert.component';
import { WarlockAlertComponent } from 'src/app/notifications/warlockalert.component';
import { LoginComponent } from '../../login/login.component';
import { ScoreReportComponent } from 'src/app/notifications/scorereport.component';

@Component({
  selector: 'app-student-navbar',
  templateUrl: './student-navbar.component.html',
  styleUrls: ['./student-navbar.component.css']
})
export class StudentNavbarComponent implements OnInit, OnDestroy {
  firstName = localStorage.getItem("firstName");
  lastName = localStorage.getItem("lastName");

  photo = localStorage.getItem('photo');
  instance: any;

  notifications = [];
  stompClient;

  ngOnDestroy() {
    this.stompClient.disconnect();
    this.stompClient.unsubscribe();
  }

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private inboxService: InboxService,
    private loginComponent: LoginComponent
  ) {
    this.initializeWebSocketConnection();
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
    M.Sidenav.init(elems, { edge: "right", draggable: true });

    const dropdown = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(dropdown, {
      closeOnClick: false
    });

    this.inboxService.getUserNotifications()
      .subscribe(
        (inboxMessages) => { this.notifications = inboxMessages; },
        ({ error }) => { M.toast({ html: error.message }); }
      )
  }

  initializeWebSocketConnection() {

    var socket = new SockJS('https://api.blackbriar.site/gs-guide-websocket');
    this.stompClient = Stomp.over(socket);
    var userId = localStorage.getItem('userId');

    let that = this;
    var counter: Number;

    this.stompClient.connect({}, function (frame) {
      that.stompClient.subscribe(`/topic/${userId}`, function ({ body }) {
        var data = JSON.parse(body);
        counter = 1;

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
        } else if (data.category === 'FORUM_SCORES_POPUP') {
          that.dialog.open(ScoreReportComponent, {
            width: '800px',
            height: '600px',
            data: {
              forumId: data.actionRef,
              studentId: localStorage.getItem('userId')
            }
          });
        } else {
          that.updateNotificationCounter(counter);
          that.notifications.unshift(data);
        }
      });
    });
  }

  openNotificationDropdown() {


    var elems = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elems, {
      closeOnClick: false,
    });

    console.log("opened dropdown");
  }

  openCollapsible() {
    var elems = document.querySelectorAll('.collapsible');
    var instance = M.Collapsible.init(elems);

    console.log("Opened collapsible!");
  }

  updateNotificationCounter(count: Number) {

    var bell = document.querySelector('.notification');
    console.log("Notificacions => " + count);

    // count = Number(bell.getAttribute('data-count')) || 0;
    bell.setAttribute('data-count', count.toString());
    //bell.classList.remove('notify');
    // bell.offsetWidth = bell.offsetWidth;
    bell.classList.add('notify');
    if (count === 1) {
      bell.classList.add('show-count');
    }
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
