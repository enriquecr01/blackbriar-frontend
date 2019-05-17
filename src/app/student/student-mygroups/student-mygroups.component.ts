import { Component, OnInit } from '@angular/core';
import {EndpointsService} from '../Services/endpoints.service';
import { Group } from 'src/app/models/group';


@Component({
  selector: 'app-student-mygroups',
  templateUrl: './student-mygroups.component.html',
  styleUrls: ['./student-mygroups.component.css']
})
export class StudentMygroupsComponent implements OnInit {

  groups = [];

  constructor(private endpoint : EndpointsService) { }

  ngOnInit() {
    this.endpoint.get_StudentRegisteredGroups().
    subscribe(
      data => {
        this.groups = data;
      },
      error =>{
        console.log("Error", error);
      }
    )
  }

}
