import { Component, OnInit } from '@angular/core';
import { ForumService } from '../../services/forum.service';
import { ActivatedRoute } from '@angular/router';
import { Feedback } from 'src/app/models/feedback';
import { Answer } from 'src/app/models/answer';
import * as moment from 'moment';
import { ReplaySubject } from 'rxjs';

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
  feedbackObject: any;

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
          fResponse.replies = fResponse.replies.filter(function (reply) { return reply.approved == false });
          return fResponse.approved == true;
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

  delete(id: number, parentId: number) {
    console.log("Deleting:  " + id);
    let indexParent = this.arrayObjectIndexOf(this.forumResponses, parentId, "id");
    let indexChild = this.arrayObjectIndexOf(this.forumResponses[indexParent].replies, id, "id");
    this.forumResponses[indexParent].replies.splice(indexChild, 1);

    this.forumService.deleteForumFeedback(id).
      subscribe(
        data => {
          console.log(data);
          let index = this.arrayObjectIndexOf(this.forumResponses, id, "replies.id");
        },
        error => {
          console.log(error);
        }
      );
    //console.log("Done delete ");
    M.toast({ html: 'Feedback has been deleted!' });


    this.forumResponses = this.forumResponses.filter(function (fResponse) {

      return fResponse.approved == true && fResponse.replies.length > 0;
    });
  }


  approve(id: number, parentId: number) {
    console.log("Approving: " + id);

    let indexParent = this.arrayObjectIndexOf(this.forumResponses, parentId, "id");
    let indexChild = this.arrayObjectIndexOf(this.forumResponses[indexParent].replies, id, "id");

    var reason = this.textareaValue;




    this.forumResponses[indexParent].replies[indexChild].approved = true;
    this.forumService.toggleForumFeedback(id, true, reason).subscribe();
    M.toast({ html: 'Feedback has been approved!' });


    this.forumResponses = this.forumResponses.filter(function (fResponse) {
      return fResponse.approved == true && fResponse.replies.length > 0;
    });
  }

  arrayObjectIndexOf(myArray, searchTerm, property) {
    for (var i = 0, len = myArray.length; i < len; i++) {
      if (myArray[i][property] === searchTerm) return i;
    }
    return -1;
  }

}
