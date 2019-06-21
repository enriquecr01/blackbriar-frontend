import { Component, OnInit } from '@angular/core';
import { ForumService } from '../../services/forum.service';
import { ActivatedRoute } from '@angular/router';
import { MarkdownEditorComponent } from '../../markdown-editor/markdown-editor.component';

@Component({
  selector: 'app-forum-response',
  templateUrl: './forum-response.component.html',
  styleUrls: ['./forum-response.component.css']
})
export class ForumResponseComponent implements OnInit {

  forumId: number;
  forumResponses: any[];

  constructor(private forumService: ForumService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.forumId = +this.route.snapshot.params["forumId"];
    console.log("FORUM ID => " + this.forumId);
    this.forumService.getForumResponses(this.forumId).subscribe(
      response => {
        this.forumResponses = response;
        this.forumResponses = this.forumResponses.reverse();
        console.log(response);
        document.getElementById('content').innerHTML = this.forumResponses[2].content;
      }, error => {
        console.log("Error -> getForumResponses", error);
      }
    )

  }

}
