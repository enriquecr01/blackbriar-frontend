import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  constructor() { }

  ngOnInit() 
  {
    
    var coll = document.getElementsByClassName("collapsible-comment ");
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
  }

}
