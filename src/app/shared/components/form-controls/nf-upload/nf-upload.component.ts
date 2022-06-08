import { ReadVarExpr } from '@angular/compiler';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'nf-upload',
  templateUrl: './nf-upload.component.html',
  styleUrls: ['./nf-upload.component.scss']
})
export class NfUploadComponent implements OnInit {
  @ViewChild('fileInput', { static: true }) fileInput!: ElementRef;


  @Input() accept = '.pdf';
  @Input('multiple') multiple: boolean | string = false;

  @Output() fileLoaded = new EventEmitter();

  dataTransfer = new DataTransfer();

  constructor() { }

  ngOnInit(): void {
  }


  onUpdatedElement(files: FileList): void {
    const fileInput = this.fileInput.nativeElement;

    Array.prototype.forEach.call(files, (item: File) => {
      this.dataTransfer.items.add(item);
      this.uploadSingleFile(item);
    });

    fileInput.files = this.dataTransfer.files;
  }


  get _files(): any {
    const filesTrad: any = [];
    const files = this.dataTransfer.files;

    Array.prototype.forEach.call(files, (item: any) => {
      const { name, size, type, status, message, loaded, messageType } = item;
      const typeExtArr = name.split('.').length;
      const typeExt = typeExtArr.length ? typeExtArr.pop() : 'none';
      const sizeMB = (size / 1024 / 1024).toFixed(2);

      const fileObj = { name, size, type, typeExt, sizeMB, status, message, loaded, messageType };
      filesTrad.push(fileObj);
    });
    return filesTrad;
  }


  get lastUpload(): any {
    return this._files.pop();
  }

  uploadSingleFile(file: any): void {
    const fr = new FileReader();
    fr.readAsDataURL(file);


    fr.onload = () => {
      console.log(file);
      // this.service.uploadFile(this.fileUrl, file)
      //   .subscribe(event => {
      //     if (event.type === HttpEventType.UploadProgress) {
      //       const percentCompleted = Math.floor(event.loaded * 100 / event.total);
      //       file.message = 'UPLOADING';
      //       file.messageType = 'UPLOADING';
      //       file.loaded = (event.loaded / 1024 / 1024).toFixed(2);
      //       file.status = percentCompleted;
      //     }

      //     if (event.type === HttpEventType.Response) {
      //       if (event.body?.error) {
      //         file.message = event.body.error.message || 'Error';
      //         file.messageType = 'ERROR';
      //       } else {
      //         file.message = 'DONE';
      //         file.messageType = 'DONE';
      //       }
      //     }
      //   });
    };

    fr.onloadend = () => {
      this.fileLoaded.emit(fr.result);
    }
  }

}
