import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Answer } from 'src/app/models/answer';

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

  constructor() { }

  ngOnInit() 
  {
    if(this.comment.replies.length > 0)
    {
      this.hasFeedback = true;
    }
  }

    
  toggleAccordian(event, index) {
    var element = event.target;
    element.classList.toggle("active");
    if(this.comment[index].isActive) {
      this.comment[index].isActive = false;
    } else {
      this.comment[index].isActive = true;
    }      
    var panel = element.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  }

}
