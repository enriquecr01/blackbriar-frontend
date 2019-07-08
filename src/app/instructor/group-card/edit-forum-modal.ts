import { Component, Inject, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Group } from 'src/app/models/forum';
import { ImageSnippet } from 'src/app/models/imagesnippet';

@Component({
  selector: 'edit-forum-modal',
  templateUrl: 'edit-forum-modal.html',
  styleUrls: ['./edit-forum-modal.css']
})
export class ForumEditModal implements AfterViewInit{
  ngAfterViewInit(): void {this.image = this.group.image;
    console.log(this.image);
  }
  group;
  title: string = "";
  description : string = "";
  image : string = "";
  public : boolean;
  selectedFile: ImageSnippet;
  previewImage: any;
  uploadedImage : boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ForumEditModal>,
    @Inject(MAT_DIALOG_DATA) public data: Group) 
    { 
      console.log(data);
      this.group = data;
      this.public = data.publicGroup; 
      this.description = data.description;
      this.image = data.image;
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  
  processFile(imageInput: any, imageInputFile: any) 
  {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.selectedFile.pending = true;
      var reader = new FileReader();

      console.log(imageInputFile);

      var mimeType = imageInputFile[0].type;
      mimeType.match(/image\/*/);

      // this.imageFile = imageInputFile;
      reader.readAsDataURL(imageInputFile[0]); 
      reader.onload = (_event) => { 
        this.uploadedImage = true;
        this.previewImage = reader.result; 
      }
    })
  }
}