import { Component, OnInit, ɵConsole } from '@angular/core';
import { ForumService } from 'src/app/services/forum.service';
import { Setting, ForumMemberState, ForumResponse } from 'src/app/models/forum';
import { EndpointsService } from 'src/app/student/Services/endpoints.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-forum-ui',
  templateUrl: './forum-ui.component.html',
  styleUrls: ['./forum-ui.component.css']
})
export class ForumUiComponent implements OnInit {
  students : any = [];
  id: number;
  title: string;
  description: string;
  content: string;
  published: boolean;
  created: Date;
  settings: Setting;
  scoreboard: [ForumMemberState];

  response = "";
  responses = [];

  forumId:string;
  
  constructor(private forum: ForumService, private route :ActivatedRoute) { }

  ngOnInit() {
    this.forumId = this.route.snapshot.paramMap.get("forumId");

    this.getForumStudents(); 
    this.getForumResponses();

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
  
  getForumStudents(){
       this.forum.getStudents(parseInt(this.forumId)).subscribe(
        students =>{
            this.id = students.id;
            this.title = students.title;
            this.description = students.description;
            this.content = students.content;
            this.published = students.published;
            this.created = students.created;
            this.settings = students.settings;
            this.scoreboard = students.scoreboard;

            document.getElementById('content').innerHTML = students.content;
          
        }

      );
      
  }

  getForumResponses()
  {
    this.forum.getForumResponses(parseInt(this.forumId)).
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
