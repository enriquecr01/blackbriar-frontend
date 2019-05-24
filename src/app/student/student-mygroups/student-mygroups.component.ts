import { Component, OnInit } from '@angular/core';
import {EndpointsService} from '../Services/endpoints.service';
import { Group } from 'src/app/models/group';


@Component({
  selector: 'app-student-mygroups',
  templateUrl: './student-mygroups.component.html',
  styleUrls: ['./student-mygroups.component.css']
})
export class StudentMygroupsComponent implements OnInit {
  selectedValue: string;
  searchText: string="";

  groups = [];
  groupsFilter = [];

  constructor(private endpoint : EndpointsService) { }

  ngOnInit() {
    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
    this.endpoint.get_StudentRegisteredGroups().
    subscribe(
      data => {
        this.groups = data;
        this.groupsFilter = this.groups;
        console.log(this.groups);
      },
      error =>{
        console.log("Error", error);
      }
    )
  }

  Search(){
    if(this.searchText != ""){
      this.groups = this.groups.filter(res=>{
        return res.title.toLocaleLowerCase().match(this.searchText.toLocaleLowerCase())
        || res.owner.firstName.toLocaleLowerCase().match(this.searchText.toLocaleLowerCase())
        || res.owner.email.toLocaleLowerCase().match(this.searchText.toLocaleLowerCase());
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

}
