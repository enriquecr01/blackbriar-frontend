import { Component } from '@angular/core';
import { SSL_OP_LEGACY_SERVER_CONNECT } from 'constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent 
{
  title = 'blackbriar';
  
  //This variable controls the no logged bar
  loggedIn: boolean = false;

  ngOnInit()
  {
  }
}
