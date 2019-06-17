import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-users',
  templateUrl: './display-users.component.html',
  styleUrls: ['./display-users.component.css']
})
export class DisplayUsersComponent implements OnInit {

  name: string;
  pic: string;
  role: string;

  constructor() { }

  ngOnInit() {

    this.name = "Bruce Lee";
    this.pic = "Pic";
    this.role = "Warrior";

    var coll = document.getElementsByClassName("collapsible-users");
    var i;

    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function() {
        this.classList.toggle("active-users");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
          content.style.display = "none";
        } else {
          content.style.display = "block";
        }
      });
    } 
  }

}
