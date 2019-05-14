import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-no-logged',
  templateUrl: './navbar-no-logged.component.html',
  styleUrls: ['./navbar-no-logged.component.css']
})
export class NavbarNoLoggedComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  redirectLogin()
  {
    this.router.navigate(['login']);
  }

  redirectRegister()
  {
    this.router.navigate(['register']);
  }
}
