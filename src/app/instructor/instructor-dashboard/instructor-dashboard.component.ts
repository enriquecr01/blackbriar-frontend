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

  groups = [];

  ngOnInit() {  
    this.auth.getExpiration();
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
    console.log(this.groupsService.getInstructorGroups());
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


  logout()
  {
    this.router.navigate(['home']);
  }

}
