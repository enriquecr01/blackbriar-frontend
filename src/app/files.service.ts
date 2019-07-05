import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private http: HttpClient) { }

  public uploadImage(image: File) {
    let formData = new FormData();

    formData.append('file', image);

    return this.http.post('https://api.blackbriar.site/files', formData, { responseType: 'text' });
  }

  public uploadImageEdit(image, previousUrl) {
    let formData = new FormData();

    formData.append('file', image[0]);

    console.log(image);
    console.log(formData);

    return image !== undefined ? this.http.post('https://api.blackbriar.site/files', formData, { responseType: 'text' }) : of(previousUrl);
  }

  public uploadFiles(files) {
    const formData = new FormData();
    //Se realiza un append con un for
    for (let file of files) {
      formData.append('files', file);
    }
    return files.length ? this.http.post<string[]>('https://api.blackbriar.site/files/multiple', formData) : of([]);
  }
}
