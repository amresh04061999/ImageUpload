import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Image } from '../image-upload-form/model/Image.model';

@Injectable()
export class UploadFileService {
  private baseUrl: String
  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl
  }

  /**
   *http post data
   * @param image
   * @returns
   */
  upload(image: Image): Observable<HttpEvent<Image>> {
    const req = new HttpRequest('POST', `${this.baseUrl}images`, image, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }


}
