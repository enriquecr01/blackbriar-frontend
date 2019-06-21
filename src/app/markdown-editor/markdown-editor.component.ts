import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
declare var tinymce: any;


@Component({
  selector: 'app-markdown-editor',
  templateUrl: './markdown-editor.component.html',
  styleUrls: ['./markdown-editor.component.css']
})

@Injectable({
  providedIn: 'root'
})
export class MarkdownEditorComponent implements OnInit {

  editorForm: FormGroup;
  myTextarea: any;

  constructor() { }

  ngOnInit() {

    tinymce.init(
      {
        selector: "#mceEditor",
        branding: false,
        min_height: 300,
      });
  }

  getEditorContent() {
    //console.log(tinymce.get('mymce1').getContent());
    this.myTextarea = tinymce.get('mceEditor').getContent();
    this.myTextarea = this.myTextarea.replace("<strong>", "<strong><b>");
    this.myTextarea = this.myTextarea.replace("</strong>", "</b></strong>");
    return this.myTextarea;
  }

}
