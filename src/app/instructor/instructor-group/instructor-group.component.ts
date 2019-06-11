import { Component, OnInit, Input } from '@angular/core';
import { EndpointsService } from '../../student/Services/endpoints.service';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Forum } from 'src/app/models/forum';
import { InstructorForumComponent } from '../instructor-forum/instructor-forum.component';
import { ForumInsertService } from 'src/app/services/forum-insert.service';
import { ForumRequest } from 'src/app/models/forum';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-instructor-group',
  templateUrl: './instructor-group.component.html',
  styleUrls: ['./instructor-group.component.css']
})
export class InstructorGroupComponent implements OnInit {

  groupId: number;
    
  forumTitle: string;
  description: string;
  endDate: string;
  warriorScore: number;
  healerScore: number;
  warlockScore: number;
  answerScore: number;
  published: boolean;

  ForumInsertService: ForumInsertService;

  forums: any = [];


  constructor(private endpoint: EndpointsService, private router: ActivatedRoute, private forumInsertService: ForumInsertService) { }


  ngOnInit() {
    

    this.forumInsertService.GroupId = +this.router.snapshot.paramMap.get("groupId");
    this.groupId = +this.router.snapshot.paramMap.get("groupId");
    
    
    var elems = document.querySelectorAll('.tabs');
    var instance = M.Tabs.init(elems);
    
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
