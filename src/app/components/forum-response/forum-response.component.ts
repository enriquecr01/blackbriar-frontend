import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ForumService } from '../../services/forum.service';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Answer } from '../../models/answer';

@Component({
  selector: 'app-forum-response',
  templateUrl: './forum-response.component.html',
  styleUrls: ['./forum-response.component.css']
})
export class ForumResponseComponent implements OnInit, AfterViewInit {

  @Input() answer: Answer;

  forumId: number;
  forumResponses: Answer[];
  studentName: string;
  temp: number;

  constructor(private forumService: ForumService, private route: ActivatedRoute) { }

  ngOnInit() {


    this.getForumResponses();
    const counterFields = document.querySelectorAll('.counted');
    M.CharacterCounter.init(counterFields);

  }

  ngAfterViewInit() {
    const counterFields = document.querySelectorAll('.counted');
    M.CharacterCounter.init(counterFields);
  }

  getForumResponses() {
    this.forumId = +this.route.snapshot.params["forumId"];
    console.log("FORUM ID => " + this.forumId);
    this.forumService.getForumResponses(this.forumId).subscribe(
      response => {

        this.forumResponses = response;
        this.forumResponses = this.forumResponses.filter(function (fResponse) {
          return fResponse.approved == null;
        })
        this.forumResponses = this.forumResponses.reverse();

        for (let i = 0; i < this.forumResponses.length; i++) {

          this.forumResponses[i].createdSince = moment(this.forumResponses[i].created).startOf('day').fromNow();
        }


      }, error => {
        console.log("Error -> getForumResponses", error);
      }
    )

  }

  openCollapsible(id) {
    var elems = document.querySelectorAll('.collapsible');
    var instance = M.Collapsible.init(elems);
    console.log("answer ID: " + id);
    this.temp = id;
  }

  declineModal() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
  }

  approveModal() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
  }

  decline(id: number, answer: Answer) {
    console.log("Declined:  " + id);
    console.log(this.forumResponses);

    for (let i = 0; i < this.forumResponses.length; i++) {

      if (this.forumResponses[i].id == id) {
        this.forumResponses[i].approved == false;
        console.log("array: " + i + "id: " + id);
        this.forumService.toggleForumResponse(id, false).subscribe();
        console.log("Done decline ");
        M.toast({ html: 'Response has been declined!' });
      }

    }
    this.getForumResponses();
  }


  approve(id: number, answer: Answer) {
    console.log("Approved: " + id);
    console.log(this.forumResponses);

    for (let i = 0; i < this.forumResponses.length; i++) {

      if (this.forumResponses[i].id == id) {
        this.forumResponses[i].approved == true;
        console.log("array: " + i + "id: " + id);
        this.forumService.toggleForumResponse(id, true).subscribe();
        console.log("Done approve ");
        M.toast({ html: 'Response has been approved!' });
      }

    }
    this.getForumResponses();
  }

}
