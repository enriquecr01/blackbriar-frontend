import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'warrior-alert',
  templateUrl: './warrioralert.component.html',
  styleUrls: []
})
export class WarriorAlertComponent {
  constructor(
    public dialogRef: MatDialogRef<WarriorAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
