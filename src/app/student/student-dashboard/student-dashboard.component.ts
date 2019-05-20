import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {EndpointsService} from '../Services/endpoints.service';
import { Group } from 'src/app/models/group';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {

  groups = [];

  constructor (private router: Router, private endpoint : EndpointsService)
  {

  }

  ngOnInit() {

  }

  goToMyGroups(){
    this.router.navigate(['student/student-mygroups']);
  }

  goToExplore(){
    this.router.navigate(['student/student-explore']);
  }
}
