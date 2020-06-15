import { h, Component, Prop, Element, State, Method, Watch, Event, EventEmitter} from "@stencil/core";
import DropZone from "dropzone";

@Component({
  tag: 'ins-input-file',
  styleUrls: [
    '../../../node_modules/dropzone/dist/min/basic.min.css',
    '../../../node_modules/dropzone/dist/min/dropzone.min.css',
  ]
})
export class InsInputFile {
  @Element() insInputFile: HTMLElement;
  @Event() fileAdded: EventEmitter;
  @Event() fileError: EventEmitter;
  @Event() fileRemoved: EventEmitter;

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

  @Prop({ mutable: true }) maxFiles: number = 1;
  @Prop({ mutable: true }) maxFilesLabel: string = "Up to";

  @Prop({ mutable: true }) maxFileSize: number = 10;
  @Prop({ mutable: true }) maxFileSizeLabel: string = "Max file size";
  @Prop({ mutable: true }) acceptedFiles: string;

  @State() dropZone: any;

  @Watch('disabled')
  disableStateHandler() {
    this.initDropZone();
  }

  componentDidLoad() {
    this.initDropZone();
  }
  componentDidUpdate() {
    this.initDropZone();
  }

  setFileIcon(file) {
    let inputEl = this.insInputFile.querySelector('.dropzone');
    let isImage = !file.type && file.type !== '' ? true : file.type.indexOf('image/') >= 0 ? true : false;
    let thumbnail = inputEl.querySelector('.dropzone .dz-preview:last-of-type .dz-image');
    if (!isImage) {
      thumbnail.classList.add(this.fileIcon);
    }
  }

  checkFileSizeDisplay(file) {
    let inputEl = this.insInputFile.querySelector('.dropzone');
    let sizeEl = inputEl.querySelector('.dropzone .dz-preview:last-of-type .dz-size');
    if (!file.size || file.size < 0) {
      sizeEl.setAttribute("style", "opacity: 0;");
    }
  }

  emitFileError(file, errorMessage) {
    file.errorMessage = errorMessage;
    this.fileError.emit(file);
  }
  emitFileAdded(file) {
    this.value.push(file);
    this.fileAdded.emit(file);
  }
  emitFileRemoved(file) {
    if(file.status !== 'error')
      this.fileRemoved.emit(file);
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
    let isValidType = this.acceptedFiles ? this.acceptedFiles.indexOf(type) >= 0 : true;
    let message = "";
        message += !isValidType && this.acceptedFiles ? `You cannot upload this file type. Accepted file types: (${this.acceptedFiles}). ` : '';
        message += !isMaxFile ? `You cannot upload any more files. Maximum of ${this.maxFiles} files. ` : '';

    return message;
  }

  setFile(item) {
    let message = this.validateFile(item);
    if (!message) {
      item.accepted = true;
      item.status = "queued";
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
  getFilesList() {
    return this.dropZone.files;
  }

  @Method()
  setFiles(files) {
    if (!this.disabled) {
      this.bindFiles(files);
    }
  }

  @Method()
  removeFiles() {
    this.dropZone.removeAllFiles();
  }

  initDropZone() {
    if (!this.dropZone) {
      let self = this;
      let inputEl = self.insInputFile.querySelector('.dropzone');
      self.dropZone = new DropZone(inputEl, {
        "autoProcessQueue": false,
        "addRemoveLinks": true,
        "uploadMultiple": true,
        "maxFilesize": self.maxFileSize > 0 ? self.maxFileSize : 1,
        "maxFiles": self.maxFiles > 0 ? self.maxFiles : 1,
        "acceptedFiles": self.acceptedFiles,
        "url": "/",
        init: function () {
          if(self.value.length) {
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
            if (errorMessage) this.removeFile(file); // Remove file on error
            self.emitFileError(file, errorMessage);
          });
        },
        accept: function (file, done) {
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
          <div class="file-restirctions">
            <span>
              {this.maxFilesLabel+': '+ this.maxFiles + ' file' + (this.maxFiles > 1 ? 's':'' )}
                , {this.maxFileSizeLabel}: { this.maxFileSize + 'mb' }</span>
          </div> : ''}
        </label>
        <div class="dropzone">
          <div class="fallback">
            <input type="file" multiple name={this.name} disabled={this.disabled} required={this.required}/>
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
