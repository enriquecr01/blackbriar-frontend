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
  @Output() refresh = new EventEmitter<string>();

  constructor(private router: Router, private dashboard: StudentMygroupsComponent) { }

  ngOnInit() {
    this.membership = this.group.membership;  
    this.membershipId = this.membership.id;
    
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
  }

  m()
  {
    this.dashboard.unsubscribeMeAlert(this.group.membership.id)
  }

  goToGroupForums(groupId: number) {   
    this.router.navigate(['student/group/',groupId]);
  }
  
  goToGroupDashboard() {    this.router.navigate(['student/student-group']);
  }


}
