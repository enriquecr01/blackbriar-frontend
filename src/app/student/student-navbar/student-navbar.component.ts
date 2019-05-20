import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-navbar',
  templateUrl: './student-navbar.component.html',
  styleUrls: ['./student-navbar.component.css']
})
export class StudentNavbarComponent implements OnInit {

  constructor (private router: Router)
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
