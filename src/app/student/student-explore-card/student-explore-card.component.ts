import { Component, OnInit, Input } from '@angular/core';
import {EndpointsService} from '../Services/endpoints.service';
import { Group } from 'src/app/models/group';
import * as M from "materialize-css/dist/js/materialize";
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-explore-card',
  templateUrl: './student-explore-card.component.html',
  styleUrls: ['./student-explore-card.component.css']
})
export class StudentExploreCardComponent implements OnInit {

   @Input() group : Group;
   disabledButton: boolean = false;

  constructor(private endPointService : EndpointsService, private router: Router) { }

  ngOnInit() {
  }

  
  goToGroupForums(groupId: number) {   
    this.router.navigate(['student/group/',groupId]);
  }

  joinGroup(groupId)
  {
    this.endPointService.joinGroup(groupId).
    subscribe(
      data  => 
      { 
        let dataAny : any = data;
        //Cambiar estilo objecto DOM
        //object.style.background = "gray";
        //object.innerHTML = "Yo";
        this.disabledButton = true;
        M.toast(dataAny.statusMessage, 4000);
      },
      error  => 
      { 
        this.disabledButton = true;
        M.toast(error.error.message, 4000);
      }
    );
  }

}
