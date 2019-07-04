import { Component, OnInit, Input } from '@angular/core';
import { ForumMemberState, Setting, ForumRole } from 'src/app/models/forum';
import { ForumService } from 'src/app/services/forum.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-display-users',
  templateUrl: './display-users.component.html',
  styleUrls: ['./display-users.component.css']
})

export class DisplayUsersComponent implements OnInit {
 
  @Input() scoreboard: ForumMemberState[];
  students : any = [];
  id: number;
  title: string;
  description: string;
  content: string;
  published: boolean;
  created: Date;
  settings: Setting;
  scoreboard2: ForumMemberState[];

  warriorIcon : string = "assets/Images/Icons/helmet.svg";
  healerIcon : string = "assets/Images/Icons/healer.svg";
  warlockIcon : string = "assets/Images/Icons/warlock.svg";

  roleFilter : string;
  studentsFilter : ForumMemberState[];

  forumId:string;

  constructor(private forum: ForumService, private route :ActivatedRoute) {
   
  }

  ngOnInit() {
    this.forumId = this.route.snapshot.paramMap.get("forumId");
    
    this.getForumStudents();
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
    this.forum.getStudents(parseInt(this.forumId)).subscribe(
     students =>{
         this.id = students.id;
         this.title = students.title;
         this.description = students.description;
         this.content = students.content;
         this.published = students.published;
         this.created = students.created;
         this.settings = students.settings;
         this.scoreboard2 = students.scoreboard;      
         this.studentsFilter = this.scoreboard2; 
     }
   ); 
  }

  onChange(){

    switch(this.roleFilter){
      
      case 'Warrior':
          this.studentsFilter = this.scoreboard2.filter(element =>{
            return element.warrior === true;
          });
        break;
      
      case 'Healer':
          this.studentsFilter = this.scoreboard2.filter(element =>{
            return element.healer === true;
          });
        break;
      
      case 'Warlock':
          this.studentsFilter = this.scoreboard2.filter(element =>{
            return element.warlock === true;
          });
        break;
      case 'All':
          this.studentsFilter = this.scoreboard2;
          break;
      case 'Humans':
          this.studentsFilter = this.scoreboard2.filter(element =>{
            return element.warlock == false && element.warrior == false && element.healer == false;
          });
          break;
    }
    
  }




}
