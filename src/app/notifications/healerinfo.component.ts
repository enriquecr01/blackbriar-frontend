import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'healer-info',
  templateUrl: './healerinfo.component.html',
  styleUrls: []
})
export class HealerInfoComponent {
  constructor(
    public dialogRef: MatDialogRef<HealerInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
