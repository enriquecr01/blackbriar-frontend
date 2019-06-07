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
  title: string = "";
  description: string = "";
  image: string = "";
  groupId: number;
  instructorImage: string = "";
  instructorName: string = "";

  forums: any = [];

  constructor(private endpoint: EndpointsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.groupId = this.route.snapshot.params["groupId"];
    var elems = document.querySelectorAll('.parallax');
    var instances = M.Parallax.init(elems);

    var modalElems = document.querySelectorAll('.modal');
    M.Modal.init(modalElems);

    this.endpoint.getGroupForums(this.groupId).subscribe(
      forums => {
        this.forums = forums;
        console.log(this.forums);
      },
      error => {
        console.log("Error -> getGroupForums", error);
      }
    )

    this.endpoint.getOneGroup(this.groupId).subscribe(
      group => {
        console.log(group);
        this.title = group.title;
        this.description = group.description;
        this.image = group.image;
        this.instructorName = group.owner.firstName + " " + group.owner.lastName;
        this.instructorImage = group.owner.photo;
        console.log(this.description);
      },
      error => {
        console.log("Error -> getGroupForums", error);
      }
    )
  }

}
