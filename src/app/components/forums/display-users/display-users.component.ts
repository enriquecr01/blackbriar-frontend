import { Component, Input } from '@angular/core';
import { ForumMemberState } from 'src/app/models/forum';

@Component({
  selector: 'app-display-users',
  templateUrl: './display-users.component.html',
  styleUrls: ['./display-users.component.css']
})

export class DisplayUsersComponent {
  @Input() scoreboard: ForumMemberState[];
  @Input() studentId: string = '';
  warriorIcon: string = "assets/Images/Icons/helmet.svg";
  healerIcon: string = "assets/Images/Icons/healer.svg";
  warlockIcon: string = "assets/Images/Icons/warlock.svg";
  roleFilter: string;
  forumId: string;

  constructor() { }

  get filteredScores() {
    switch (this.roleFilter) {
      case 'Warrior':
        return this.scoreboard.filter(element => element.warrior);
      case 'Healer':
        return this.scoreboard.filter(element => element.healer);
      case 'Warlock':
        return this.scoreboard.filter(element => element.warlock);
      case 'All':
        return this.scoreboard;
      case 'Civilians':
        return this.scoreboard.filter(
          element => !element.warlock && !element.warrior && !element.healer
        );
      default:
        return this.scoreboard;
    }
  }
}
