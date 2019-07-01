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
          const userId = localStorage.getItem('userId');
          // Declaracion de una funcion
          const isMine = (comment) => comment.studentDetails !== null &&
            comment.studentDetails.userId === userId;

          // Se realiza una funcion ForEach de data que son las respuestas
          data.forEach((answer: any) => {
            answer.mine = isMine(answer)
            // Se realiza un Foreach pero de las respuestas de una respuesta
            answer.replies.forEach((feedback: any) => {
              feedback.mine = isMine(feedback)
            })
          })

          this.responses = data;
        },
        error => {
          console.log("Error", error);
        }
      );
  }

}
