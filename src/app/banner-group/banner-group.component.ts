import { Component, OnInit, Input } from '@angular/core';
import { Group } from '../models/forum';
import { GroupsService } from '../groups.service';

@Component({
  selector: 'app-banner-group',
  templateUrl: './banner-group.component.html',
  styleUrls: ['./banner-group.component.css']
})
export class BannerGroupComponent implements OnInit {

  @Input() groupId: number;
  group: Group;

  constructor(private groupService: GroupsService) { }

  ngOnInit() {
    var modalElems = document.querySelectorAll('.modal');
    M.Modal.init(modalElems);

    /**************PARALLAX**********/
    var elems = document.querySelectorAll('.parallax');
    var instances = M.Parallax.init(elems);

    this.groupService.getOneGroup(this.groupId).subscribe(
      group => {
        this.group = group;
        document.getElementById('groupDescription').innerHTML = this.group.description;
        console.log(group);
      },
      error => {
        console.log("Error -> getGroupForums", error);
      }
    );
    /**************END PARALLAX**********/
  }

}
