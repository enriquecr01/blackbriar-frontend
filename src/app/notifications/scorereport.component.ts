import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ForumService } from '../services/forum.service';
import { ForumMemberState } from '../models/forum';

@Component({
  selector: 'score-report',
  templateUrl: './scorereport.component.html',
  styleUrls: []
})
export class ScoreReportComponent implements OnInit {
  forumTitle: string;
  scoreboard: ForumMemberState[];

  constructor(
    public dialogRef: MatDialogRef<ScoreReportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private forumService: ForumService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.forumService.getStudents(this.data.forumId).subscribe(
      (forum) => {
        this.scoreboard = forum.scoreboard;
        this.forumTitle = forum.title;
      }
    )
  }
}
