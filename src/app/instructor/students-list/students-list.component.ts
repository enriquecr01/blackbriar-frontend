import { Component, OnInit, Input } from '@angular/core';
import { GroupsService } from './../../groups.service';

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

  constructor(private groupsService : GroupsService) { }

  ngOnInit() {

    this.groupsService.getStudentsOfGroup(this.groupId).subscribe(
      data => {
        this.students = data;
        console.log(data);
        for (let i = 0; i < this.students.length; i++) 
        {
          if(this.students[i].membership.invitation && !this.students[i].membership.invitation)
          {
            this.studentsAwaiting.push(this.students[i]);
          } 
          else
          {
            this.studentsActive.push(this.students[i]);
          } 
        }
        var elems = document.querySelectorAll('.collapsible');
        var instances = M.Collapsible.init(elems);
      },
      error => {
        console.log("Error -> getGroupForums", error);
      }
    );
  }

}
