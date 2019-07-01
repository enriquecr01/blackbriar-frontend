import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Group } from 'src/app/models/group';
import { Router } from '@angular/router';
import { group } from '@angular/animations';
import { Membership } from 'src/app/models/membership';
import { EndpointsService } from '../Services/endpoints.service';
import { StudentMygroupsComponent } from '../student-mygroups/student-mygroups.component';

@Component({
  selector: 'app-student-mygroups-card',
  templateUrl: './student-mygroups-card.component.html',
  styleUrls: ['./student-mygroups-card.component.css']
})
export class StudentMygroupsCardComponent implements OnInit {

  membership : Membership;
  membershipId : number;

  @Input() group: Group;
  @Input() parent: StudentMygroupsComponent;
  @Output() refresh = new EventEmitter<string>();

  constructor(private router: Router, public test : EndpointsService) { }

  ngOnInit() {
    this.membership = this.group.membership;  
    this.membershipId = this.membership.id;
    
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
  }

  goToGroupForums(groupId: number) {   
    this.router.navigate(['student/group/',groupId]);
  }
  
  goToGroupDashboard() {
    this.router.navigate(['student/student-group']);
  }

  unsubscribeMe(membershipId : number) {
    this.test.unsubcribeFromGroup(membershipId);
    console.log(membershipId);
    this.parent.updateGroups();
  }

}
