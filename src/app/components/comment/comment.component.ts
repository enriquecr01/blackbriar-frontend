import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Answer } from 'src/app/models/answer';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit, AfterViewInit {
  ngAfterViewInit() {
    var coll = document.getElementsByClassName("collapsible-comment ");
    var i;
    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        console.log(this.nextElementSibling);
        if (content.style.maxHeight){
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    }
  }

  @Input() comment: Answer;

  constructor() { }

  ngOnInit() 
  {
    //console.log(this.comment);
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
