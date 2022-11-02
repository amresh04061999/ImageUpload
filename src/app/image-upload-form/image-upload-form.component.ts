import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-image-upload-form',
  templateUrl: './image-upload-form.component.html',
  styleUrls: ['./image-upload-form.component.scss']
})
export class ImageUploadFormComponent implements OnInit {

  // image form Formgroup
  public images: FormGroup
  imageFile: any
  public msg: string
  constructor(private fb: FormBuilder) {
    this.msg = ''

    // formbuilder
    this.images = this.fb.group({

    })
  }

  ngOnInit(): void {
  }




  /**
     * Function for company logo uploading
     * @param event
     */
  selectFile(event: any) {
    /**
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
