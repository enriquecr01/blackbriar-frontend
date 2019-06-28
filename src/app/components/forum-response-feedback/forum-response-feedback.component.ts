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
  feedback: number;
  answer: number;
  textareaValue: string;
  feedbackQuantity: number;

  constructor(private forumService: ForumService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getResponsesFeedbacks();

  }

  openAnswerCollapsible(id) {
    var elems = document.querySelectorAll('.collapsible');
    var instance = M.Collapsible.init(elems);
    console.log("answer ID: " + id);
    this.answer = id;
  }

  openFeedbackCollapsible(id) {
    var elems = document.querySelectorAll('.collapsible');
    var instance = M.Collapsible.init(elems);
    console.log("feedback ID: " + id);
    this.feedback = id;
  }

  declineModal() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
  }

  approveModal() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
  }

  getResponsesFeedbacks() {

    this.forumId = +this.route.snapshot.params["forumId"];
    //console.log("FORUM ID => " + this.forumId);
    this.forumService.getForumResponses(this.forumId).subscribe(
      response => {

        this.forumResponses = response;
        console.log(this.forumResponses);
        this.forumResponses = this.forumResponses.filter(function (fResponse) {

          // fResponse.replies.filter(function (reply) { return reply.approved == false; });

          return fResponse.approved == true && fResponse.replies.length > 0;
        });



        var responses = this.forumResponses.length;
        for (let i = 0; i < responses; i++) {

          this.forumResponses[i].feedbackQuantity = this.forumResponses[i].replies.length;
          //console.log("Response " + i + " has : " + this.forumResponses[i].feedbackQuantity + " feedbacks");
          for (let j = 0; j < this.forumResponses[i].replies.length; j++) {
            this.forumResponses[i].replies[j].createdSince = moment(this.forumResponses[i].replies[j].created).startOf('day').fromNow();

            console.log(this.forumResponses[i].replies[j].studentDetails.firstName);
          }
        }


      }, error => {
        console.log("Error -> getForumResponses", error);
      }
    )

  }

  decline(id: number, feedback: Feedback) {
    console.log("Declined:  " + id);
    //console.log(this.forumResponses);

    var reason = this.textareaValue;

    for (let i = 0; i < this.forumResponses.length; i++) {

      if (this.forumResponses[i].id == id) {

        for (let j = 0; j < this.forumResponses[i].replies.length; j++) {
          this.forumResponses[i].replies[j].approved = false;
          console.log(this.forumResponses[i].replies[j].approved);
        }

        console.log("array: " + i + "id: " + id);
        this.forumService.toggleForumFeedback(id, false, reason).subscribe();
        //console.log("Done decline ");
        M.toast({ html: 'Feedback has been declined!' });

      }

    }
    this.forumResponses = this.forumResponses.filter(function (fResponse) {
      return fResponse.approved == true && fResponse.replies.length > 0;
    });
  }


  approve(id: number) {
    console.log("Approved: " + id);
    //console.log(this.forumResponses);

    var reason = this.textareaValue;

    for (let i = 0; i < this.forumResponses.length; i++) {

      if (this.forumResponses[i].id == id) {
        for (let j = 0; j < this.forumResponses[i].replies.length; j++) {
          this.forumResponses[i].replies[j].approved = true;
          console.log(this.forumResponses[i].replies[j].approved);
        }
        console.log("array: " + i + "id: " + id);
        this.forumService.toggleForumFeedback(id, true, reason).subscribe();
        //console.log("Done approve ");
        M.toast({ html: 'Feedback has been approved!' });
      }

    }

    this.forumResponses = this.forumResponses.filter(function (fResponse) {
      return fResponse.approved == true && fResponse.replies.length > 0;
    });
  }

}
