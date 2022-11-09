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
  public message2: string;
  public message3: string;
  public message4: string;
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
    this.message2 = '';
    this.message3 = '';
    this.message4 = '';

    // formbuilder
    this.images = this.fb.group({
      imageName: ['', [Validators.required]],
      imageName2: ['', [Validators.required]],
      imageName3: ['', [Validators.required]],
      imageName4: ['', [Validators.required]],
      imageName5: ['', [Validators.required]],
      imagepath1: [''],
      imagepath2: [''],
      imagepath3: [''],
      imagepath4: [''],
      imagepath5: [''],
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
            if (this.images.controls['imageName2'].valid) {
              this.images.get('imageName3')?.enable();
              this.message1 = 'Successfully Uploaded file';
            }
            if (this.images.controls['imageName3'].valid) {
              this.images.get('imageName4')?.enable();
              this.message2 = 'Successfully Uploaded file';
            }
           if (this.images.controls['imageName4'].valid) {
              this.images.get('imageName5')?.enable();
              this.message3 = 'Successfully Uploaded file';
            }
             if (this.images.controls['imageName5'].valid) {
              this.message3 = 'Successfully Uploaded file';
            }
          }
          
        }
      }
    });
  }
  
  
  /**
   * Function for company logo uploading
   * @param event
   */
  public selectFile(event: any,data:any) {
     this.imageFile = event.target.files[0];
      /**
       * image priview
       */
      let reader = new FileReader();
      reader.readAsDataURL(this.imageFile);
      reader.onload = () => {
        this.base64String = reader.result;
      };
      if(data==1){
        setTimeout(() => {
          this.upload();
        }, 2000);
      }
      if(data==2){
        setTimeout(() => {
          this.upload();
        }, 2000);
      }
      if(data==3){
        setTimeout(() => {
          this.upload();
        }, 2000);
      }
      if(data==4){
        setTimeout(() => {
          this.upload();
        }, 2000);
      }
      if(data==5){
        setTimeout(() => {
          this.upload();
        }, 2000);
      }
    
  }
  // form validation
  get validdation(): { [key: string]: AbstractControl } {
    return this.images.controls;
  }
}
