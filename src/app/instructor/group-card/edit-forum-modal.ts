import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Group } from 'src/app/models/forum';
import { ImageSnippet } from 'src/app/models/imagesnippet';
import { GroupsService } from 'src/app/groups.service';
import { FilesService } from 'src/app/files.service';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'edit-forum-modal',
  templateUrl: 'edit-forum-modal.html',
  styleUrls: ['./edit-forum-modal.css']
})
export class ForumEditModal {

  group;
  title: string = "";
  description: string = "";
  image: string = "";
  public: boolean;
  selectedFile: ImageSnippet;
  previewImage: any;
  uploadedImage: boolean = false;
  imageFile;

  constructor(
    private groupsService: GroupsService,
    private filesService: FilesService,
    public dialogRef: MatDialogRef<ForumEditModal>,
    @Inject(MAT_DIALOG_DATA) public data: Group) {
    this.dialogRef.disableClose = true;
    this.group = data;
    this.public = data.publicGroup;
    this.description = data.description;
    this.image = data.image;
  }

  onNoClick(): void {
    console.log(this.group);
    this.dialogRef.close(this.group);
  }

  processFile(imageInput: any, imageInputFile: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    this.uploadedImage = true;
    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.selectedFile.pending = true;
      var reader = new FileReader();

      var mimeType = imageInputFile[0].type;
      mimeType.match(/image\/*/);

      this.uploadedImage = true;

      this.imageFile = imageInputFile;
      reader.readAsDataURL(imageInputFile[0]);
      reader.onload = (_event) => {
        this.previewImage = reader.result;
      }
    });
    reader.readAsDataURL(file);
  }

  updateGroup() {
    if (this.group.description.length < 1) {
      M.toast({ html: 'Your group must to have a description' });
    }
    else {
      this.filesService.uploadImageEdit(this.imageFile, this.image).
        pipe(mergeMap(this.groupsService.editGroup(this.description, this.public, this.group.id)))
        .subscribe(
          data => {
            console.log(data);
            M.toast({ html: "Group edited!" });
            this.dialogRef.close(data);
          },
          error => {
            console.log("Error", error);
          }
        );
    }
  }

}