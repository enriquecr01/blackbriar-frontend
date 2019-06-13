import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ForumService } from '../../services/forum.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  forumId: number;
  forumTitle: string = "";
  forumDescription: string = "";

  constructor(private activatedRoute: ActivatedRoute, private forumService: ForumService) { }

  ngOnInit() {
    this.forumId = this.activatedRoute.snapshot.params.forumId;

    this.forumService.getForum(this.forumId).
    subscribe(
      data => {
        this.forumTitle = data.title;
        this.forumDescription = data.content;
        console.log(data);
      },
      error =>{
        console.log("Error", error);
      }
    )
  }

  initCollapsible()
  {    
    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
          content.style.display = "none";
        } else {
          content.style.display = "block";
        }
      });
    }
  }

}
