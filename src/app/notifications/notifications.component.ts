import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../models/message';
import { InboxService } from './../inbox.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  @Input() notification: Message;
  deleteNotification: boolean = true;

  constructor(private inboxService: InboxService) { }

  ngOnInit() {
    console.log(this.notification.category);
    console.log(this.notification.content);
    console.log(this.notification);

  }

  acceptRequestInstructor(membershipId)
  {
    console.log(membershipId);
    this.inboxService.instructorAcceptMembership(membershipId).
    subscribe(
      data  => 
      { 
        this.deleteNotification = false;
        console.log(data);
        M.toast({html: data.statusMessage}); 
      },
      error  => 
      { 
        this.deleteNotification = false;
        console.log(error);
        M.toast({html: error.error.message}); 
      }
    );
    
    
  }

  rejectRequestInstructor(membershipId)
  {
    console.log(membershipId);
    this.deleteNotification = false;
    this.inboxService.rejectInstructorMembership(membershipId).
    subscribe(
      data  => 
      { 
        this.deleteNotification = false;
        console.log(data);
        M.toast({html: "You rejected the student"}); 
      },
      error  => 
      { 
        this.deleteNotification = false;
        console.log(error);
        M.toast({html: "Error"}); 
      }
    );
  }

  goToForum(forumId: number)
  {
    console.log(forumId);
    //go forum
  }

}
