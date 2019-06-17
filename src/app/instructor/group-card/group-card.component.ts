import { Component, OnInit, Input } from '@angular/core';
import * as M from "materialize-css/dist/js/materialize";
import { Group } from 'src/app/models/group';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Router } from '@angular/router';


@Component({
  selector: 'app-group-card',
  templateUrl: './group-card.component.html',
  styleUrls: ['./group-card.component.css']
})
export class GroupCardComponent implements OnInit {


  @Input() group: Group;

  constructor (private router: Router)
  {

  }


  ngOnInit() {
    console.log(this.group);
  }

  goToGroupDashboard(groupId: number){
    this.router.navigate(['instructor/group/',groupId]);  
  }

}
