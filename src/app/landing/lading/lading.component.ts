import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lading',
  templateUrl: './lading.component.html',
  styleUrls: ['./lading.component.css']
})
export class LadingComponent implements OnInit{

  constructor(private router:Router) { }

  ngOnInit() {
  }

  goToLogin(){
    this.router.navigate(['login']);
  }

}
