import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor(private httpClient: HttpClient) {}

  uploadImage(image: File){
    const formData = new FormData();
    formData.append('image', image);

    return this.httpClient.post<string>('https://localhost:44313/UploadImage', formData);
  }
}
