import { Component, OnInit, Input } from '@angular/core';
import { ForumInsertService } from 'src/app/services/forum-insert.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ForumRequest } from 'src/app/models/forum';
import { Router, ActivatedRoute } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { NgLocalization } from '@angular/common';
import { MatDatepicker } from '@angular/material/datepicker';


@Component({
  selector: 'app-modal-create-forum',
  templateUrl: './modal-create-forum.component.html',
  styleUrls: ['./modal-create-forum.component.css']
})
export class ModalCreateForumComponent implements OnInit {
 
  //Forum Interface
  forumTitle: string;
  description: string;
  endDate: string;
  warriorScore: number;
  healerScore: number;
  warlockScore: number;
  answerScore: number;
  published: boolean;

  @Input()
  ForumInsertService: ForumInsertService;
  

  constructor(private router: ActivatedRoute, private forumInsertService: ForumInsertService) { }

  
  ngOnInit() {

    this.forumInsertService.GroupId = +this.router.snapshot.paramMap.get("groupId");
    // MODAL START
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);

    // FLOATING BUTTON
    elems = document.querySelectorAll('.fixed-action-btn');
    M.FloatingActionButton.init(elems);  
   
  }


  CreateForum(){
      if(this.Validate()){
        this.InsertForum();
        this.ReloadPage();
      }
  }

  InsertForum(){    


      var forum : ForumRequest = {
        title : this.forumTitle,
        description : this.description,
        content : "content",
        endDate : "2019-06-04T05:35:37.659Z",
        warriorPoints : this.warriorScore,
        healerPoints : this.healerScore,
        warlockPoints : this.warlockScore,
        validResponsePoints : this.answerScore,
        published : true

    };
  
    try
    {
      this.forumInsertService.addForum(forum).
      subscribe(
        data  => 
        { 
          console.log(data);
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
    catch (error)
    {
      console.log(error);
    }

    
              
      
  }

  Validate(){
    
    if(this.forumTitle == null)
    {
      M.toast({html: 'Missing Forum Title'})
      return false;
    }
    if(this.description == null)
    {
      M.toast({html: 'Missing Description'})
      return false;
    }
    if(this.answerScore == null)
    {
      M.toast({html: 'Missing Answer Score'})
      return false;
    }
    if(this.endDate == null)
    {
      M.toast({html: 'Missing End Date'})
      return false;
    }
    if(this.warriorScore == null)
    {
      M.toast({html: 'Missing Warrior Points'})
      return false;
    }
    if(this.healerScore == null)
    {
      M.toast({html: 'Missing Healer Points'})
      return false;
    }
    if(this.warriorScore == null)
    {
      M.toast({html: 'Missing Warrior Points'})
      return false;
    }
  
  }

  ReloadPage(){
    location.reload();
  }

}
