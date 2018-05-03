import { Component } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { FileDetails } from '../shared/models/fileDetails';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { DataService } from '../shared/services/dataService'
import { Well } from '../shared/models/well';

@Component({
  selector: 'app-uploaddata',
  templateUrl: './uploaddata.component.html',
  styleUrls: ['./uploaddata.component.scss']
})
export class UpLoadDataComponent {

  // Flag is set to true iff user is dragging an item over the drop zone
  draggingOverDropZone = false;

  // File uploader ( from ng2-file-upload asset )
  uploader: FileUploader = new FileUploader({});

  // TODO: REMOVE
  // A flag the prototype reviewer can set to control whether an
  // uploaded file has errors.
  showReviewerUploadErrors: boolean;

  fileIsUploading = false;
  fileUploadComplete = false;
  fileUploadProgress = 0; // percent (%) of file uploaded

  // Mock values for uploaded file
  fileMBUploaded: number | string = 0; 	// MBs of data uploaded

  mockFile: FileDetails = {
    name: 'frac_data.csv',
    size: 500
  };

  // Begins MOCK uploading of file
  private beginMockUploadingFile(file?: File) {
    this.fileIsUploading = true;

    window.requestAnimationFrame(this.updateFileUpload.bind(this));
  }

  private updateFileUpload() {
    // increase upload progress 1 percent every frame
    const progressIncrement = 1;

    this.fileUploadProgress = Math.min(100, this.fileUploadProgress + progressIncrement);
    this.fileMBUploaded = (this.mockFile.size * (this.fileUploadProgress / 100)).toFixed(2);

    // Check if file upload is still in-progress
    if (this.fileUploadProgress < 100 && this.fileIsUploading) {
      window.requestAnimationFrame(this.updateFileUpload.bind(this));
    }

    // Check if file upload has completed
    if (this.fileUploadProgress === 100 && this.fileIsUploading) {

      this.handleNewFileUpload();

    }
  }

  private cancelFileUpload() {
    this.fileIsUploading = false;
    this.fileUploadProgress = 0;
    this.fileMBUploaded = 0;
  }

  // Handles ( mock ) uploaded file.
  // Conditionally sets file errors ( for prototype reviewer ) and saves
  // file to service so other parts of the application can access it.
  private handleNewFileUpload() {
    this.fileUploadComplete = true;


    // Save file to service
    //this.fileService.newFileUploaded(this.mockFile);
  }


  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router) { }

  // Sets the `draggingOverDropZone` flag to `true` iff user is currently dragging
  // a file over the drop zone.
  //
  // Called when the ng2-file-upload 'fileOver' event is fired.
  //
  // Parameters:
  // - fileOverZone: boolean
  // --- true iff dragged file is currently over the drop zone
  onFileOverDropZone(fileOverZone: boolean) {
    this.draggingOverDropZone = fileOverZone;
  }

  // Called after the ng2-file-upload 'onFileDrop' event is fired.
  // Checks that a file was dropped and begins mock uploading.
  onDrop(fileList: FileList) {

    const fileDropped = fileList.length;
    if (fileDropped) {
      this.beginMockUploadingFile();
    } else {
      console.log('Dropped item is NOT a file');
    }

    this.draggingOverDropZone = false;
  }

  //
  // Called after user uploads a file with the <input type="file">
  // element.
  // Begins mock upload of file if it exists
  onFileChange(event) {

    const fileExists = event.target.files.length;

    if (fileExists) {
      const file = event.target.files[0];
      this.beginMockUploadingFile(file);
    }
  }



  onCancelUploadBtnClick() {
    this.cancelFileUpload();
  }

  // Called after user clicks 'Proceed to Error Reporting' button.
  //
  // Removes the appearance of the upload errors and navigates to the Upload Errors page.
  // For demonstration purposes only.
  onErrorReportingBtnClick() {
    //this.fileService.toggleDisplayUploadErrors();
  }
  allWells: Well[]

  ngOnInit() {
    this.dataService.getWells().subscribe(wells => this.allWells = wells);
    this.selectedWell = new Well();
  }
  selectedWell: Well;

  formatter = (result: string) => result.toUpperCase();

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term.length < 1 ? []
        : this.allWells.filter(v => v.wellName.toLowerCase().indexOf(term.toLowerCase()) > -1)
          .slice(0, 10)
          .map(w => w.wellName)
      );

  clearSingle() {
    this.selectedWell = new Well();
  }

}