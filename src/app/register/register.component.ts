import { Component, OnInit, EventEmitter } from '@angular/core';

import { RegisterService } from './../register.service';
//import {MaterializeDirective,MaterializeAction} from "angular2-materialize";
import * as M from "materialize-css/dist/js/materialize";
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/user';
import { LoginService } from './../login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {

  firstName: string = "";
  lastName: string = "";
  email: string = "";
  password: string = "";
  validatePassword: string = "";
  studentOrInstructor: boolean = false;
  images: string [] = ["assets/dawn.png", "assets/night.jpg", "assets/bonfire.jpg"];
  selectedImage: string = "";

  ngOnInit()
  {
    let val= this.images.length;
    let rand = Math.floor(Math.random() * val);
    this.selectedImage = this.images[rand];
  }

  register()
  {
    if(this.studentOrInstructor)
    {
      console.log("Instructor");
    }
    else
    {
      console.log("Student");
    }

    if(this.password.length < 8)
    {
      M.toast('Your password must to have at least 8 characters', 4000);
    }
    else if(this.hasNumbers(this.firstName) && this.hasNumbers(this.lastName))
    {
      M.toast('Your first name and last name does not have numbers', 4000);
    }
    else if(this.password != this.validatePassword)
    {
      M.toast('The passwords are different', 4000);
    }
    else if(this.email.length == 0)
    {
      M.toast('You have to enter your email', 4000);
    }
    else if(this.firstName.length == 0 || this.lastName.length == 0)
    {
      M.toast('You have to enter your first and last name', 4000);
    }
    else
    {
      this.registerService.register(this.firstName, this.lastName, this.email, this.password, this.studentOrInstructor).
      subscribe(
        data  => 
        { 
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
                  M.toast('Registered succesfully', 4000);
                  if(userInfo.student)
                  {
                    this.router.navigate(['student/dashboard']);
                  }
                  else
                  {
                    this.router.navigate(['instructor/dashboard']);
                  }
                },
                error => { M.toast(error.error.message); }
              );
              
      
            },
            error  => { M.toast(error.error.message); }
          )
        },
        error  => 
        { 
          console.log(error.error.message);
          
          M.toast(error.error.message, 4000);
        }
      );
    }
  }

  
  hasNumbers(text)
  {
    let numeros="0123456789";
    for(let i=0; i<text.length; i++)
    {
       if (numeros.indexOf(text.charAt(i),0)!=-1)
       {
          return 1;
       }
    }
    return 0;
 }

  constructor(private registerService: RegisterService, private router: Router, private loginService : LoginService) { }

}
