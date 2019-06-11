import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LoginService]
})
export class AppComponent 
{

  constructor(private router: Router) {
    
  }

  logged: boolean = false;
  
  ngOnInit()
  {
    //this.goToLanding();
  }

  goToMyGroups(){
    this.router.navigate(['student/student-mygroups']);
  }

  goToExplore(){
    this.router.navigate(['student/student-explore']);
  }

  goToLanding(){
    this.router.navigate(['lading/lading']);
  }

}


