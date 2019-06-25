import { Component, OnInit, ɵConsole } from '@angular/core';
import { ForumService } from 'src/app/services/forum.service';
import { Setting, ForumMemberState, ForumResponse } from 'src/app/models/forum';
import { EndpointsService } from 'src/app/student/Services/endpoints.service';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from 'src/app/services/comment.service';


@Component({
  selector: 'app-forum-ui',
  templateUrl: './forum-ui.component.html',
  styleUrls: ['./forum-ui.component.css']
})
export class ForumUiComponent implements OnInit {
  students : any = [];
  id: number;
  title: string;
  descriptionForum: string;
  contentForum: string;
  published: boolean;
  created: Date;
  settings: Setting;
  scoreboard: [ForumMemberState];

  response = "";
  responses = [];

  forumId:string;
  
  constructor(
    private forum: ForumService, 
    private route :ActivatedRoute, 
    private comments: CommentService
  ) { }

  ngOnInit() {
    this.forumId = this.route.snapshot.paramMap.get("forumId");

    this.getForumStudents(); 
    //this.getForumResponses();


    $('.tabs').tabs();

    var elems = document.querySelectorAll('.collapsible');
    M.Collapsible.init(elems);
        
  }
  
  getForumStudents(){
       this.forum.getStudents(parseInt(this.forumId)).subscribe(
        students =>{
            this.id = students.id;
            this.title = students.title;
            this.descriptionForum = students.description;
            this.contentForum = students.content;
            this.published = students.published;
            this.created = students.created;
            this.settings = students.settings;
            this.scoreboard = students.scoreboard;

            document.getElementById('contentForum').innerHTML = students.content;
          
        }

      );
      
  }


  createFeedback(answerId: number, comment: string){
    this.comments.responseAnswer(answerId,comment);
  }

}
