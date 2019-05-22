import { Component, OnInit, Injectable } from '@angular/core';

import { LoginService } from './../login.service';
import { AppComponent } from './../app.component';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { User } from '../models/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AppComponent]
})

@Injectable({
  providedIn: 'root'
})
export class LoginComponent  {

  email: string = "";
  password: string = "";
  type: string = "";
  images: string [] = ["assets/dawn.png", "assets/night.jpg", "assets/bonfire.jpg"];
  selectedImage: string = "";
  
  constructor (private loginService : LoginService, private router: Router)
  {

  }

  ngOnInit()
  {
    let val= this.images.length;
    let rand = Math.floor(Math.random() * val);
    this.selectedImage = this.images[rand];

  }

  verifyIfIsEnter(event)
  {
    if (event.key === "Enter") {
      this.login();
    }
  }

  login()
  {
    // Lo de abajo es un ejemplo de lo que se puede hacer importando un componente
    // construyendolo y modificando sus variables 
    //this.appComponent.loggedIn = true; 
    if(this.password.length < 1 || this.email.length < 1)
    {
      M.toast({html: "The credentials are empty"});
    }
    else{
      this.loginService.login(this.email, this.password).
      subscribe(
        data  => 
        { 
          console.log("POST Request is successful ", data);
          let token: any = data;
          const helper = new JwtHelperService();
          localStorage.setItem('token', token.token);
          const decodedToken = helper.decodeToken(token.token);
          localStorage.setItem('userId', decodedToken.sub);
  
          this.loginService.getInfoUser(decodedToken.sub).
          subscribe(
            data =>
            {
              let userInfo : User = data;
              localStorage.setItem('firstName', userInfo.firstName);
              localStorage.setItem('lastName', userInfo.lastName);
              localStorage.setItem('email', userInfo.email);
              localStorage.setItem('photo', userInfo.photo);
              localStorage.setItem('student', userInfo.student);
              if(userInfo.student)
              {
                this.router.navigate(['student/student-mygroups']);
              }
              else
              {
                this.router.navigate(['instructor/instructor-dashboard']);
              }
            },
            error => { M.toast({html: error.error.message}); }
          );
          
  
        },
        error  => { M.toast({html: error.error.message}); }
      );
    }
  }
}
