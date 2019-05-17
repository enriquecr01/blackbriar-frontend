import { Component, OnInit } from '@angular/core';
import {EndpointsService} from '../Services/endpoints.service';
import { Group } from 'src/app/models/group';


@Component({
  selector: 'app-student-explore',
  templateUrl: './student-explore.component.html',
  styleUrls: ['./student-explore.component.css']
})
export class StudentExploreComponent implements OnInit {
  
  groups = [];

  constructor (private endpoint : EndpointsService)
  {

  }
  
  ngOnInit() {
    this.endpoint.get_AllGroups().
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
