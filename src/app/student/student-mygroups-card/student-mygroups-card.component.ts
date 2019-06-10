import { Component, OnInit, Input, Output } from '@angular/core';
import { Group } from 'src/app/models/group';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-mygroups-card',
  templateUrl: './student-mygroups-card.component.html',
  styleUrls: ['./student-mygroups-card.component.css']
})
export class StudentMygroupsCardComponent implements OnInit {

  @Input() group: Group;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToGroupForums(groupId: number) {
    //console.log("Has entrado al grupo: " + ggroupId + ' - ' + group.title);
    this.router.navigate(['student/student-groupforums', { groupId }]);
  }
<<<<<<< HEAD
  goToGroupDashboard(){
=======
  
  goToGroupDashboard() {
>>>>>>> 8640b0e7746c4d9344ffbefdfa42119a9e00bbf0
    this.router.navigate(['student/student-group']);
  }

}
