import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css/dist/js/materialize';

import { Router } from '@angular/router';
import { Auth } from './../../auth';


@Component({
  selector: 'app-instructor-dashboard',
  templateUrl: './instructor-dashboard.component.html',
  styleUrls: ['./instructor-dashboard.component.css']
})
export class InstructorDashboardComponent implements OnInit {

  constructor(private router: Router, private auth: Auth) { }

  ngOnInit() {
    this.auth.getExpiration();
    const elems = document.querySelectorAll('.dropdown-trigger');
    const instances = M.Dropdown.init(elems);
  }

  logout()
  {
    this.router.navigate(['home']);
  }

}
