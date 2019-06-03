import { Component, OnInit, Input } from '@angular/core';
import { EndpointsService } from '../Services/endpoints.service';
import { Group } from '../../models/group';
import { group } from '@angular/animations';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-group-forums',
  templateUrl: './student-group-forums.component.html',
  styleUrls: ['./student-group-forums.component.css']
})
export class StudentGroupForumsComponent implements OnInit {

  @Input() group: Group;
  groupId: number;

  forums: any = [];

  constructor(private endpoint: EndpointsService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.groupId = this.route.snapshot.params["groupId"];

    this.endpoint.getGroupForums(this.groupId).subscribe(
      forums => {
        this.forums = forums;
        console.log(this.forums);
      },
      error => {
        console.log("Error -> getGroupForums", error);
      }
    )
  }

}
