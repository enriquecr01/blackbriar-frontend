import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ForumService } from '../../services/forum.service';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { MarkdownEditorComponent } from '../../markdown-editor/markdown-editor.component';

@Component({
  selector: 'app-forum-response',
  templateUrl: './forum-response.component.html',
  styleUrls: ['./forum-response.component.css']
})
export class ForumResponseComponent implements OnInit {

  forumId: number;
  forumResponses: any[];
  studentName: string;

  constructor(private forumService: ForumService, private route: ActivatedRoute) { }

  ngOnInit() {


    this.forumId = +this.route.snapshot.params["forumId"];
    console.log("FORUM ID => " + this.forumId);
    this.forumService.getForumResponses(this.forumId).subscribe(
      response => {

        this.forumResponses = response;
        this.forumResponses = this.forumResponses.reverse();

        let actualDate = moment().format();

        for (let i = 0; i < this.forumResponses.length; i++) {
          this.forumResponses[i].created = moment(this.forumResponses[i].created).startOf('day').fromNow();
        }

        console.log(response);
        document.getElementById('content').innerHTML = this.forumResponses[2].content;


      }, error => {
        console.log("Error -> getForumResponses", error);
      }
    )

  }

  openCollapsible() {
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems);
  }

  decline(id: number) {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
    console.log("Declined " + id);
  }

  aprove(id: number) {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
    console.log("Aproved" + id);
  }

}
