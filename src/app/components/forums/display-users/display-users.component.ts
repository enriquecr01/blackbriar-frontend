import { Component, OnInit, Input } from '@angular/core';
import { ForumMemberState, Setting } from 'src/app/models/forum';
import { ForumService } from 'src/app/services/forum.service';

@Component({
  selector: 'app-display-users',
  templateUrl: './display-users.component.html',
  styleUrls: ['./display-users.component.css']
})

export class DisplayUsersComponent implements OnInit {

  name: string;
  pic: string;
  role: string;
 
  @Input() scoreboard: ForumMemberState[];
  students : any = [];
  id: number;
  title: string;
  description: string;
  content: string;
  published: boolean;
  created: Date;
  settings: Setting;
  scoreboard2: [ForumMemberState];

  
  constructor(private forum: ForumService) { }

  ngOnInit() {
    this.getForumStudents();

    this.name = "Bruce Lee";
    this.pic = "Pic";
    this.role = "Warrior";

    var coll = document.getElementsByClassName("collapsible-users");
    var i;

    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function() {
        this.classList.toggle("active-users");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
          content.style.display = "none";
        } else {
          content.style.display = "block";
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
         this.scoreboard2 = students.scoreboard;
         console.log(students.scoreboard);         
     }

   );
   
}

  

}
