import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ForumService } from '../../services/forum.service';
import { CommentService } from '../../services/comment.service';
import { Answer } from 'src/app/models/answer';
import { ImageSnippet } from 'src/app/models/imagesnippet';
import { FilesService } from './../../files.service';

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
  files : string[] = [];
  

  constructor(private activatedRoute: ActivatedRoute, private forumService: ForumService, private commentService: CommentService, private filesService: FilesService) { }

  ngOnInit() {
    this.forumId = this.activatedRoute.snapshot.params.forumId;

    this.forumService.getForum(this.forumId).
      subscribe(
        data => {
          this.forumTitle = data.title;
          this.forumDescription = data.content;
          this.getForumResponses();
        },
        error => {
          console.log("Error", error);
        }
      );

  }

  registerComment() 
  {
    console.log(this.files);
    if (this.response.length > 0) 
    {
      this.commentService.commentForum(this.response, this.forumId).
        subscribe(
          data => {
            console.log(data);
            this.getForumResponses();
          },
          error => {
            console.log("Error", error);
          }
        );
    }
    else { M.toast({html: 'You have to comment something'}); }
  }

  processFile(imageInput: any, imageInputFile: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    console.log(imageInput);
    console.log(imageInputFile);
    
    for(let file of imageInputFile)
    {
      console.log(file);
      this.filesService.uploadImage(file).subscribe(
        data => {
          this.files.push(data);
          console.log(data);
        },
        error => {
          console.log(error);
        });
    }

    console.log(this.files);

    // imageInputFile.forEach((file) => {
    //   console.log(file);
    //   // this.filesService.uploadImage(this.selectedFile.file).subscribe(
    //   //   data => {
    //   //     console.log(data);
    //   //   },
    //   //   error => {
    //   //     console.log(error);
    //   //   });
    // })

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
          this.commented = (this.responses.length > 0) ? this.commented = true : this.commented = false;
          console.log(this.responses);
        },
        error => {
          console.log("Error", error);
        }
      );
  }

}
