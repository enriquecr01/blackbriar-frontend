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

  ngOnInit() {
    if (this.comment.replies.length > 0) {
      this.hasFeedback = true;
    }

    //console.log(this.comment.files);
    let files = this.comment.files.split(',');
    const extractFileType = fileName => fileName.match(/\d+-(.+)\.([a-z]+)$/i)[2].toLowerCase();
    const extractFileName = fileName => fileName.match(/\d+-(.+)\.([a-z]+)$/i)[1];

    //console.log(files);
    // const extractFileType = fileName => fileName.match(/\.(\w+)$/)[1].toLowerCase();



    for (let file of files) {
      let gettingFileWithTimestamp = file.split('/');
      let gettingFileName = gettingFileWithTimestamp[4].split('-');
      let fileTypeAndName = { "name": extractFileName(gettingFileWithTimestamp[4]), "type": extractFileType(gettingFileWithTimestamp[4]), "url": file };
      this.fileTypeName.push(fileTypeAndName);
    }
    /*console.table(hola2.match(/\d+-(.+)\.([a-z]+)$/i))*/
    this.comment.replies.forEach((reply) => {
      let filesReply = reply.files.split(',');
      let arrayFiles = [];
      // Se realiza un Foreach pero de las respuestas de una respuesta
      filesReply.forEach((files) => {
        let gettingFileWithTimestamp = files.split('/');
        let fileTypeAndName = { "name": extractFileName(gettingFileWithTimestamp[4]), "type": extractFileType(gettingFileWithTimestamp[4]), "url": files };
        arrayFiles.push(fileTypeAndName);
      })
      reply.filesArray = arrayFiles;
    })

    console.log(this.comment);

  }

  registerComment(answerId) {
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

    for (let file of imageInputFile) {
      let fileTypeAndName = { "name": file.name, "type": extractFileType(file.name) };
      this.fileFeedbackTypeName.push(fileTypeAndName);
    }

    this.files = imageInputFile;
  }
}
