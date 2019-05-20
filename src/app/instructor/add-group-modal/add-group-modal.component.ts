import { Component, OnInit } from '@angular/core';
import { GroupsService } from './../../groups.service';
import { Modal } from 'materialize-css';

@Component({
  selector: 'app-add-group-modal',
  templateUrl: './add-group-modal.component.html',
  styleUrls: ['./add-group-modal.component.css']
})
export class AddGroupModalComponent implements OnInit {

  title: string = "";
  description: string = "";
  image: string = "";
  public: boolean = false;
  GroupsService: any;

  constructor(private groupsService: GroupsService) { }

  ngOnInit() {
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.modal');
      var instances = M.Modal.init(elems);
    });
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
          this.groupsService.getInstructorGroups();
        },
        error  => 
        { 
          console.log(error.error.message);
          M.toast({html: error.error.message});
        }
      );
    }
  }

}
