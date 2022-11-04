import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UploadFileService } from '../Services/upload-file.service';

@Component({
  selector: 'app-image-upload-form',
  templateUrl: './image-upload-form.component.html',
  styleUrls: ['./image-upload-form.component.scss'],
})
export class ImageUploadFormComponent implements OnInit {
  public currentFile: any;
  public currentFile1: any;
  public progress: number;
  public progress1: number;
  public message: string;
  public message1: string;
  // image form Formgroup
  public images: FormGroup;
  public submitted = false;
  public base64String: any;
  public base64String1: any;
  public imageFile!: File;
  public msg: string;
  constructor(
    private fb: FormBuilder,
    private uploadService: UploadFileService
  ) {
    this.msg = '';
    this.base64String = '';
    this.progress = 0;
    this.progress1 = 0;
    this.message = '';
    this.message1 = '';

    // formbuilder
    this.images = this.fb.group({
      imageName: ['', [Validators.required]],
      imageName2: ['', [Validators.required]],
      imageName3: ['', [Validators.required]],
      imageName4: ['', [Validators.required]],
      imageName5: ['', [Validators.required]],
      imagepath1: [''],
      imagepath2: [''],
    });
    // disable  four file
    this.images.get('imageName2')?.disable();
    this.images.get('imageName3')?.disable();
    this.images.get('imageName4')?.disable();
    this.images.get('imageName5')?.disable();
  }
  ngOnInit(): void { }

  /**
   * upload data json server
   */
  upload(): void {
    this.progress = 0;
    this.images.controls['imagepath1'].setValue(this.base64String);
    this.currentFile = this.imageFile;
    this.uploadService.upload(this.images.value).subscribe((event: any) => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round((100 * event.loaded) / event.total);
      } else {
        if (this.progress == 100) {
          //  this.progress = 0;
          if (this.images.controls['imageName'].valid) {
            this.images.get('imageName2')?.enable();
            this.message = 'Successfully Uploaded file';
          }
        }
      }
    });
  }
  /**
   * file upload second json server
   */
  public upload2(): void {
    this.progress = 0;
    this.images.controls['imagepath2'].setValue(this.base64String1);
    this.currentFile1 = this.imageFile;
    this.uploadService.upload(this.images.value).subscribe((event: any) => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress1 = Math.round((100 * event.loaded) / event.total);
      } else {
        if (this.progress1 == 100) {
          //  this.progress = 0;
          if (this.images.controls['imageName2'].valid) {
            this.images.get('imageName3')?.enable();
            this.message1 = 'Successfully Uploaded file';
          }
        }
      }

    });
  }
  /**
   * Function for company logo uploading
   * @param event
   */
  public selectFile(event: any) {
    /**
     *
     *show message validation
     */
    let mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.msg = 'Only images are supported';
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
        this.base64String = reader.result;
      };
    }, 1000);

    setTimeout(() => {
      this.upload();
    }, 2000);
  }

  /***
   * file select second
   */
  public selectFile1(event: any) {
    /**
     *
     *show message validation
     */
    let mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.msg = 'Only images are supported';
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
        this.base64String1 = reader.result;
      };
    }, 1000);

    setTimeout(() => {
      this.upload2()
    }, 2000);
  }
  // select data employe form
  get validdation(): { [key: string]: AbstractControl } {
    return this.images.controls;
  }
}
