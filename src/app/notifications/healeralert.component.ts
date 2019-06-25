import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'healer-alert',
  templateUrl: './healeralert.component.html',
  styleUrls: []
})
export class HealerAlertComponent {
  constructor(
    public dialogRef: MatDialogRef<HealerAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
