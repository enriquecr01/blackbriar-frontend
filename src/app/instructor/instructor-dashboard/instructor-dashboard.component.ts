import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Auth } from './../../auth';

import { GroupsService } from './../../groups.service';
import { Group } from './../../models/group';


@Component({
  selector: 'app-instructor-dashboard',
  templateUrl: './instructor-dashboard.component.html',
  styleUrls: ['./instructor-dashboard.component.css']
})
export class InstructorDashboardComponent implements OnInit {

  constructor(private router: Router, private auth: Auth, private groupsService: GroupsService) { }

  //Properties of new group
  title: string = "";
  description: string = "";
  image: string = "";
  public: boolean = false;
  GroupsService: any;
  searchText: string ="";
  selectedValue: string

  groups = [];
  groupsFilter = [];

  ngOnInit() {  
    this.auth.getExpiration();
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
    elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
    console.log(this.groupsService.getInstructorGroups());
    this.groupsService.getInstructorGroups().
    subscribe(
      data  => 
      { 
        console.log("GET Request is successful ", data);
        this.groups = data;
        this.groupsFilter = this.groups;
        console.log(this.groupsFilter);
      },
      error  => 
      { 
        console.log("Error", error); 
      }
    );
    
  }

  addGroup()
  {
    if(this.title.length < 1)
    {
      M.toast({html: 'Your group must to have a title'});
    }
    else if(this.description.length < 1)
    {
      M.toast({html: 'Your group must to have a description'});
    }
    else
    {
      this.groupsService.addGroup(this.title, this.description, this.image, this.public).
      subscribe(
        data  => 
        { 
          M.toast({html: 'Your group was added sucessfully'});
          this.groups = [];
          this.title = "";
          this.description = "";
          this.image = "";
          this.groupsService.getInstructorGroups().
          subscribe(
            data  => 
            { 
              console.log("GET Request is successful ", data);
              this.groups = data;
            },
            error  => 
            { 
              console.log("Error", error); 
            }
          );
        },
        error  => 
        { 
          console.log(error.error.message);
          M.toast({html: error.error.message});
        }
      );
    }
  }

  Search(){
    if(this.searchText != ""){
      this.groups = this.groups.filter(res=>{
        return res.title.toLocaleLowerCase().match(this.searchText.toLocaleLowerCase());
      });
    }
    else if(this.searchText == ""){
      this.onChange();
    }
  }

  onChange(){
    console.log(this.selectedValue);
    switch(this.selectedValue){
      case '1':{
        this.ngOnInit();
        break;
      }
      case '2':{
        this.groups = this.groupsFilter;
        this.groups = this.groups.filter(element => {
        return element.publicGroup === true;
        });
        break;
      }
      case '3':{
        this.groups = this.groupsFilter;
        this.groups = this.groups.filter(element => {
        return element.publicGroup === false;
        });
        break;
      }
      
    }

  }

  logout()
  {
    this.router.navigate(['home']);
  }

}
