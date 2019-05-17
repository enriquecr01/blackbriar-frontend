import { Component, OnInit, Injectable } from '@angular/core';

import { LoginService } from './../login.service';
import { AppComponent } from './../app.component';
import { Router } from '@angular/router';

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

  login()
  {
    // Lo de abajo es un ejemplo de lo que se puede hacer importando un componente
    // construyendolo y modificando sus variables 
    //this.appComponent.loggedIn = true; 
    console.log(this.email);
    console.log(this.password);
    this.loginService.login(this.email, this.password).
    subscribe(
      data  => 
      { 
        console.log("POST Request is successful ", data);
        let token: any = data;

        //const helper = new JwtHelperService();
        //sub es el id publico del usuario
        //exp es la fecha de expiracion
        //const decodedToken = helper.decodeToken(token);
        //const expirationDate = helper.getTokenExpirationDate(token);
        //const isExpired = helper.isTokenExpired(token);
        localStorage.setItem('token', token.token);
        if (this.type == "Instructor")
          this.router.navigate(['instructor/instructor-dashboard']);
        else
          this.router.navigate(['student/student-dashboard']);
      },
      error  => 
      { 
        console.log("Error", error); 
      }
    );
  }
}
