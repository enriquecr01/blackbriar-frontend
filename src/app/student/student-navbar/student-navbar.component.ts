import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-navbar',
  templateUrl: './student-navbar.component.html',
  styleUrls: ['./student-navbar.component.css']
})
export class StudentNavbarComponent implements OnInit {

  firstName = localStorage.getItem("firstName");
  lastName = localStorage.getItem("lastName");
  
  photo = localStorage.getItem('photo');

  constructor (private router: Router)
  {

  }

  ngOnInit() {
    var elems1 = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems1);
  }

  goToMyGroups(){
    this.router.navigate(['student/student-mygroups']);
  }

  goToExplore(){
    this.router.navigate(['student/student-explore']);
  }

}
