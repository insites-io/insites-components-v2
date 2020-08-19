import { h, Component, Prop, Element, Method, Watch, Event, EventEmitter, /*State*/} from "@stencil/core";
import DropZone from "dropzone";

@Component({
  tag: 'ins-input-file',
  styleUrls: [
    '../../assets/dropzone/basic.min.css',
    '../../assets/dropzone/dropzone.min.css'
  ]
})
export class InsInputFile {
  @Element() insInputFileEl: HTMLElement;
  @Event() insFileAdded: EventEmitter;
  @Event() insFileError: EventEmitter;
  @Event() insFileRemoved: EventEmitter;
  @Event() didLoad: EventEmitter;
  @Prop() hasLoad: string;

  @Prop({ mutable: true}) label: string = "Attachment(s)";
  @Prop({ mutable: true }) name: string = "file";
  @Prop({ mutable: true}) fileIcon : string = "icon-notepad"
  @Prop({ mutable: true }) placeholder: string = "Drop file here or click to upload";
  @Prop({ mutable: true }) value: any = []; // [{ name: "2nd-image.jpg", size: 12412, url: "https://uploads.staging.oregon.platform-os.com/instances/658/uploads/images/custom_image/image/3294/transformed_aroma-aromatic-art-434213.jpg" }];
  @Prop({ mutable: true }) hasError: boolean = false;
  @Prop({ mutable: true }) errorMessage: string = "";
  @Prop({ mutable: true }) disabled: boolean = false;
  @Prop({ mutable: true }) required: boolean = false;
  @Prop({ mutable: true }) showLimit: boolean = true;
  @Prop({ mutable: true }) showNotifications: boolean = true;

  @Prop({ mutable: true }) maxFiles: number = 1;
  @Prop({ mutable: true }) maxFilesLabel: string = "Up to";

  @Prop({ mutable: true }) maxFileSize: number = 10;
  @Prop({ mutable: true }) maxFileSizeLabel: string = "Max file size";
  @Prop({ mutable: true }) acceptedFiles: string = null;
  @Prop({ mutable: true }) capture: string = null;

  // auto upload - pOS S3
  @Prop({ mutable: true }) autoUpload: boolean = false;
  @Prop({ mutable: true }) credentialsUrl: string;
  @Prop({ mutable: true }) fieldType: string = "image"; // image/file
  @Prop({ mutable: true }) fieldName: string;
  @Prop({ mutable: true }) s3Data: object;

  /* @State() */ dropZone: any;

  @Watch('disabled')
  disableStateHandler() {
    this.initDropZone();
  }

  componentDidLoad() {
    this.initDropZone();
    this.didLoad.emit();
    if (this.hasLoad && window["Insites"]){
      let func = window["Insites"].methods[this.hasLoad];
      if (func) func(this.insInputFileEl);
    }
  }
  componentDidUpdate() {
    this.initDropZone();
  }

  @Method()
  async processS3AutoUpload(file) {
    this.s3Data = await this.getS3Credentials() as any;

    this.setS3FormData();
    this.dropZone.enqueueFile(file);
    this.dropZone.processQueue();
  }

  @Method()
  async getS3Credentials() {
      return await new Promise(resolve => {
          let xhttp = new XMLHttpRequest();
          let token = document.getElementsByName('csrf-token')[0] as any;

          xhttp.open("GET", this.credentialsUrl, true);
          xhttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");
          xhttp.setRequestHeader("Accept", "application/json");
          xhttp.setRequestHeader("Content-Type", "application/json");
          if (token)
            xhttp.setRequestHeader("X-CSRF-Token", token.content);

          xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
              let response = JSON.parse(xhttp.responseText);
              resolve(response);
            }
          }
          xhttp.send();
      });
  }

  @Method()
  async setS3FormData() {
      let s3Fields = this.s3Data[this.fieldName][this.fieldType].s3_upload;
      this.dropZone.options.url = s3Fields.direct_upload_url;
  }

  @Method()
  async buildFormData(s3Data, formData) {
    let s3Fields = s3Data[this.fieldName][this.fieldType].s3_upload.form_data;
    Object.keys(s3Fields).forEach(function (key) {
        formData.append(key, s3Fields[key]);
    });
  }

  setFileIcon(file) {
    let inputEl = this.insInputFileEl.querySelector('.ins-dropzone');
    let isImage = !file.type && file.type !== '' ? true : file.type.indexOf('image/') >= 0 ? true : false;
    let thumbnail = inputEl.querySelector('.ins-dropzone .dz-preview:last-of-type .dz-image');
    if (!isImage) {
      thumbnail.classList.add(this.fileIcon);
    }
  }

  checkFileSizeDisplay(file) {
    let inputEl = this.insInputFileEl.querySelector('.ins-dropzone');
    let sizeEl = inputEl.querySelector('.ins-dropzone .dz-preview:last-of-type .dz-size');
    if (!file.size || file.size < 0) {
      sizeEl.setAttribute("style", "opacity: 0;");
    }
  }

  errorHandler(file, errorMessage) {
    if (errorMessage) {
      // Remove file on error
      this.dropZone.removeFile(file);

      let errorTooBig = errorMessage.indexOf('too big') >= 0;
      let errorInvalidFileType = errorMessage.indexOf('upload this file type') >= 0;
      let errorFileTooMany = errorMessage.indexOf('upload any more') >= 0;

      if (this.autoUpload && !errorFileTooMany && !errorInvalidFileType && !errorTooBig) {
        if(errorMessage.indexOf('cancel') >= 0) {
          // Upload cancelled
          this.toastIt('success', errorMessage);
        } else {
          // Upload error notification
          this.uploadErrorNotification();
        }
      } else if (this.showNotifications){
        // General error notification
        this.toastIt('error', errorMessage);
      }

    }
  }

  toastIt(type, message) {
    let parent = window as any;
    if(this.showNotifications)
        parent.toastr[type](message);
  }

  @Method()
  async uploadErrorNotification() {
    let message = `Failed to upload attachment(s)`;

    if (!this.dropZone.getUploadingFiles().length) {
      let label = this.label || this.name;
          message += label && label.trim() !== '' ? ` for '${label}' field.` : '.';
          message += ` Please try again.`;

      this.toastIt('error', message);
    }
  }

  emitFileError(file, errorMessage) {
    file.errorMessage = errorMessage;
    this.insFileError.emit(file);
  }
  emitFileAdded(file) {
    this.value.push(file);
    this.insFileAdded.emit(file);
  }

  emitFileRemoved(file) {
    if (file.status !== 'error')
      this.insFileRemoved.emit(file);
    else
      this.emitFileError(file, file.errorMessage);
  }

  processFiles(files) {
    files.forEach(item => {
      this.setFile(item);
    });
  }

  validateFile(file) {
    let isMaxFile = this.dropZone.files.length < this.maxFiles;
    let type = file.url.split(".");
        type = type[type.length - 1];
    let contentType = file.type.split("/")[0];
    let isValidType = this.acceptedFiles
      ? this.acceptedFiles.indexOf(type) >= 0 || this.acceptedFiles.indexOf(contentType) >= 0
      : true;
    let message = "";
        // Invalid file type
        message += isValidType ? '' : `You cannot upload this file type. `;
        message += !isValidType && this.acceptedFiles ? `Accepted file types: (${this.acceptedFiles}). `: '';
        // Max file limit
        message += !isMaxFile ? `You cannot upload any more files. ` : '';
        message += !isMaxFile && this.maxFiles ? `Maximum of ${this.maxFiles} files. ` : '';

    return message;
  }

  setFile(item) {
    let message = this.validateFile(item);
    if (!message) {
      item.accepted = true;
      item.status = "success";
      item.upload = { bytesSent: 0, progress: 0 }
      this.dropZone.emit("addedfile", item);
      this.dropZone.emit("thumbnail", item, item.url);
      this.dropZone.files.push(item);
      this.dropZone.emit("complete", item);
      this.emitFileAdded(item);
    } else {
      this.emitFileError(item, message);
    }
  }

  bindFiles(files) { // mounted / no validation
    if (files.length) {
      this.processFiles(files);
    } else {
      this.setFile(files);
    }
  }

  @Method()
  async getFilesList() {
    return this.dropZone.files;
  }

  @Method()
  async getUploadingFiles() {
    return this.dropZone.getUploadingFiles();
  }

  @Method()
  async setFiles(files) {
    if (!this.disabled) {
      this.bindFiles(files);
    }
  }

  @Method()
  async removeFiles() {
    this.dropZone.removeAllFiles();
  }

  @Method()
  async trigger(){
    this.dropZone.hiddenFileInput.click()
  }

  @Method()
  async getDropzoneInstance(){
    return this.dropZone;
  }

  initDropZone() {
    if (!this.dropZone) {
      let self = this;

      let inputEl = self.insInputFileEl.querySelector('.ins-dropzone');
      self.dropZone = new DropZone(inputEl, {
        "autoProcessQueue": false,
        "autoQueue": false,
        "addRemoveLinks": true,
        "parallelUploads": self.maxFiles > 0 ? self.maxFiles : 1,
        "capture": self.capture,
        "maxFilesize": self.maxFileSize > 0 ? self.maxFileSize : 1,
        "maxFiles": self.maxFiles > 0 ? self.maxFiles : 1,
        "acceptedFiles": self.acceptedFiles,
        "url": "/",
        "dictFileTooBig": `File too big. Maximum of ${this.maxFileSize + 'MB'}. `,
        "dictInvalidFileType": `You cannot upload this file type. Accepted file types: (${this.acceptedFiles}). `,
        "dictMaxFilesExceeded": `You cannot upload any more files. Maximum of ${this.maxFiles } files. `,
        init: function () {
          if (self.value.length) {
            setTimeout(() => {
              self.bindFiles(self.value);
            }, 200);
          }
          this.on('addedfile', (file) => {
              self.setFileIcon(file);
              self.checkFileSizeDisplay(file);
          });
          this.on('removedfile', (file) => {
            self.emitFileRemoved(file);
          });
          this.on('error', (file, errorMessage) => {
            self.errorHandler(file, errorMessage);
          });
          this.on('sending', (_file, _xhr, formData) => {
            // add S3 formData to payload
            self.buildFormData(self.s3Data, formData);
          });
          this.on('success', (file, response) => {
            // get URL from S3 response and add it to file attribute 'upload_url'
            let parser = new DOMParser();
            let xml = parser.parseFromString(response, "text/xml");
                file.upload_url = xml.getElementsByTagName("Location")[0].textContent;
          });
        },
        accept: function (file, done) {
          if (self.autoUpload) {
              self.processS3AutoUpload(file);
          }
          self.emitFileAdded(file);
          done();
        }
      });
    }
  }

  render() {
    return (
      <div class={`ins-input-file-wrapper ins-form-field-wrap ${this.hasError ? 'is-invalid' : ''}`}>
        <label class="ins-form-label">{this.label}
          {this.showLimit && !this.disabled ?
          <div class="file-restrictions">
            <span>
              {this.maxFilesLabel+': '+ this.maxFiles + ' file' + (this.maxFiles > 1 ? 's':'' )}
                , {this.maxFileSizeLabel}: { this.maxFileSize + 'MB' }</span>
          </div> : ''}
        </label>
        <div class={`ins-dropzone ${this.autoUpload ? 'auto-upload' : ''}`}>
          <div class="fallback">

            <input type="file" capture={this.capture}
              multiple name={this.name}
              disabled={this.disabled}
              required={this.required} />

          </div>
          <div class="dz-message">
            {this.placeholder}
          </div>
        </div>
        {this.hasError ?
          <div class="ins-form-error">
              {this.errorMessage}
          </div> : '' }
      </div>
    )
  }
}
