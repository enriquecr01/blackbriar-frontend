import { Component, OnInit, Input } from '@angular/core';
import { Forum } from 'src/app/models/forum';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  constructor() { }

  @Input() forum: Forum;

  ngOnInit() {
  }

}
