import { Component, OnInit } from '@angular/core';
import { EndpointsService } from '../Services/endpoints.service';
import { Group } from 'src/app/models/group';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-student-mygroups',
  templateUrl: './student-mygroups.component.html',
  styleUrls: ['./student-mygroups.component.css']
})
export class StudentMygroupsComponent implements OnInit {
  thisInstance: StudentMygroupsComponent = this;
  selectedValue: string;
  searchText: string = "";

  public groups = [];
  groupsFilter = [];

  constructor(private endpoint: EndpointsService) { }

  ngOnInit() {
    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
    this.endpoint.get_StudentRegisteredGroups().
      subscribe(
        data => {
          this.groups = data;
          this.groupsFilter = this.groups;
          console.log(this.groups);
        },
        error => {
          console.log("Error", error);
        }
      )

  }

  Search() {
    this.groups = this.groupsFilter;
    if (this.searchText != "") {
      this.groups = this.groups.filter(res => {
        return res.title.toLocaleLowerCase().match(this.searchText.toLocaleLowerCase())
          || res.owner.firstName.toLocaleLowerCase().match(this.searchText.toLocaleLowerCase())
          || res.owner.email.toLocaleLowerCase().match(this.searchText.toLocaleLowerCase());
      });
    }
    else if (this.searchText == "") {
      this.onChange();
    }
  }

  onChange() {
    console.log(this.selectedValue);
    switch (this.selectedValue) {
      case '1': {
        this.ngOnInit();
        break;
      }
      case '2': {
        this.groups = this.groupsFilter;
        this.groups = this.groups.filter(element => {
          return element.publicGroup === true;
        });
        break;
      }
      case '3': {
        this.groups = this.groupsFilter;
        this.groups = this.groups.filter(element => {
          return element.publicGroup === false;
        });
        break;
      }

    }

  }

  unsubscribeMeAlert(membershipId:number){
    //Swal.fire('Hello world!');
   Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to leave this group!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, unsubscribe!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.unsubscribeMe(membershipId);
        Swal.fire(
          'Unsubscribed!',
          'You has been unsubscribed.',
          'success'
        )
      // For more information about handling dismissals please visit
      // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your subscription is safe :)',
          'error'
        )
      }
    });
  }

  unsubscribeMe(membershipId : number) {
    this.endpoint.unsubcribeFromGroup(membershipId).
    subscribe(
      data => 
      {},
      error => {
        this.updateGroups();
      }
    );
  }


  updateGroups(){
    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
    this.endpoint.get_StudentRegisteredGroups().
      subscribe(
        data => {
          this.groups = data;
          this.groupsFilter = this.groups;
          console.log(this.groups);
        },
        error => {
          console.log("Error", error);
        }
      )
  }
}
