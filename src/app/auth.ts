import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  constructor(private router: Router) 
  {}

  getExpiration()
  {
    const helper = new JwtHelperService();
    //sub es el id publico del usuario
    //exp es la fecha de expiracion
    const decodedToken = helper.decodeToken(localStorage.getItem('token'));
    //const expirationDate = helper.getTokenExpirationDate(localStorage.getItem('token'));
    const isExpired = helper.isTokenExpired(localStorage.getItem('token'));

    if (isExpired)
    {
      this.router.navigate(['login']);
    }
    else
    {

    }
  }

  
}
