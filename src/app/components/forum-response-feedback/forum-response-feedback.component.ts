import { Component, OnInit } from '@angular/core';
import { ForumService } from '../../services/forum.service';
import { ActivatedRoute } from '@angular/router';
import { Feedback } from 'src/app/models/feedback';
import { Answer } from 'src/app/models/answer';
import * as moment from 'moment';

@Component({
  selector: 'app-forum-response-feedback',
  templateUrl: './forum-response-feedback.component.html',
  styleUrls: ['./forum-response-feedback.component.css']
})
export class ForumResponseFeedbackComponent implements OnInit {

  forumId: number;
  forumResponses: Answer[];
  studentName: string;
  temp: number;
  textareaValue: string;


  constructor(private forumService: ForumService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getResponsesFeedbacks();
  }

  openCollapsible(id) {
    var elems = document.querySelectorAll('.collapsible');
    var instance = M.Collapsible.init(elems);
    console.log("answer ID: " + id);
    this.temp = id;
  }
  2 // TODO: Ask wtf is this
  getResponsesFeedbacks() {

    this.forumId = +this.route.snapshot.params["forumId"];
    console.log("FORUM ID => " + this.forumId);
    this.forumService.getForumResponses(this.forumId).subscribe(
      response => {

        this.forumResponses = response;
        this.forumResponses = this.forumResponses.filter(function (fResponse) {
          return fResponse.approved == true && fResponse.replies.length > 0;
        });

        for (let i = 0; i < this.forumResponses.length; i++) {

          this.forumResponses[i].feedbackQuantity = this.forumResponses[i].replies.length;
          console.log("Response " + i + " has : " + this.forumResponses[i].feedbackQuantity + " feedbacks");
          for (let j = 0; j < this.forumResponses[i].replies.length; j++) {
            this.forumResponses[i].replies[j].createdSince = moment(this.forumResponses[i].replies[j].created).startOf('day').fromNow();
          }

          //console.log(this.forumResponses[i].replies);
        }


      }, error => {
        console.log("Error -> getForumResponses", error);
      }
    )

  }

}
