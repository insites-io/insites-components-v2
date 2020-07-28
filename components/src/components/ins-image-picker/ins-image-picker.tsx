import { h, Component, Prop, State, Element, Event, EventEmitter} from '@stencil/core';
import Cropper from 'cropperjs';

@Component({
  tag: 'ins-image-picker',
  styleUrls: ["../../../node_modules/cropperjs/dist/cropper.min.css"]
})
export class Insimagepicker {
  @Element() insImagePickerEl: HTMLElement;
  @Event() insValueChange: EventEmitter;
  @Event() didLoad: EventEmitter;
  @Prop() hasLoad: string;

  @Prop({mutable: true}) imgType: string = 'picture';
  @Prop({mutable: true}) label: string = 'CHANGE PICTURE';
  @Prop({mutable: true}) buttonColor: string = 'blue';
  @Prop({mutable: true}) placeholder: string = 'Drag and drop the file or add an image';
  @Prop({mutable: true}) name: string;
  @Prop({mutable: true}) value: any;
  @Prop({mutable: true}) fileName: any;
  @Prop({mutable: true}) notImageFile: boolean;
  @Prop({mutable: true}) uploadImgContainer: string = "";
  @Prop({mutable: true}) uploadImgRecWidth: number = 120;
  @Prop({mutable: true}) uploadImgRecHeight: number = 120;
  @Prop({mutable: true}) uploadImgRecFileSize: number = 25;

  @State() ImageElement: HTMLImageElement;
  @State() modal: any;
  @State() image: any;
  @State() cropper: any;
  @State() base64: any;
  @State() hiddeninput: any;
  @State() showModal: boolean;

  componentDidLoad () {
    this.modal = this.insImagePickerEl.querySelector('.modal');
    this.hiddeninput = this.insImagePickerEl.querySelector('.hidden-input');
    this.didLoad.emit();
    if (this.hasLoad && window["Insites"]){
      let func = window["Insites"].methods[this.hasLoad];
      if (func) func(this.insImagePickerEl);
    }
  }

  displayImage(evt) {
    let tgt = evt.target || window.event.srcElement;
    this.processImgFile(tgt.files);
  }

  handleDrop(event) {
    event.preventDefault();
    let dt = event.dataTransfer;
    this.openModal();
    this.processImgFile(dt.files);
  }

  processImgFile(files) {
    let component = this;

    if (files[0] && (files[0].type === 'image/jpeg' || files[0].type === 'image/png')) {
      this.notImageFile = false;
      this.fileName = files[0].name;

      if (FileReader && files && files.length) {
          let fr = new FileReader();
          fr.onload = function () {

            component.ImageElement = component.insImagePickerEl.querySelector('.image');
            component.ImageElement.src = fr.result as any;
            // component.insImagePickerEl.querySelector('.upload').classList.remove('show');
            // component.insImagePickerEl.querySelector('.save').classList.add('show');

            // initialize cropper
            component.initCropper();
          }
          fr.readAsDataURL(files[0]);
      }

    } else if(files[0].type.includes('image/svg')) {
      this.notImageFile = false;
      this.fileName = files[0].name;

      if (FileReader && files && files.length) {
        let fr = new FileReader();
        fr.onload = function () {

          component.image = component.insImagePickerEl.querySelector('.image');
          component.image.parentElement.classList.add('svg-type');
          component.image.src = fr.result as any;
          component.base64 = fr.result;

        }
        fr.readAsDataURL(files[0]);
    }

    } else {
      this.notImageFile = true;
      this.ImageElement = this.insImagePickerEl.querySelector('.image');
      // console.log(this.ImageElement);
      this.ImageElement.src = '';
      this.cropper.destroy();
    }
  }

  initCropper() {
    let aspectRatio = NaN;
    if (this.uploadImgContainer === "rectangle"){
      aspectRatio = NaN;
    } else {
      aspectRatio = 1/1;
      // width:
    }

    let component = this;

    if (this.cropper){
      this.cropper.destroy();
    }

    this.image = this.insImagePickerEl.querySelector('.image');
    this.cropper = new Cropper(this.image, {
      aspectRatio: aspectRatio,
      crop() {
        component.base64 = this.cropper.getCroppedCanvas({
          // width: customWidth,
          // height: '120'
        }).toDataURL();
      },
      ready () {
        component.base64 = this.cropper.getCroppedCanvas({
          // width: customWidth,
          // height: '120'
        }).toDataURL();
      }
    })
  }

  exportImage(e) {
    e.preventDefault();
    // this.ImageElement = this.insImagePickerEl.querySelector('.profile');
    // this.ImageElement.src = this.base64;
    // this.insValueChange.emit(this.base64);
    // this.insImagePickerEl.querySelector('.img-placeholder').classList.remove('show');
    // this.ImageElement.classList.add('show');

    this.value = this.base64;
    this.insValueChange.emit({
      base64: this.base64,
      filename: this.fileName
    });
    this.closeModal(e);
  }

  openModal() {
    // this.modal.classList.add('show');
    this.showModal = true;
  }

  closeModal(e) {
    e.preventDefault();
    // this.modal.classList.remove('show');
    this.showModal = false;
    setTimeout(() => {
      let rippleWaves = this.insImagePickerEl.querySelectorAll('.ripple-wave');
      for (let i = 0; i < rippleWaves.length; i++){
        let parentNode = rippleWaves[i].parentNode;
        parentNode.removeChild(rippleWaves[i]);
      }
    });
  }

  addImage() {
    this.hiddeninput.click();
  }

  handleDrag(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div class={`image-picker ${this.uploadImgContainer}`}>
        <div class='inline-block img-container'
        onDragOver={this.handleDrag}
        onDrop={this.handleDrop.bind(this)}>
          {this.value ?
            <img src={this.value} alt={this.fileName} class='profile'
            onClick={this.openModal.bind(this)} /> :
            <div class='img-placeholder img-preview-holder'
            onClick={this.openModal.bind(this)}>
              <span class="texts_image">{this.placeholder}</span>
              {/*<div class="icon-wrap"><i class="icon-photo"></i></div>*/}
            </div>
          }
        </div>
        <div class="inline-block">
          <span class="texts_uploadinfo">
          File Formats: JPG, JPEG, PNG or SVG. <br />
          Recommended Dimensions: {`${this.uploadImgRecWidth}px x ${this.uploadImgRecHeight}px`}<br />
          Recommended File Size: {`${this.uploadImgRecFileSize} kb`}

          </span>
          <ins-button
           // label={'CHANGE ' + this.imgType}
           // label={this.label}
            label= {this.value ? 'CHANGE ' + this.imgType : 'ADD ' + this.imgType}
            type="button"
            size="small"
            color={this.buttonColor}
            outlined
            onClick={this.openModal.bind(this)}>
          </ins-button>
        </div>

        <div class={`modal ${this.showModal ? 'show':''} ${this.notImageFile ? 'has-error': ''}`}>
          <ins-backdrop>
            <ins-card steady>

              <div class="modal-header">
                <h3>Upload Image</h3>
                <span class="icon-close-1" onClick={this.closeModal.bind(this)}></span>
              </div>

              <div class={`image-preview`}
              onDragOver={this.handleDrag}
              onDrop={this.handleDrop.bind(this)}>
                {/* <div class="label-content">
                  <i class="icon-image"></i>
                  <h4>Add {this.imgType}</h4>
                  <h4>{this.label}</h4>
                </div> */}
                {!this.base64 ?
                <p class="placeholder-text">Drag and drop the file or add an image</p>
                : '' }
                <img src="" alt="" class="image" />
              </div>

              <div class={`error-wrap`}>
                <span>Please choose image files only.</span>
              </div>

              <div class="controllers">
                <ins-button label="CHOOSE A FILE" type="button" outlined
                  onInsClick={this.addImage.bind(this)}>
                </ins-button>

                {/* <ins-button label="CANCEL" type="button"
                  onInsClick={this.closeModal.bind(this)}>
                </ins-button> */}

                {this.image ?
                <ins-button label="SAVE" type="button" solid
                  onInsClick={this.exportImage.bind(this)}
                  disabled={this.notImageFile}>
                </ins-button> : ''}

                <input type="file" class="hidden-input"
                  name={this.name}
                  onChange={this.displayImage.bind(this)} />
              </div>

            </ins-card>
          </ins-backdrop>
        </div>
      </div>
    );
  }
}
