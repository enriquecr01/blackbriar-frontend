import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Answer } from 'src/app/models/answer';
import { CommentService } from 'src/app/services/comment.service';
import { FilesService } from './../../files.service';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit, AfterViewInit {
  files: any;
  ngAfterViewInit() {
  }

  @Input() comment: Answer;
  hasFeedback: boolean = false;
  feedback: string = "";
  fileTypeName = [];
  fileFeedbackTypeName = [];
  feedbackFiles = [];

  constructor(private commentService: CommentService, private filesService: FilesService) { }

  ngOnInit() 
  {
    if(this.comment.replies.length > 0)
    {
      this.hasFeedback = true;
    }

    console.log(this.comment.files);
    let files = this.comment.files.split(',');
    console.log(files);

    const extractFileType = fileName => fileName.match(/\.(\w+)$/)[1].toLowerCase();

    this.fileTypeName = [];

    for (let file of files) 
    {
      let gettingFileWithTimestamp = file.split('/');
      let gettingFileName = gettingFileWithTimestamp[4].split('-');
      let fileTypeAndName = { "name": gettingFileName[1], "type": extractFileType(gettingFileName[1]), "url": file };
      this.fileTypeName.push(fileTypeAndName);
    }

    for (let i = 0; i < this.comment.replies.length; i++) 
    {
      console.log(this.comment.replies[i].files);
      let filesReply = this.comment.replies[i].files.split(',');
      let replaceFiles = [];
      for (let replyFile of filesReply)
      {
        let gettingFileWithTimestamp = replyFile.split('/');
        let gettingFileName = gettingFileWithTimestamp[4].split('-');
        let fileTypeAndName = { "name": gettingFileName[1], "type": extractFileType(gettingFileName[1]), "url": replyFile };
        replaceFiles.push(fileTypeAndName);
      }
      this.comment.replies[i].filesArray = replaceFiles;
    }
    console.log(this.comment);
  }

  registerComment(answerId)
  { 
    if (this.feedback.length > 0) {
      this.filesService.uploadFiles(this.files)
        .pipe(mergeMap(this.commentService.responseAnswer(answerId, this.feedback)))
        .subscribe(
          data => {
            this.comment.replies.push(data);
            M.toast({ html: 'Reply sent! wait to your instructor to validate it!' });
            this.feedback = "";
          },
          error => {
            console.log("Error", error);
          }
        );
    }
    else { M.toast({ html: 'You have to comment something' }); }
  }

  
  processFile(imageInput: any, imageInputFile: any) {
    const extractFileType = fileName => fileName.match(/\.(\w+)$/)[1].toLowerCase();

    this.fileFeedbackTypeName = [];
    this.files = imageInputFile;

    for (let file of imageInputFile) 
    {
      let fileTypeAndName = { "name": file.name, "type": extractFileType(file.name) };
      this.fileFeedbackTypeName.push(fileTypeAndName);
    }

    this.files = imageInputFile;
  }
}
