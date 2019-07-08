import { Component, OnInit } from '@angular/core';
import { EndpointsService } from '../../student/Services/endpoints.service';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-instructor-group',
  templateUrl: './instructor-group.component.html',
  styleUrls: ['./instructor-group.component.css']
})
export class InstructorGroupComponent implements OnInit {
  groupId: number;
  forumInsertService: any;
  forums: any = [];

  constructor(
    private endpoint: EndpointsService,
    private router: ActivatedRoute
  ) { }

  ngOnInit() {

    const elems = document.querySelectorAll('.tabs');
    M.Tabs.init(elems);

    this.groupId = +this.router.snapshot.paramMap.get("groupId");

    // ----------------------------------------------------------------------------------------------
    // Get all group forums and save them on "forums"
    // ----------------------------------------------------------------------------------------------
    this.groupId = +this.router.snapshot.paramMap.get("groupId");

    // ----------------------------------------------
    // Get all group forums and save them on "forums"
    // ----------------------------------------------
    this.endpoint.getGroupForums(this.groupId).subscribe(
      forums => {
        this.forums = forums;
        this.forums = this.forums.reverse();
        let actualDate = moment().format();
        console.log(this.forums);
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
}
