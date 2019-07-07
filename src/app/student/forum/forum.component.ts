import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ForumService } from '../../services/forum.service';
import { CommentService } from '../../services/comment.service';
import { Answer } from 'src/app/models/answer';
import { ImageSnippet } from 'src/app/models/imagesnippet';
import { FilesService } from './../../files.service';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  forumId: number;
  forumTitle: string = "";
  forumDescription: string = "";
  response = "";
  responses = [];
  commented: boolean = false;
  selectedFile: ImageSnippet;
  files = [];
  fileTypeName = [];
  disableComment : boolean = false;


  constructor(private activatedRoute: ActivatedRoute, private forumService: ForumService, private commentService: CommentService, private filesService: FilesService) { }

  ngOnInit() {
    this.forumId = this.activatedRoute.snapshot.params.forumId;

    this.forumService.getForum(this.forumId).
      subscribe(
        data => {
          this.forumTitle = data.title;
          this.forumDescription = data.content;
          document.getElementById('contentForum').innerHTML = this.forumDescription;
          this.getForumResponses();
        },
        error => {
          console.log("Error", error);
        }
      );
  }

  registerComment() {
    if (this.response.length > 0) {
      this.filesService.uploadFiles(this.files)
        .pipe(mergeMap(this.commentService.commentForum(this.response, this.forumId)))
        .subscribe(
          data => {
            console.log(data);
            this.getForumResponses();
          },
          error => {
            console.log("Error", error);
          }
        );
    }
    else { M.toast({ html: 'You have to comment something' }); }

  }

  editComment(answerId) {
    if (this.response.length > 0) {
      this.filesService.uploadFiles(this.files)
        .pipe(mergeMap(this.commentService.editAnswer(this.response, answerId)))
        .subscribe(
          data => {
            console.log(data);
            this.getForumResponses();
          },
          error => {
            console.log("Error", error);
          }
        );
    }
    else { M.toast({ html: 'You must to write something' }); }

  }

  processFile(imageInput: any, imageInputFile: any) {
    const extractFileType = fileName => fileName.match(/\.(\w+)$/)[1].toLowerCase();

    this.fileTypeName = [];
    this.files = imageInputFile;

    for (let file of imageInputFile) 
    {
      let fileTypeAndName = { "name": file.name, "type": extractFileType(file.name) };
      this.fileTypeName.push(fileTypeAndName);
    }

    this.files = imageInputFile;
  }

  getForumResponses() {
    this.forumService.getForumResponses(this.forumId).
      subscribe(
        data => {
          this.responses = data;
          console.log(data);
          const userId = localStorage.getItem('userId');
          // Declaracion de una funcion
          const isMine = (comment) => comment.studentDetails !== null &&
            comment.studentDetails.userId === userId;

          // Se realiza una funcion ForEach de data que son las respuestas
          data.forEach((answer: any) => {
            answer.mine = isMine(answer)
            // Se realiza un Foreach pero de las respuestas de una respuesta
            answer.replies.forEach((feedback: any) => {
              feedback.mine = isMine(feedback)
            })
          })

          this.responses = data;
          this.commented = (this.responses.length > 0 && this.responses[0].approved != false) ? this.commented = true : this.commented = false;
          console.log(this.responses);
        },
        error => {
          console.log("Error", error);
          this.disableComment = true;
        }
      );
  }
}