import { Component, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { EndpointsService } from '../Services/endpoints.service';
import { StudentForumComponent } from '../student-forum/student-forum.component';
import { Group } from '../../models/group';
import { Forum } from '../../models/forum';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-student-group-forums',
  templateUrl: './student-group-forums.component.html',
  styleUrls: ['./student-group-forums.component.css']
})

export class StudentGroupForumsComponent implements OnInit {

  group: Group;
  forums: any = [];
  groupId: number;


  constructor(private endpoint: EndpointsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.groupId = this.route.snapshot.params["groupId"];

    var elems = document.querySelectorAll('.tabs');
    var instance = M.Tabs.init(elems);

    // Get all group forums and save them on "forums"    
    this.endpoint.getGroupForums(this.groupId).subscribe(
      forums => {
        this.forums = forums;
        this.forums = this.forums.reverse();
        let actualDate = moment().format();

        for (let i = 0; i < this.forums.length; i++) {
          if (this.forums[i].settings.endDate < actualDate) {
            this.forums[i].expired = false;
          } else {
            this.forums[i].expired = true;
          }

          this.forums[i].eDate = moment(this.forums[i].settings.endDate).format('MMM Do YY');
          this.forums[i].eTime = moment(this.forums[i].settings.endDate).format('h:mm:ss a');

          this.forums[i].sDate = moment(this.forums[i].startDate).format("MMM Do YY");
          this.forums[i].sTime = moment(this.forums[i].startDate).format("h:mm:ss a");

          this.forums[i].smallDescription = this.forums[i].description.substring(0, 70);
          console.log(this.forums[i].smallDescription);

        }
      },
      error => {
        console.log("Error -> getGroupForums", error);
      }
    )
  }
  setClasses() {
    let classes = {
      forum: true,
      'visible': this.forums.visible
    };
    return classes;
  }





}