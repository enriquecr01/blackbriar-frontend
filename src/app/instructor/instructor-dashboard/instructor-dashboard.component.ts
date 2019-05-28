import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Auth } from './../../auth';

import { GroupsService } from './../../groups.service';
import { FilesService } from './../../files.service';
import { ImageSnippet } from './../../models/imagesnippet';


@Component({
  selector: 'app-instructor-dashboard',
  templateUrl: './instructor-dashboard.component.html',
  styleUrls: ['./instructor-dashboard.component.css']
})
export class InstructorDashboardComponent implements OnInit {

  constructor(private router: Router, private auth: Auth, private groupsService: GroupsService, private filesService : FilesService) { }

  //Properties of new group
  title: string = "";
  description: string = "";
  image: string = "";
  public: boolean = false;
  GroupsService: any;
  searchText: string ="";
  selectedValue: string
  selectedFile: ImageSnippet;
  previewImage: any;
  imageFile: File;
  groups = [];
  groupsFilter = [];

  ngOnInit() {  
    this.auth.getExpiration();
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
    elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
    var el = document.querySelectorAll('.tabs');
    M.Tabs.init(el);
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
    console.log(this.previewImage);
    if(this.title.length < 1)
    {
      M.toast({html: 'Your group must to have a title'});
    }
    else if(this.description.length < 1)
    {
      M.toast({html: 'Your group must to have a description'});
    }
    else if(this.arrayObjectIndexOf(this.groupsFilter, this.title, "title") > -1)
    {
      M.toast({html: 'You already have a group with the same name'});
    }
    else
    {
      if(this.previewImage != "undefined")
      {
        this.filesService.uploadImage(this.selectedFile.file).subscribe(
          data => {
            console.log(data);
            this.image = data;
            this.callServiceGroup();
          },
          error => {
            console.log(error);
          });
      }
      if (this.image.length < 1 && this.previewImage == "undefined")
      {
        this.image = "https://summer.pes.edu/wp-content/uploads/2019/02/default-2.jpg";
        this.callServiceGroup();
      }
    }
  }


  Search(){
    this.groups = this.groupsFilter;
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

  callServiceGroup()
  {
    this.groupsService.addGroupService(this.title, this.description, this.image, this.public).
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

  
  processFile(imageInput: any, imageInputFile: any) 
  {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.selectedFile.pending = true;
      var reader = new FileReader();

      console.log(imageInputFile);

      var mimeType = imageInputFile[0].type;
      mimeType.match(/image\/*/);

      this.imageFile = imageInputFile;
      reader.readAsDataURL(imageInputFile[0]); 
      reader.onload = (_event) => { 
        this.previewImage = reader.result; 
      }
    });

    reader.readAsDataURL(file);
  }

  arrayObjectIndexOf(myArray, searchTerm, property) 
  {
    for(var i = 0, len = myArray.length; i < len; i++) 
    {
      if (myArray[i][property] === searchTerm) return i;
    }
    return -1;
}

  logout()
  {
    this.router.navigate(['home']);
  }

}
