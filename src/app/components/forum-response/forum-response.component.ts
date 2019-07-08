import { Component, OnInit, Input } from '@angular/core';
import { ForumService } from '../../services/forum.service';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Answer } from '../../models/answer';

@Component({
  selector: 'app-forum-response',
  templateUrl: './forum-response.component.html',
  styleUrls: ['./forum-response.component.css']
})
export class ForumResponseComponent implements OnInit {

  @Input() answer: Answer;

  forumId: number;
  forumResponses: Answer[];
  studentName: string;
  temp: number;
  textareaValue: string;

  constructor(private forumService: ForumService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.textareaValue = "";
    this.getForumResponses();
  }


  getForumResponses() {

    this.forumId = +this.route.snapshot.params["forumId"];
    console.log("FORUM ID => " + this.forumId);
    this.forumService.getForumResponses(this.forumId).subscribe(
      response => {

        this.forumResponses = response;
        this.forumResponses = this.forumResponses.filter(function (fResponse) {
          return fResponse.approved == null;
        });
        

        for (let i = 0; i < this.forumResponses.length; i++) {
          let files = this.forumResponses[i].files.split(',');
          if(this.forumResponses[i].files != "" && this.forumResponses[i].files)
          {
            console.log(files);
            const extractFileType = fileName => fileName.match(/\d+-(.+)\.([a-z]+)$/i)[2].toLowerCase();
            const extractFileName = fileName => fileName.match(/\d+-(.+)\.([a-z]+)$/i)[1];
            
            let arrayFiles = [];
            for (let file of files) {
              let gettingFileWithTimestamp = file.split('/');
              let fileTypeAndName = { "name": extractFileName(gettingFileWithTimestamp[4]), "type": extractFileType(gettingFileWithTimestamp[4]), "url": file };
              arrayFiles.push(fileTypeAndName);
            }
            this.forumResponses[i].filesArray = arrayFiles;
  
          }
          this.forumResponses[i].createdSince = moment(this.forumResponses[i].created).fromNow();
        }
        console.log(this.forumResponses);
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

    var reason = this.textareaValue;

    for (let i = 0; i < this.forumResponses.length; i++) {

      if (this.forumResponses[i].id == id) {

        this.forumResponses[i].approved = false;
        console.log(this.forumResponses[i].approved);

        console.log("array: " + i + "id: " + id);
        this.forumService.toggleForumResponse(id, false, reason).subscribe();
        console.log("Done decline ");
        M.toast({ html: 'Response has been declined!' });

      }

    }
    this.forumResponses = this.forumResponses.filter(function (fResponse) {
      return fResponse.approved == null;
    });
  }


  approve(id: number, answer: Answer) {
    console.log("Approved: " + id);
    console.log(this.forumResponses);

    var reason = this.textareaValue;

    for (let i = 0; i < this.forumResponses.length; i++) {

      if (this.forumResponses[i].id == id) {
        this.forumResponses[i].approved = true;
        console.log("array: " + i + "id: " + id);
        this.forumService.toggleForumResponse(id, true, reason).subscribe();
        console.log("Done approve ");
        M.toast({ html: 'Response has been approved!' });
      }

    }

    this.forumResponses = this.forumResponses.filter(function (fResponse) {
      return fResponse.approved == null;
    });
  }

}
