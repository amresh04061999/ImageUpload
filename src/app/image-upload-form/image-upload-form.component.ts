import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from '../Services/http.service';

@Component({
  selector: 'app-image-upload-form',
  templateUrl: './image-upload-form.component.html',
  styleUrls: ['./image-upload-form.component.scss']
})
export class ImageUploadFormComponent implements OnInit {
  percentDone: number;
  uploadSuccess: boolean;

  // image form Formgroup
  public images: FormGroup
  imageFile: any
  public msg: string
  constructor(private fb: FormBuilder,
    private httpServices:HttpService) {
    this.msg = ''
    this.percentDone=0
    this.uploadSuccess=false

    // formbuilder
    this.images = this.fb.group({
      imagepath1:(''),
      imagename1: ('')
    })
  }

  ngOnInit(): void {
  }

  

  uploadImageAndProgress() {
    this.images.controls['imagepath1'].setValue(this.imageFile),
    this.images.controls['imagename1'].setValue(this.imageFile.name),
    this.httpServices.addimage(this.images.value)
      .subscribe((event:any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.percentDone = Math.round((100 * event.loaded) / event.total);
        } else if (event instanceof HttpResponse) {
          this.uploadSuccess = true;
        }
      });
  }
   






















  /**
     * Function for company logo uploading
     * @param event
     */
  selectFile(event: any) {
    /**
     * 
     *show message validation
     */
    let mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.msg = "Only images are supported";
      return;
    }
    if (event.target.files.length > 0) {
      this.imageFile = event.target.files[0];
    }
    /**
     * image priview
     */
    let reader = new FileReader();
    reader.readAsDataURL(this.imageFile);
    reader.onload = () => {
      this.imageFile = String(reader.result)
    }
  }

}
