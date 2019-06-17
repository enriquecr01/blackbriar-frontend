import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forum-ui',
  templateUrl: './forum-ui.component.html',
  styleUrls: ['./forum-ui.component.css']
})
export class ForumUiComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var elems = document.querySelectorAll('.collapsible');
    M.Collapsible.init(elems);
  
    var coll = document.getElementsByClassName("collapsible-comment ");
    var i;
    
    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight){
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    }
  }

}
