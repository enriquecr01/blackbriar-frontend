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
    // this.initCollapsible();
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
        //this.ejemplo = this.sanitizer.bypassSecurityTrustHtml(data.content);
        //this.forumDescription = this.ejemplo.changingThisBreaksApplicationSecurity;
        this.forumDescription = data.content;
        this.getForumResponses();
      },
      error =>{
        console.log("Error", error);
      }
    );

  }

  // initCollapsible()
  // {    
  //   var coll = document.getElementsByClassName("collapsible-comment");
  //   var i;

  //   for (i = 0; i < coll.length; i++) {
  //     coll[i].addEventListener("click", function() {
  //       this.classList.toggle("active");
  //       var content = this.nextElementSibling;
  //       if (content.style.display === "block") {
  //         content.style.display = "none";
  //       } else {
  //         content.style.display = "block";
  //       }
  //     });
  //   }
  //   console.log(coll);
  //   console.log("puto");
  // }

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
