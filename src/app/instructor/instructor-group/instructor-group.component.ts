import { Component, OnInit, Input } from '@angular/core';
import { EndpointsService } from '../../student/Services/endpoints.service';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Forum } from 'src/app/models/forum';
import { InstructorForumComponent } from '../instructor-forum/instructor-forum.component';
import { ForumInsertService } from 'src/app/services/forum-insert.service';
import { ForumRequest } from 'src/app/models/forum';

@Component({
  selector: 'app-instructor-group',
  templateUrl: './instructor-group.component.html',
  styleUrls: ['./instructor-group.component.css']
})
export class InstructorGroupComponent implements OnInit {

  forumTitle: string;
  description: string;
  endDate: string;
  warriorScore: number;
  healerScore: number;
  warlockScore: number;
  answerScore: number;
  published: boolean;

  @Input()
  ForumInsertService: ForumInsertService;

  groupId: number;
  forums: any = [];


  constructor(private endpoint: EndpointsService, private route: ActivatedRoute, private forumInsertService: ForumInsertService) { }


  ngOnInit() {
    this.forumInsertService.GroupId = +this.route.snapshot.paramMap.get("groupId");
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


    // GET FORUMS FROM A GROUP
    this.groupId = this.route.snapshot.params["groupId"];


    // ----------------------------------------------------------------------------------------------
    // Get all group forums and save them on "forums"    
    // ----------------------------------------------------------------------------------------------
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
    // ----------------------------------------------------------------------------------------------

  }

  InsertForum() {
    console.log("LE FUUUUCKIIIIING DATA");
    console.log("Title = " + this.forumTitle);
    console.log("Description = " + this.description);
    console.log("End Date = " + "2019-06-04T05:35:37.659Z");
    console.log("Warrior Score = " + this.warriorScore);
    console.log("Healer Score = " + this.healerScore);
    console.log("Warlcok Score = " + this.warlockScore);
    console.log("Answer Score = " + this.answerScore);

    var forum: ForumRequest = {
      title: this.forumTitle,
      description: this.description,
      content: "content",
      endDate: "2019-06-04T05:35:37.659Z",
      warriorPoints: this.warriorScore,
      healerPoints: this.healerScore,
      warlockPoints: this.warlockScore,
      validResponsePoints: this.answerScore,
      published: true

    };


    console.log(forum);

    try {
      this.forumInsertService.addForum(forum).
        subscribe(
          data => {
            console.log(data);
          },
          error => {
            M.toast(error.error.message);
            console.log(error.error.message);
          }
        );
      error => {
        console.log(error.error.message);

      }
    }
    catch (error) {
      console.log(error);
    }


  }

}
