
import {ForumComponent} from './../group-activities/forum/forum.component';
import { Component, OnInit, Input } from '@angular/core';
import { EndpointsService } from '../../Student/Services/endpoints.service';
import { Group } from '../../models/group';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-instructor-group',
  templateUrl: './instructor-group.component.html',
  styleUrls: ['./instructor-group.component.css']
})
export class InstructorGroupComponent implements OnInit {


  @Input() group : Group;
  groupId: number;
  forums: any = []; 

  constructor(private endpoint: EndpointsService, private route: ActivatedRoute) { }

  ngOnInit() {
    
    // MODAL START
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
    // MODAL - DATE PICKER START
    var elems = document.querySelectorAll('.datepicker');
    M.Datepicker.init(elems);
    // MODAL - TIME PICKER START
    var elems = document.querySelectorAll('.timepicker');
    M.Timepicker.init(elems);

  
    // FLOATING BUTTON
    var elems = document.querySelectorAll('.fixed-action-btn');
    M.FloatingActionButton.init(elems);  

    this.groupId = this.route.snapshot.params["groupId"];

    this.endpoint.getGroupForums(this.groupId).subscribe(
      forums => {
        this.forums = forums;
        console.log(this.forums);
      },
      error => {
        console.log("Error -> getGroupForums", error);
      })
   
  }

}
