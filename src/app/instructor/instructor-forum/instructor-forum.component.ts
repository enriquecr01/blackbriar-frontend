import { Component, OnInit, Input } from '@angular/core';
import { Forum } from '../../models/forum';
import { Router} from '@angular/router';

@Component({
  selector: 'app-instructor-forum',
  templateUrl: './instructor-forum.component.html',
  styleUrls: ['./instructor-forum.component.css']
})
export class InstructorForumComponent implements OnInit {

  @Input() forums: Forum;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToForumDashboard(forumId: number){
    console.log("TEEEEEEEEEEEEEE");
    this.router.navigate(['instructor/instructor-group' , {forumId}]);  
  }
}
