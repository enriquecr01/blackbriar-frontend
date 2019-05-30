import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../models/message';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  @Input() notification: Message;

  constructor() { }

  ngOnInit() {
    console.log(this.notification.category);
    console.log(this.notification.content);
    console.log(this.notification);

  }

}
