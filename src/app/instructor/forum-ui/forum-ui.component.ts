import { Component, OnInit, ɵConsole } from '@angular/core';
import { ForumService } from 'src/app/services/forum.service';
import { Setting, ForumMemberState, ForumResponse } from 'src/app/models/forum';
import { EndpointsService } from 'src/app/student/Services/endpoints.service';

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
  
  constructor(private forum: ForumService) { }

  ngOnInit() {

    this.getForumStudents(); 

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
       this.forum.getStudents(1).subscribe(
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

}
