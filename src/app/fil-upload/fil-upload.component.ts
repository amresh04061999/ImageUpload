import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UploadFileService } from '../Services/upload-file.service';

@Component({
  selector: 'app-fil-upload',
  templateUrl: './fil-upload.component.html',
  styleUrls: ['./fil-upload.component.scss']
})
export class FilUploadComponent implements OnInit {
  public form:FormGroup
  public imagedata :any=[];
  public base64String:any
  public imageFile!: File;
  public msg: string;
  public submitted = false;
  public currentFile: any;
  public progress:number;
  public message:string;
  constructor( private _httpServices:UploadFileService,
    private fb:FormBuilder) {
      this.msg = '';
      this.progress=0;
      this.message=''
      this.imagedata = 
    [
      {labelid: 1, labelname: 'weight', value: 1},
      {labelid: 2, labelname: 'height', value: 5},
      {labelid: 3, labelname: 'width', value: 10},
      {labelid: 4, labelname: 'depth', value: 2},
      {labelid: 5, labelname: 'dexpth', value: 5},
    ]
    this.form=this.fb.group({
      imagepath1:['',Validators.required],
      imagepath2:[''],
      imagepath3:[''],
      imagepath4:[''],
      imagepath5:['']
    })
    this.form=this.createGroup(this.imagedata)
   }

  ngOnInit(): void {
  }
 
createGroup(imagedata:any[]):FormGroup{
  const form=new FormGroup({})
  this.imagedata.forEach((x:any) => {
    console.log(x)
    form.addControl(x.labelname,new FormControl(x.value))
  })
  console.log(form.controls)
  return form
}


public upoloadImage(){
  this.progress = 0;
  this.form.controls['imagepath2'].setValue(this.base64String);
  this.currentFile = this.imageFile;
  this._httpServices.upload(this.form.value).subscribe((event: any) => {
    if (event.type === HttpEventType.UploadProgress) {
      this.progress = Math.round((100 * event.loaded) / event.total);
    } else {
      if (this.progress == 100) {
        this.message = 'Successfully Uploaded file';
       
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
    this.upoloadImage();
  }, 2000);
}

 // select data employe form
 get validdation(): { [key: string]: AbstractControl } {
  return this.form.controls;
}
}
