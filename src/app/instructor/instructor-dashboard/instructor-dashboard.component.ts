import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css/dist/js/materialize';

import { Router } from '@angular/router';
import { Auth } from './../../auth';

import { GroupsService } from './../../groups.service';


@Component({
  selector: 'app-instructor-dashboard',
  templateUrl: './instructor-dashboard.component.html',
  styleUrls: ['./instructor-dashboard.component.css']
})
export class InstructorDashboardComponent implements OnInit {

  constructor(private router: Router, private auth: Auth, private groupsService: GroupsService) { }

  groups = [];

  ngOnInit() {
    this.auth.getExpiration();

    console.log(this.groupsService.getInstructorGroups());
    this.groupsService.getInstructorGroups().
    subscribe(
      data  => 
      { 
        console.log("GET Request is successful ", data);
        this.groups = data;
      },
      error  => 
      { 
        console.log("Error", error); 
      }
    );
  }

  /*ngAfterViewInit() {
    const dropdown = document.querySelectorAll(".dropdown-trigger");
    M.Dropdown.init(dropdown,{coverTrigger: false});
  }*/


  logout()
  {
    this.router.navigate(['home']);
  }

}
