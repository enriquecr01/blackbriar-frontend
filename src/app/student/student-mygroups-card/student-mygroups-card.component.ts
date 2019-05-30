import { Component, OnInit, Input } from '@angular/core';
import { Group } from 'src/app/models/group';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-mygroups-card',
  templateUrl: './student-mygroups-card.component.html',
  styleUrls: ['./student-mygroups-card.component.css']
})
export class StudentMygroupsCardComponent implements OnInit {

  

  @Input() group : Group;
  
  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToGroupDashboard(){
    this.router.navigate(['student/student-group']);
  }

}
