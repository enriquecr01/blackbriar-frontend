import { Component, OnInit, Input } from '@angular/core';
import {EndpointsService} from '../Services/endpoints.service';
import { Group } from 'src/app/models/group';

@Component({
  selector: 'app-student-explore-card',
  templateUrl: './student-explore-card.component.html',
  styleUrls: ['./student-explore-card.component.css']
})
export class StudentExploreCardComponent implements OnInit {

   @Input() group : Group;

  constructor() { }

  ngOnInit() {

   
  }

}
