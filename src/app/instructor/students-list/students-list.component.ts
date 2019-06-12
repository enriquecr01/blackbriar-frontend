import { Component, OnInit, Input } from '@angular/core';
import { GroupsService } from './../../groups.service';
import { InboxService } from '../../inbox.service';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {
  
  @Input() groupId: number;
  students = [];
  studentsAwaiting = [];
  studentsActive = [];
  studentsWaitingApproval = [];

  constructor(private groupsService : GroupsService, private inboxService: InboxService) { }

  ngOnInit() {
    try
    {
      var elems = document.querySelectorAll('.collapsible');
      var instance = M.Collapsible.init(elems);
    }
    catch(error)
    {
      console.log(error);
    }
    this.callStudents();
  }

  callStudents()
  {
    this.students = [];
    this.studentsActive = [];
    this.studentsAwaiting = [];
    this.studentsWaitingApproval = [];
    this.groupsService.getStudentsOfGroup(this.groupId).subscribe(
      data => {
        this.students = data;
        console.log(data);
        for (let i = 0; i < this.students.length; i++) 
        {
          if(this.students[i].membership.invitation && !this.students[i].membership.active)
          {
            this.studentsAwaiting.push(this.students[i]);
          } 
          else if(!this.students[i].membership.active && !this.students[i].membership.invitation)
          {
            this.studentsWaitingApproval.push(this.students[i]);
            console.log(this.studentsWaitingApproval[i].membership.id);
          } 
          else if(this.students[i].membership.active)
          {
            this.studentsActive.push(this.students[i]);
          } 
        }
      },
      error => {
        console.log("Error -> getGroupForums", error);
      }
    );
  }
  
  acceptRequestInstructor(membershipId)
  {
    console.log(membershipId);
    this.inboxService.instructorAcceptMembership(membershipId).
    subscribe(
      data  => 
      { 
        console.log(data);
        M.toast({html: data.statusMessage}); 
        this.callStudents();
      },
      error  => 
      { 
        console.log(error);
        M.toast({html: error.error.message}); 
      }
    ); 
  }

  rejectRequestInstructor(membershipId)
  {
    console.log(membershipId);
    this.inboxService.rejectInstructorMembership(membershipId).
    subscribe(
      data  => 
      { 
        console.log(data);
        M.toast({html: "You rejected the student"}); 
        this.callStudents();
      },
      error  => 
      { 
        console.log(error);
        M.toast({html: "Error"}); 
      }
    );
  }

}
