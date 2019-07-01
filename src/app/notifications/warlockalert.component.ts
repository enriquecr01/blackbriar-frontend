import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'warlock-alert',
  templateUrl: './warlockalert.component.html',
  styleUrls: []
})
export class WarlockAlertComponent {
  constructor(
    public dialogRef: MatDialogRef<WarlockAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
