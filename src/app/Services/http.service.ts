import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Image } from '../image-upload-form/model/Image.model';

@Injectable()
export class HttpService {
  private baseUrl: String
  constructor(private _http: HttpClient) {
    this.baseUrl = environment.baseUrl
  }

  /**
   *add image in json server
   * @param image
   * @returns
   */
  addComapny(image: Image): Observable<Image> {
    const URL: string = `${this.baseUrl}images`;
    return this._http.post<Image>(URL, image);
  }

}
