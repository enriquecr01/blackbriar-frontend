import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private http : HttpClient) { }

  public uploadImage(image: File) 
  {
    const formData = new FormData();

    formData.append('file', image);

    return this.http.post('https://api.blackbriar.site/files', formData, {responseType: 'text'});
  }
}
