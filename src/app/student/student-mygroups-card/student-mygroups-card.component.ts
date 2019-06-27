import { Component, OnInit, Input, Output } from '@angular/core';
import { Group } from 'src/app/models/group';
import { Router } from '@angular/router';
import { group } from '@angular/animations';
import { UserUnsubscribeGroupService } from 'src/app/services/user-unsubscribe-group.service';
import { Membership } from 'src/app/models/membership';

@Component({
  selector: 'app-student-mygroups-card',
  templateUrl: './student-mygroups-card.component.html',
  styleUrls: ['./student-mygroups-card.component.css']
})
export class StudentMygroupsCardComponent implements OnInit {

  membership : Membership;

  @Input() group: Group;

  constructor(private router: Router, private test : UserUnsubscribeGroupService) { }

  ngOnInit() {
    this.membership = this.group.membership;
  }

  goToGroupForums(groupId: number) {   
    this.router.navigate(['student/group/',groupId]);
  }
  
  goToGroupDashboard() {
    this.router.navigate(['student/student-group']);
  }

  unsubscribeMe(membershipId : number) {
    this.test.unsubcribe_from_group(membershipId);
    console.log("works" + membershipId);
  }

}
