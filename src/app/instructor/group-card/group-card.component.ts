import { Component, OnInit, Input } from '@angular/core';
import * as M from "materialize-css/dist/js/materialize";
import { Group } from 'src/app/models/group';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ForumEditModal } from './edit-forum-modal';

@Component({
  selector: 'app-group-card',
  templateUrl: './group-card.component.html',
  styleUrls: ['./group-card.component.css']
})
export class GroupCardComponent implements OnInit {


  @Input() group: Group;

  constructor (private router: Router, private dialog: MatDialog){

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ForumEditModal, {
      width: '50%',
      data: this.group
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  ngOnInit() {
    console.log(this.group);
  }


  goToGroupDashboard(groupId: number){
    console.log(groupId);
    this.router.navigate(['instructor/group/',groupId]);  
  }

}
