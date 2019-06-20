import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ForumService } from '../../services/forum.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
    
  }

  forumId: number;
  forumTitle: string = "";
  forumDescription: string = "";
  responses = [];

  constructor(private activatedRoute: ActivatedRoute, private forumService: ForumService) { }

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

  initCollapsible()
  {    
    var coll = document.getElementsByClassName("collapsible-comment ");
    var i;
    
    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        console.log(this);
        if (content.style.maxHeight){
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    }
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
