import {
  h,
  Component,
  Listen,
  Element,
  Prop,
  Event,
  Method,
  EventEmitter,
} from "@stencil/core";
import Siema from "siema";

@Component({ tag: "ins-gallery" })
export class InsGallery {
  @Element() el: HTMLElement;
  @Event() didLoad: EventEmitter;
  @Event() insChange: EventEmitter;
  @Prop({ mutable: true }) imgAlt: string;
  @Prop({ mutable: true }) imgTitle: string;
  @Prop({ mutable: true }) zoomable: boolean;
  @Prop({ mutable: true }) slidable: boolean;
  @Prop({ mutable: true }) withIndicator: boolean;
  @Prop({ mutable: true }) thumbnailLayout: string = "inline";
  @Prop({ mutable: true }) load: boolean = false;
  @Prop({ mutable: true }) checkLoad: boolean = false;

  imgEl;
  thumbs;
  sliderThumbs;
  slider;
  slides;
  progress;
  viewports;
  hasLoad = false;

  @Listen("insGalleryUpdate")
  insUpdateSrcHandler(e) {
    let i = this.thumbs.indexOf(e.target);
    let img = e.detail.image;
    if (this.slidable && !this.zoomable) {
      this.updateSlide(i, img);
    } else this.updateSrc(img, i);
  }

  updateSrc(img, i?) {
    if (i !== undefined) this.setProgress(i);
    this.loading();
    this.imgEl.src = img;
  }

  updateSlide(i, img) {
    this.updateSlideImg(i, img);
    this.setProgress(i);
    this.slider.goTo(i);
  }

  updateSlideImg(i, img) {
    if (this.slides[i].src !== img) {
      this.loading();
      this.slides[i].src = img;
    }
  }

  loading() {
    this.el.classList.add("is-loading");
  }

  setDefaultImg() {
    let selector = ".ins-gallery_current-image img";
    this.imgEl = this.el.querySelector(selector);
    this.thumbs[0].activate();
    this.updateSrc(this.thumbs[0].image);
  }

  setProgress(i) {
    if (this.hasLoad) {
      this.insChange.emit({
        index: i,
        src: this.thumbs[i].image,
        target: this.thumbs[i],
      });
    }

    this.progress.innerHTML = `${i + 1} / ${this.thumbs.length}`;
  }

  componentDidLoad() {
    if (this.slidable && !this.zoomable) {
      this.initSlider();
    }
    if (this.thumbnailLayout === "slider" || this.slidable) {
      this.initSliderThumbs();
    }
    this.progress = this.el.querySelector(".ins-gallery_progress");
    this.setProgress(0);
    this.setDefaultImg();
    if (this.checkLoad) this.load = true;
    this.didLoad.emit();
    this.hasLoad = true;
  }

  onSlideHandler() {
    let i = this.slider.currentSlide;
    this.thumbs[i].activate();
    this.sliderThumbs.goTo(i);
    this.updateSlideImg(i, this.thumbs[i].image);
    this.setProgress(i);
  }

  initSlider() {
    let sliderEl = this.el.querySelector(".ins-gallery_slider");
    this.slides = this.el.querySelectorAll(".ins-gallery_slide img");
    this.slider = new Siema({
      selector: sliderEl,
      onChange: () => this.onSlideHandler(),
    });
  }

  initSliderThumbs() {
    let thumbnails = this.el.querySelector(`.ins-gallery_thumbnails`);
    let perPage = this.calculateThumbnailsPerPage(thumbnails);
    this.sliderThumbs = new Siema({
      selector: thumbnails,
      perPage,
    });
  }

  calculateViewport(viewport, current, wrapper, thumbnail) {
    return Math.floor(((viewport / current) * wrapper) / thumbnail);
    // return i > this.thumbs.length ? this.thumbs.length : i;
  }

  calculateThumbnailsPerPage(wrapper) {
    const docWidth = document.documentElement.clientWidth || 0;
    const windowWidth = window.innerWidth || 0;
    const viewport = Math.max(docWidth, windowWidth);
    const wrapperWidth = wrapper.offsetWidth - 60;
    const thumbnailWidth = this.thumbs[0].offsetWidth;
    // const deFault = Math.floor(wrapperWidth / thumbnailWidth);

    this.viewports = {
      1200: this.calculateViewport(
        1200,
        viewport,
        wrapperWidth,
        thumbnailWidth
      ),
      900: this.calculateViewport(900, viewport, wrapperWidth, thumbnailWidth),
      700: this.calculateViewport(700, viewport, wrapperWidth, thumbnailWidth),
      400: this.calculateViewport(400, viewport, wrapperWidth, thumbnailWidth),
      300: this.calculateViewport(300, viewport, wrapperWidth, thumbnailWidth),
    };

    return this.viewports;
  }

  onLoadHandler() {
    this.el.classList.remove("is-loading");
    if (this.zoomable) this.imageZoom();
  }

  imageZoom() {
    let lens,
      result,
      cx,
      cy,
      pEl,
      margin = 0;
    result = this.el.querySelector(
      ".ins-gallery_current-image .ins-gallery_zoom"
    );
    lens = this.el.querySelector(
      ".ins-gallery_current-image .ins-gallery_lens"
    );
    pEl = this.imgEl.parentElement;

    /* Calculate margins */
    if (pEl.offsetWidth > this.imgEl.offsetWidth) {
      margin = (pEl.offsetWidth - this.imgEl.offsetWidth) / 2;
      lens.style.left = margin + "px";
    }

    /* Update lens width and height to be 25% of pEL (4x zoom) */
    lens.style.width = this.imgEl.offsetWidth * 0.25 + "px";
    lens.style.height = this.imgEl.offsetHeight * 0.25 + "px";

    /* Calculate the ratio between result DIV and lens: */
    cx = pEl.offsetWidth / lens.offsetWidth;
    cy = pEl.offsetHeight / lens.offsetHeight;

    /* Set background properties for the result DIV */
    result.style.backgroundImage = "url('" + this.imgEl.src + "')";
    result.style.backgroundSize =
      this.imgEl.width * cx + "px " + this.imgEl.height * cy + "px";

    let getCursorPos = (e) => {
      var a,
        x = 0,
        y = 0;
      e = e || window.event;
      /* Get the x and y positions of the image: */

      a = this.imgEl.getBoundingClientRect();

      /* Calculate the cursor's x and y coordinates, relative to the image: */
      x = e.pageX - a.left;
      y = e.pageY - a.top;

      /* Consider any page scrolling: */
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return { x: x, y: y };
    };

    let moveLens = (e) => {
      var pos, x, y;
      /* show zoom element */
      result.classList.add("zooming");

      /* calculate margins */
      if (pEl.offsetWidth > this.imgEl.offsetWidth) {
        margin = (pEl.offsetWidth - this.imgEl.offsetWidth) / 2;
      } else margin = 0;

      /* Prevent any other actions that may occur when moving over the image */
      e.preventDefault();

      /* Get the cursor's x and y positions: */
      pos = getCursorPos(e);

      /* Calculate the position of the lens: */
      x = pos.x - lens.offsetWidth / 2;
      y = pos.y - lens.offsetHeight / 2;

      /* Prevent the lens from being positioned outside the image: */
      if (x > this.imgEl.width - lens.offsetWidth) {
        x = this.imgEl.width - lens.offsetWidth;
      }

      if (x < 0) {
        x = 0;
      }

      if (y > this.imgEl.height - lens.offsetHeight) {
        y = this.imgEl.height - lens.offsetHeight;
      }
      if (y < 0) {
        y = 0;
      }

      /* Set the position of the lens: */
      lens.style.left = margin + x + "px";
      lens.style.top = y + "px";

      /* Display what the lens "sees": */
      result.style.backgroundPosition = "-" + x * cx + "px -" + y * cy + "px";
    };

    /* Execute a function when someone moves the cursor over the image, or the lens: */
    lens.addEventListener("mousemove", moveLens);
    this.imgEl.addEventListener("mousemove", moveLens);

    lens.addEventListener("mouseleave", () =>
      result.classList.remove("zooming")
    );
    this.imgEl.addEventListener("mouseleave", () =>
      result.classList.remove("zooming")
    );

    /* And also for touch screens: */
    lens.addEventListener("touchmove", moveLens);
    this.imgEl.addEventListener("touchmove", moveLens);
    this.imgEl.addEventListener("touchend", () =>
      result.classList.remove("zooming")
    );
  }

  generateSliders() {
    return (
      <div class="ins-gallery_slide">
        <img
          src=""
          alt={this.imgAlt}
          title={this.imgTitle}
          onLoad={() => this.onLoadHandler()}
        />
      </div>
    );
  }

  generateImage() {
    let nodes = this.el.querySelectorAll("ins-gallery-image");
    this.thumbs = Array.from(nodes);

    if (this.slidable && !this.zoomable) {
      return (
        <div class="ins-gallery_slider">
          {this.thumbs.map(() => this.generateSliders())}
        </div>
      );
    }

    return (
      <img
        src=""
        alt={this.imgAlt}
        title={this.imgTitle}
        onLoad={() => this.onLoadHandler()}
      />
    );
  }

  prevSlideThumb() {
    this.slider.prev();
  }

  nextSlideThumb() {
    this.slider.next();
  }

  generateThumbs() {
    if (this.thumbnailLayout === "slider") {
      return (
        <div class="ins-gallery_thumb-slider">
          <div class="ins-gallery_thumbnails">
            <slot />
          </div>

          <div
            class="ins-gallery_thumb-slider-prev"
            onClick={() => this.prevSlideThumb()}
          >
            <div class="ins-gallery_prev-arrow"></div>
          </div>

          <div
            class="ins-gallery_thumb-slider-next"
            onClick={() => this.nextSlideThumb()}
          >
            <div class="ins-gallery_next-arrow"></div>
          </div>
        </div>
      );
    }

    return (
      <div class="ins-gallery_thumbnails">
        <slot />
      </div>
    );
  }

  @Method()
  async activate(index) {
    this.thumbs[index]?.querySelector(".ins-gallery-image")?.click();
  }

  render() {
    return (
      <div
        class={`ins-gallery
        ${this.zoomable ? "zoomable" : ""}
        ${this.withIndicator ? "with-indicator" : ""}`}
      >
        <div class="ins-gallery_current-image">
          <div class="spinner"></div>
          <div class="ins-gallery_progress"></div>
          <div class="ins-gallery_lens"></div>
          {this.generateImage()}
          <div class="ins-gallery_zoom"></div>
        </div>

        {this.generateThumbs()}
      </div>
    );
  }
}
