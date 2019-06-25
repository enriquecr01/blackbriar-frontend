import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ForumService } from '../../services/forum.service';
import { CommentService } from '../../services/comment.service';
import { Answer } from 'src/app/models/answer';

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
  commented : boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private forumService: ForumService, private commentService: CommentService) { }

  ngOnInit() {
    this.forumId = this.activatedRoute.snapshot.params.forumId;
    
    this.forumService.getForum(this.forumId).
    subscribe(
      data => {
        this.forumTitle = data.title;
        this.forumDescription = data.content;
        document.getElementById('contentForum').innerHTML = this.forumDescription;
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
        this.getForumResponses();
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
        const userId = localStorage.getItem('userId');
        // Declaracion de una funcion
        const isMine = (comment) => comment.studentDetails !== null && 
          comment.studentDetails.userId === userId;
        
        // Se realiza una funcion ForEach de data que son las respuestas
        data.forEach((answer:any) => {
          answer.mine = isMine(answer)
          // Se realiza un Foreach pero de las respuestas de una respuesta
          answer.replies.forEach((feedback:any) => {
            feedback.mine = isMine(feedback)
          })
        })
        
        this.responses = data;
        this.commented = (this.responses.length > 0) ? this.commented = true : this.commented = false;
        console.log(this.responses);
      },
      error =>{
        console.log("Error", error);
      }
    );
  }

}
