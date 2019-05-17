import { Component, OnInit, Input } from '@angular/core';
import * as M from "materialize-css/dist/js/materialize";
import { Group } from 'src/app/models/group';


@Component({
  selector: 'app-group-card',
  templateUrl: './group-card.component.html',
  styleUrls: ['./group-card.component.css']
})
export class GroupCardComponent implements OnInit {

  @Input() group: Group;

  constructor() { }

  ngOnInit() {
  }


}
