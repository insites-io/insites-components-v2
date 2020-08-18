import { h, Component, Listen, Element, Prop } from "@stencil/core";
// import Siema from "siema";

@Component({
  tag: 'ins-gallery'
})
export class InsGallery {
  @Element() el: HTMLElement;
  @Prop({ mutable: true }) imgAlt: string;
  @Prop({ mutable: true }) imgTitle: string;
  @Prop({ mutable: true }) zoomable: boolean;

  // TODO:
  // zoom width and height
  // zoom level

  imgEl;
  defaultImg;

  @Listen('insUpdateSrc')
  insUpdateSrcHandler(e){
    let img = e.detail.actual;
    if (this.imgEl) this.updateSrc(img)
    else this.defaultImg = img;
  }

  updateSrc(img){
    this.imgEl.src = img;
    this.el.classList.add('is-loading');
  }

  componentDidLoad(){
    this.imgEl = this.el
      .querySelector('.ins-gallery_current-image img');

    if (this.defaultImg) this.updateSrc(this.defaultImg);
  }

  onLoadHandler(){
    this.el.classList.remove('is-loading');
    if (this.zoomable) this.imageZoom();
  }

  imageZoom() {
    let lens, result, cx, cy, pEl, margin = 0;
    result = this.el.querySelector('.ins-gallery_current-image .ins-gallery_zoom');
    lens = this.el.querySelector('.ins-gallery_current-image .ins-gallery_lens');
    pEl = this.imgEl.parentElement;

    /* Calculate margins */
    if (pEl.offsetWidth > this.imgEl.offsetWidth ){
      margin = (pEl.offsetWidth - this.imgEl.offsetWidth) / 2;
      lens.style.left = margin + "px";
    }

    /* Calculate the ratio between result DIV and lens: */
    cx = pEl.offsetWidth / lens.offsetWidth;
    cy = pEl.offsetHeight / lens.offsetHeight;

    /* Set background properties for the result DIV */
    result.style.backgroundImage = "url('" + this.imgEl.src + "')";
    result.style.backgroundSize = (this.imgEl.width * cx) + "px " + (this.imgEl.height * cy) + "px";

    let getCursorPos = (e) => {
      var a, x = 0, y = 0;
      e = e || window.event;
      /* Get the x and y positions of the image: */

      a = this.imgEl.getBoundingClientRect();

      /* Calculate the cursor's x and y coordinates, relative to the image: */
      x = e.pageX - a.left;
      y = e.pageY - a.top;

      /* Consider any page scrolling: */
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return {x : x, y : y};
    }

    let moveLens = (e) => {
      var pos, x, y;
      /* show zoom element */
      result.classList.add('zooming');

      /* calculate margins */
      if (pEl.offsetWidth > this.imgEl.offsetWidth ){
        margin = (pEl.offsetWidth - this.imgEl.offsetWidth) / 2;
      } else margin = 0;

      /* Prevent any other actions that may occur when moving over the image */
      e.preventDefault();

      /* Get the cursor's x and y positions: */
      pos = getCursorPos(e);

      /* Calculate the position of the lens: */
      x = pos.x - (lens.offsetWidth / 2);
      y = pos.y - (lens.offsetHeight / 2);

      /* Prevent the lens from being positioned outside the image: */
      if (x > this.imgEl.width - lens.offsetWidth) {
        x = this.imgEl.width - lens.offsetWidth;
      }

      if (x < 0) { x = 0; }

      if (y > this.imgEl.height - lens.offsetHeight) {y = this.imgEl.height - lens.offsetHeight;}
      if (y < 0) { y = 0; }

      /* Set the position of the lens: */
      lens.style.left = (margin + x) + "px";
      lens.style.top = y + "px";

      /* Display what the lens "sees": */
      result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
    }

    /* Execute a function when someone moves the cursor over the image, or the lens: */
    lens.addEventListener("mousemove", moveLens);
    this.imgEl.addEventListener("mousemove", moveLens);

    lens.addEventListener("mouseleave", () => result.classList.remove('zooming'));
    this.imgEl.addEventListener("mouseleave", () => result.classList.remove('zooming'));

    /* And also for touch screens: */
    lens.addEventListener("touchmove", moveLens);
    this.imgEl.addEventListener("touchmove", moveLens);
    this.imgEl.addEventListener("touchend", () => result.classList.remove('zooming'));
  }

  // TODO slider gallery
  // only when not zoomable

  render() {
    return (
      <div class={`ins-gallery ${this.zoomable ? 'zoomable':''}`}>

        <div class="ins-gallery_current-image">
          <div class="spinner"></div>
          <div class="ins-gallery_lens"></div>

          <div class="ins-class_slider">
            <img src="" alt={this.imgAlt} title={this.imgTitle}
              onLoad={() => this.onLoadHandler()} />
          </div>

          <div class="ins-gallery_zoom"></div>
        </div>

        <div class="ins-gallery_thumbnails">
          <slot />
        </div>
      </div>
    );
  }
}
