import { Component, OnInit, Input } from '@angular/core';
import { ForumInsertService } from 'src/app/services/forum-insert.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Forum } from 'src/app/models/forum';


@Component({
  selector: 'app-instructor-group',
  templateUrl: './instructor-group.component.html',
  styleUrls: ['./instructor-group.component.css']
})
export class InstructorGroupComponent implements OnInit {
    
  forumTitle: string;
  description: string;
  endDate: string;
  warriorScore: number;
  healerScore: number;
  warlockScore: number;
  answerScore: number;
  published: boolean;

  @Input()
  groupId: number;
  ForumInsertService: ForumInsertService;

  constructor(private forumInsertService: ForumInsertService) { }

  ngOnInit() {
    
    // MODAL START
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
    // MODAL - DATE PICKER START
    var elems = document.querySelectorAll('.datepicker');
    M.Datepicker.init(elems);
    // MODAL - TIME PICKER START
    var elems = document.querySelectorAll('.timepicker');
    M.Timepicker.init(elems);  
    // FLOATING BUTTON
    var elems = document.querySelectorAll('.fixed-action-btn');
    M.FloatingActionButton.init(elems);  
   
  }

  InsertForum(){
    console.log("LE FUUUUCKIIIIING DATA");
      console.log( "Title = " + this.forumTitle);
        console.log( "Description = " + this.description);
          console.log( "End Date = " + this.endDate);
            console.log( "Warrior Score = " + this.warriorScore);
              console.log( "Healer Score = " + this.healerScore);
                console.log( "Warlcok Score = " + this.warlockScore);
                  console.log( "Answer Score = " + this.answerScore);

          var forum = new Forum();
          forum.title = this.forumTitle,
          forum.description = this.description,
          forum.content = "content"
          forum.endDate = "2019-06-04T05:35:37.659Z",
          forum.warriorPoints = this.warriorScore,
          forum.healerPoints = this.healerScore,
          forum.warlockPoints = this.warlockScore,
          forum.validResponsePoints = this.answerScore,
          forum.published = this.published

          this.forumInsertService.addForum(forum).
          subscribe(
            data  => 
            { 
                },
                error => { 
                  M.toast(error.error.message); 
                  console.log(error.error.message);
                }
              );
        error  => 
        { 
          console.log(error.error.message);
          
        }
      
  }

}
