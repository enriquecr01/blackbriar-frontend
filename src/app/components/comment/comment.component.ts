import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Answer } from 'src/app/models/answer';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
    var coll = document.getElementsByClassName("collapsible-comment");
    var i;
    
    for (i = 0; i < coll.length; i++) 
    {
      coll[i].addEventListener("click", function() 
      {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight)
        {
          content.style.maxHeight = null;
        } else 
        {
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    }
    console.log(coll);
  }

  @Input() comment: Answer;

  constructor() { }

  ngOnInit() 
  {
    console.log(this.comment);
  }

}
