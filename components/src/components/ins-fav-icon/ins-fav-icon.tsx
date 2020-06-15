import { h, Component, Prop, State, Element } from '@stencil/core';
declare var Cropper;

@Component({ tag: 'ins-fav-icon' })
export class insFavIcon {
  @Element() insFavIcon: HTMLElement;

  @Prop() type: string = 'picture';
  @Prop() buttonColor: string = 'blue';
  @State() ImageElement: HTMLImageElement;
  @State() modal: any;
  @State() image: any;
  @State() cropper: any;
  @State() base64: any;
  @State() hiddeninput: any;

  componentDidLoad () {
    this.modal = this.insFavIcon.querySelector('.modal');
    this.hiddeninput = this.insFavIcon.querySelector('.hidden-input');
  }

  initCropper() {
    let component = this;
    this.image = this.insFavIcon.querySelector('.image');
    this.cropper = new Cropper(this.image, {
      aspectRatio: 1/1,
      crop() {
        component.base64 = this.cropper.getCroppedCanvas({
          width: '120',
          height: '120'
        }).toDataURL();
      },
      ready () {
        component.base64 = this.cropper.getCroppedCanvas({
          width: '120',
          height: '120'
        }).toDataURL();
      }
    })
  }

  displayImage(evt) {
    let tgt = evt.target || window.event.srcElement,
        files = tgt.files,
        component = this;

    if (FileReader && files && files.length) {
        var fr = new FileReader();
        fr.onload = function () {
            component.ImageElement = component.insFavIcon.querySelector('.image');
            // component.ImageElement.src = fr.result;
            component.insFavIcon.querySelector('.upload').classList.remove('show');
            component.insFavIcon.querySelector('.save').classList.add('show');
            component.initCropper();
        }
        fr.readAsDataURL(files[0]);
    }
  }

  exportImage(e) {
    e.preventDefault();
    this.ImageElement = this.insFavIcon.querySelector('.profile');
    this.ImageElement.src = this.base64;
    this.insFavIcon.querySelector('.img-placeholder').classList.remove('show');
    this.ImageElement.classList.add('show');
    this.closeModal(e);
  }

  openModal() {
    this.modal.classList.add('show');
  }

  closeModal(e) {
    e.preventDefault();
    this.modal.classList.remove('show');
  }

  addImage() {
    this.hiddeninput.click();
  }

  render() {
    return (
      <div class="ins-favicon-wrapper">
        <div class="image-picker">
          <div class="inline-block">
            <div class="img-placeholder show" onClick={this.openModal.bind(this)}>
              <span>Drag and drop the file or add an image</span>
            </div>
            <img src="" alt="" class="profile" onClick={this.openModal.bind(this)} />
          </div>
          <div class="inline-block">
            <span>JPG or PNG, at least 300px</span>
            <ins-button label={'ADD ' + this.type} outlined color={this.buttonColor} onClick={this.openModal.bind(this)}></ins-button>
          </div>
          <div class="modal">
            <ins-backdrop>
              <ins-card steady>
                {/* <h3>Add Picture</h3> */}
                <div class="image-preview">
                  <div class="label-content">
                    <i class="icon-image"></i> 
                    <h4>Add Picture</h4>
                  </div>
                  <img src="" alt="" class="image" />
                </div>
                <div class="controllers">
                  <ins-button label="CANCEL" outlined onClick={this.closeModal.bind(this)} class="cancel show"></ins-button>
                  <ins-button label="SAVE" solid onClick={this.exportImage.bind(this)} class="save"></ins-button>
                  <ins-button label="CHOOSE A FILE" solid onClick={this.addImage.bind(this)} class="upload show"></ins-button>
                  <input type="file" class="hidden-input" onChange={this.displayImage.bind(this)} />
                </div>
                {/* <span class="icon-close-1" onClick={this.closeModal.bind(this)}></span> */}
              </ins-card>
            </ins-backdrop>
          </div>
        </div>
      </div>
    );
  }
}