import { Component, OnInit } from '@angular/core';
import { ForumService } from 'src/app/services/forum.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-instructor-forum-display',
  templateUrl: './instructor-forum-display.component.html',
  styleUrls: ['./instructor-forum-display.component.css']
})
export class InstructorForumDisplayComponent implements OnInit {

  response = "";
  responses = [];

  forumId: string;

  constructor(private forum: ForumService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.forumId = this.route.snapshot.paramMap.get("forumId");
    this.getForumResponses();

  }

  getForumResponses() {
    this.forum.getForumResponses(parseInt(this.forumId)).
      subscribe(
        data => {
          this.responses = data;
          //console.log(data);
        },
        error => {
          console.log("Error", error);
        }
      );
  }

}
