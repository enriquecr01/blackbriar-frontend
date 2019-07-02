import { Component, OnInit } from '@angular/core';
import { ForumService } from '../../services/forum.service';
import { ActivatedRoute } from '@angular/router';
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
  feedbackQuantity: 0;
  feedbackObject: any;

  constructor(private forumService: ForumService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getResponsesFeedbacks();

  }

  openAnswerCollapsible(id) {
    var elems = document.querySelectorAll('.collapsible');
    var instance = M.Collapsible.init(elems);
    this.answer = id;
  }

  openFeedbackCollapsible(id) {
    var elems = document.querySelectorAll('.collapsible');
    var instance = M.Collapsible.init(elems);
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
    this.forumService.getForumResponses(this.forumId).subscribe(
      response => {
        this.forumResponses = response;
        this.forumResponses = this.forumResponses.filter(function (fResponse) {
          fResponse.replies = fResponse.replies.filter(function (reply) { return reply.approved == false });
          return fResponse.approved == true && fResponse.replies.length > 0;
        });

        var responses = this.forumResponses.length;
        for (let i = 0; i < responses; i++) {
          this.forumResponses[i].feedbackQuantity = this.forumResponses[i].replies.length;
          for (let j = 0; j < this.forumResponses[i].replies.length; j++) {
            this.forumResponses[i].replies[j].createdSince = moment(this.forumResponses[i].replies[j].created).startOf('day').fromNow();
          }
        }
      }, error => {
        console.log("Error -> getForumResponses", error);
      }
    )

  }

  delete(id: number, parentId: number) {
    let indexParent = this.arrayObjectIndexOf(this.forumResponses, parentId, "id");
    let indexChild = this.arrayObjectIndexOf(this.forumResponses[indexParent].replies, id, "id");
    this.forumResponses[indexParent].replies.splice(indexChild, 1);


    this.forumService.deleteForumFeedback(id).
      subscribe(
        data => {
          let index = this.arrayObjectIndexOf(this.forumResponses, id, "replies.id");
        },
        error => {
          console.log(error);
        }
      );

    this.forumResponses[indexParent].feedbackQuantity -= 1;
    M.toast({ html: 'Feedback has been deleted!' });

    this.forumResponses = this.forumResponses.filter(function (fResponse) {
      fResponse.replies = fResponse.replies.filter(function (reply) { return reply.approved == false });
      return fResponse.approved == true && fResponse.replies.length > 0;
    });

  }


  approve(id: number, parentId: number) {
    let indexParent = this.arrayObjectIndexOf(this.forumResponses, parentId, "id");
    let indexChild = this.arrayObjectIndexOf(this.forumResponses[indexParent].replies, id, "id");

    var reason = this.textareaValue;

    this.forumResponses[indexParent].replies[indexChild].approved = true;
    this.forumService.toggleForumFeedback(id, true, reason).subscribe();
    this.forumResponses[indexParent].feedbackQuantity -= 1;
    M.toast({ html: 'Feedback has been approved!' });


    this.forumResponses = this.forumResponses.filter(function (fResponse) {
      fResponse.replies = fResponse.replies.filter(function (reply) { return reply.approved == false });
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
