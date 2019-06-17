import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ForumService } from '../../services/forum.service';
import { DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  forumId: number;
  forumTitle: string = "";
  forumDescription: string = "";
  ejemplo: any;

  constructor(private activatedRoute: ActivatedRoute, private forumService: ForumService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.forumId = this.activatedRoute.snapshot.params.forumId;

    this.forumService.getForum(this.forumId).
    subscribe(
      data => {
        this.forumTitle = data.title;
        //this.ejemplo = this.sanitizer.bypassSecurityTrustHtml(data.content);
        //this.forumDescription = this.ejemplo.changingThisBreaksApplicationSecurity;
        this.forumDescription = data.content;
        console.log(this.ejemplo);
        console.log(data);
      },
      error =>{
        console.log("Error", error);
      }
    );

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
