import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import * as M from "materialize-css/dist/js/materialize";
import { Group } from 'src/app/models/group';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ForumEditModal } from './edit-forum-modal';
import { GroupsService } from 'src/app/groups.service';
import { FilesService } from 'src/app/files.service';
import { ImageSnippet } from 'src/app/models/imagesnippet';
import { InstructorDashboardComponent } from '../instructor-dashboard/instructor-dashboard.component';
import Swal from 'sweetalert2';
import { InstructorGroupComponent } from '../instructor-group/instructor-group.component';

@Component({
  selector: 'app-group-card',
  templateUrl: './group-card.component.html',
  styleUrls: ['./group-card.component.css']
})
export class GroupCardComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
    
  }

  //@Input() Groups: Group[];
  @Input() group: Group;
  previewImage: any;
  selectedFile: ImageSnippet;

  openDialog(): void {
    const dialogRef = this.dialog.open(ForumEditModal, {
      width: '50%',
      data: this.group
    });
  constructor (private router: Router, 
    private groupsService: GroupsService, 
    private filesService: FilesService,
    public dashboard: InstructorDashboardComponent,
              private dialog: MatDialo)
  {


    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  ngOnInit() {
    console.log(this.group);
    var elems = document.querySelectorAll('.modal');
    M.Modal.init(elems);
    Swal.fire('Hello world!');

  }


  goToGroupDashboard(groupId: number){
    console.log(groupId);
    this.router.navigate(['instructor/group/',groupId]);  
  }

  updateGroup(){
    if(this.group.description.length < 1){
      M.toast({ html: 'Your group must to have a description' });
    }
    else {

      if (this.group.image.length < 1 && this.previewImage == "undefined") {
        this.group.image = "https://summer.pes.edu/wp-content/uploads/2019/02/default-2.jpg";
        this.editServiceGroup();
      }
      else if (this.previewImage != "undefined") {
        this.filesService.uploadImage(this.selectedFile.file).subscribe(
          data => {
            console.log(data);
            this.group.image = data;
            this.editServiceGroup();
          },
          error => {
            console.log(error);
          });
      }
    }


  }

  

  editServiceGroup() {
    this.groupsService.editGroupService(this.group.description, this.group.image, this.group.publicGroup, this.group.id).
      subscribe(
        data => {
          M.toast({ html: 'Your group was edited sucessfully' });
          this.group.description = "";
          this.group.image = "";
          this.groupsService.getInstructorGroups().
            subscribe(
              data => {
                console.log("GET Request is successful ", data);
                //this.Groups = data;
              },
              error => {
                console.log("Error", error);
              }
            );
        },
        error => {
          console.log(error.error.message);
          M.toast({ html: error.error.message });
        }
      );
  }  

}

