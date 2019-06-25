import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Answer } from 'src/app/models/answer';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit, AfterViewInit {
  ngAfterViewInit() {
  }

  @Input() comment: Answer;
  hasFeedback: boolean = false;
  feedback: string = "";


  constructor(private commentService: CommentService) { }

  ngOnInit() 
  {
    if(this.comment.replies.length > 0)
    {
      this.hasFeedback = true;
    }
  }

  registerComment(answerId)
  {
    
    this.commentService.responseAnswer(answerId, this.feedback).
    subscribe(
      data => {
        console.log(data);
      },
      error =>{
        console.log("Error", error);
      }
    );
  }

}
