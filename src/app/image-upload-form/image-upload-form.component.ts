import { animate } from '@angular/animations';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadFileService } from '../Services/upload-file.service';

@Component({
  selector: 'app-image-upload-form',
  templateUrl: './image-upload-form.component.html',
  styleUrls: ['./image-upload-form.component.scss']
})
export class ImageUploadFormComponent implements OnInit {
  public currentFile: any;
  public progress = 0;
  public message = '';
  // image form Formgroup
  public images: FormGroup
  public submitted = false;
  public base64String: any
  public imageFile!: File
  public msg: string

  constructor(private fb: FormBuilder,
    private uploadService: UploadFileService,) {
    this.msg = ''
    this.base64String = ''
    // formbuilder
    this.images = this.fb.group({
      imageName: ['', [Validators.required]],
      imageName2: ['', [Validators.required]],
      imagepath1: [''],
    })
    // disable next file
    this.images.get('imageName2')?.disable()
  }

  ngOnInit(): void {
  }
  /**
   * upload data json server
   */
  upload(): void {
    this.progress = 0;
    this.images.controls['imagepath1'].setValue(this.base64String);
    this.currentFile = this.imageFile;
    this.uploadService.upload(this.images.value).subscribe(
      (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else {
          if (this.progress == 100) {
            if (this.images.controls['imageName'].valid) {
              this.images.get('imageName2')?.enable()

            }
          }

        }
      },);

  }
  /**
     * Function for company logo uploading
     * @param event
     */
  selectFile(event: any) {
    setTimeout(() => {
      this.upload()
    }, 2000);
    /**
     *
     *show message validation
     */
    let mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.msg = "Only images are supported";
      return;
    }
    setTimeout(() => {
      if (event.target.files.length > 0) {
        this.imageFile = event.target.files[0];
      }
      /**
       * image priview
       */
      let reader = new FileReader();
      reader.readAsDataURL(this.imageFile);
      reader.onload = () => {
        this.base64String = reader.result
        console.log(this.base64String)
      }
    }, 1000);
  }
  // select data employe form
  get validdation(): { [key: string]: AbstractControl } {
    return this.images.controls;
  }
}
