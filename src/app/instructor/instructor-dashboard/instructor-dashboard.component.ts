import { Component, OnInit } from '@angular/core';

import { AppComponent } from './../../app.component';
import { Router } from '@angular/router';
import { Auth } from './../../auth';

@Component({
  selector: 'app-instructor-dashboard',
  templateUrl: './instructor-dashboard.component.html',
  styleUrls: ['./instructor-dashboard.component.css']
})
export class InstructorDashboardComponent implements OnInit {

  constructor(private router: Router, private appComponent: AppComponent, private auth: Auth) { }

  ngOnInit() {
    this.auth.getToken();
    this.appComponent.loggedIn;
  }

  logout()
  {
    this.appComponent.loggedIn = false;
    this.router.navigate(['home']);
  }

}
