import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ImageUploadFormComponent } from './image-upload-form/image-upload-form.component';
import { CoreModule } from './core/core.module';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UploadFileService } from './Services/upload-file.service';
import { FileUploadComponent } from './file-upload/file-upload.component';



@NgModule({
  declarations: [
    AppComponent,
    ImageUploadFormComponent,
    FileUploadComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    CoreModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  providers: [UploadFileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
