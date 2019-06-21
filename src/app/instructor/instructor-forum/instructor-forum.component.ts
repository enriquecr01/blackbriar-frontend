import { Component, OnInit, Input } from '@angular/core';
import { Forum } from '../../models/forum';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-instructor-forum',
  templateUrl: './instructor-forum.component.html',
  styleUrls: ['./instructor-forum.component.css']
})
export class InstructorForumComponent implements OnInit {

  groupId:string;

  @Input() forums: Forum;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.groupId = this.route.snapshot.queryParamMap.get('groupId');
  }

  goToForumDashboard(forumId){
    this.router.navigate(['instructor/group/' + this.groupId + '/forum/' + forumId]);  
  }
}
