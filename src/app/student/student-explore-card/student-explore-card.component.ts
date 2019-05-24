import { Component, OnInit, Input } from '@angular/core';
import {EndpointsService} from '../Services/endpoints.service';
import { Group } from 'src/app/models/group';
import * as M from "materialize-css/dist/js/materialize";

@Component({
  selector: 'app-student-explore-card',
  templateUrl: './student-explore-card.component.html',
  styleUrls: ['./student-explore-card.component.css']
})
export class StudentExploreCardComponent implements OnInit {

   @Input() group : Group;

  constructor(private endPointService : EndpointsService) { }

  ngOnInit() {
  }

  joinGroup(groupId, button)
  {
    this.endPointService.joinGroup(groupId).
    subscribe(
      data  => 
      { 
        let dataAny : any = data;
        //Cambiar estilo objecto DOM
        //object.style.background = "gray";
        //object.innerHTML = "Yo";
        button.setAttribute("disabled", "");
        button.setAttribute("onclick", "");
        M.toast(dataAny.statusMessage, 4000);
      },
      error  => 
      { 
        button.setAttribute("disabled", "");
        button.setAttribute("onclick", "");
        M.toast(error.error.message, 4000);
      }
    );
  }

}
