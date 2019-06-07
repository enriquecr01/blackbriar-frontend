import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GroupsService } from './../../groups.service';


@Component({
  selector: 'app-instructor-group',
  templateUrl: './instructor-group.component.html',
  styleUrls: ['./instructor-group.component.css']
})
export class InstructorGroupComponent implements OnInit {


  @Input() groupId: number;
  title: string = "";
  description: string = "";
  image: string = "";
  instructorImage: string = "";
  instructorName: string = "";

  students = [];

  constructor(private route: ActivatedRoute, private groupsService: GroupsService) { }

  ngOnInit() {
    this.groupId = this.route.snapshot.params["groupId"];
    var elems = document.querySelectorAll('.parallax');
    M.Parallax.init(elems);

    this.groupsService.getOneGroup(this.groupId).subscribe(
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

    
    var elems = document.querySelectorAll('.collapsible');
    M.Collapsible.init(elems);

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

    this.groupsService.getStudentsOfGroup(this.groupId).subscribe(
      data => {
        console.log(data);
        this.students = data;
      },
      error => {
        console.log("Error -> getGroupForums", error);
      }
    )
   
  }

}
