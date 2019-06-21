import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ForumService } from '../../services/forum.service';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  forumId: number;
  forumTitle: string = "";
  forumDescription: string = "";
  response = "";
  responses = [];

  constructor(private activatedRoute: ActivatedRoute, private forumService: ForumService, private commentService: CommentService) { }

  ngOnInit() {
    this.forumId = this.activatedRoute.snapshot.params.forumId;

    this.forumService.getForum(this.forumId).
    subscribe(
      data => {
        this.forumTitle = data.title;
        this.forumDescription = data.content;
        this.getForumResponses();
      },
      error =>{
        console.log("Error", error);
      }
    );

  }

  registerComment()
  {
    this.commentService.commentForum(this.response, this.forumId).
    subscribe(
      data => {
        console.log(data);
      },
      error =>{
        console.log("Error", error);
      }
    );
  }

  getForumResponses()
  {
    this.forumService.getForumResponses(this.forumId).
    subscribe(
      data => {
        this.responses = data;
        console.log(data);
      },
      error =>{
        console.log("Error", error);
      }
    );
  }

}
