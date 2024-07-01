import { r as registerInstance, a as createEvent, h, g as getElement } from './index-5ef45688.js';
import { c as commonjsGlobal, g as getDefaultExportFromCjs } from './_commonjsHelpers-bc8ff177.js';

var siema_min = {exports: {}};

(function (module, exports) {
!function(e,t){"object"=='object'&&"object"=='object'?module.exports=t():"function"==typeof undefined&&undefined.amd?undefined("Siema",[],t):"object"=='object'?exports.Siema=t():e.Siema=t();}("undefined"!=typeof self?self:commonjsGlobal,function(){return function(e){function t(r){if(i[r])return i[r].exports;var n=i[r]={i:r,l:!1,exports:{}};return e[r].call(n.exports,n,n.exports,t),n.l=!0,n.exports}var i={};return t.m=e,t.c=i,t.d=function(e,i,r){t.o(e,i)||Object.defineProperty(e,i,{configurable:!1,enumerable:!0,get:r});},t.n=function(e){var i=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(i,"a",i),i},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,i){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},s=function(){function e(e,t){for(var i=0;i<t.length;i++){var r=t[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r);}}return function(t,i,r){return i&&e(t.prototype,i),r&&e(t,r),t}}(),l=function(){function e(t){var i=this;if(r(this,e),this.config=e.mergeSettings(t),this.selector="string"==typeof this.config.selector?document.querySelector(this.config.selector):this.config.selector,null===this.selector)throw new Error("Something wrong with your selector 😭");this.resolveSlidesNumber(),this.selectorWidth=this.selector.offsetWidth,this.innerElements=[].slice.call(this.selector.children),this.currentSlide=this.config.loop?this.config.startIndex%this.innerElements.length:Math.max(0,Math.min(this.config.startIndex,this.innerElements.length-this.perPage)),this.transformProperty=e.webkitOrNot(),["resizeHandler","touchstartHandler","touchendHandler","touchmoveHandler","mousedownHandler","mouseupHandler","mouseleaveHandler","mousemoveHandler","clickHandler"].forEach(function(e){i[e]=i[e].bind(i);}),this.init();}return s(e,[{key:"attachEvents",value:function(){window.addEventListener("resize",this.resizeHandler),this.config.draggable&&(this.pointerDown=!1,this.drag={startX:0,endX:0,startY:0,letItGo:null,preventClick:!1},this.selector.addEventListener("touchstart",this.touchstartHandler),this.selector.addEventListener("touchend",this.touchendHandler),this.selector.addEventListener("touchmove",this.touchmoveHandler),this.selector.addEventListener("mousedown",this.mousedownHandler),this.selector.addEventListener("mouseup",this.mouseupHandler),this.selector.addEventListener("mouseleave",this.mouseleaveHandler),this.selector.addEventListener("mousemove",this.mousemoveHandler),this.selector.addEventListener("click",this.clickHandler));}},{key:"detachEvents",value:function(){window.removeEventListener("resize",this.resizeHandler),this.selector.removeEventListener("touchstart",this.touchstartHandler),this.selector.removeEventListener("touchend",this.touchendHandler),this.selector.removeEventListener("touchmove",this.touchmoveHandler),this.selector.removeEventListener("mousedown",this.mousedownHandler),this.selector.removeEventListener("mouseup",this.mouseupHandler),this.selector.removeEventListener("mouseleave",this.mouseleaveHandler),this.selector.removeEventListener("mousemove",this.mousemoveHandler),this.selector.removeEventListener("click",this.clickHandler);}},{key:"init",value:function(){this.attachEvents(),this.selector.style.overflow="hidden",this.selector.style.direction=this.config.rtl?"rtl":"ltr",this.buildSliderFrame(),this.config.onInit.call(this);}},{key:"buildSliderFrame",value:function(){var e=this.selectorWidth/this.perPage,t=this.config.loop?this.innerElements.length+2*this.perPage:this.innerElements.length;this.sliderFrame=document.createElement("div"),this.sliderFrame.style.width=e*t+"px",this.enableTransition(),this.config.draggable&&(this.selector.style.cursor="-webkit-grab");var i=document.createDocumentFragment();if(this.config.loop)for(var r=this.innerElements.length-this.perPage;r<this.innerElements.length;r++){var n=this.buildSliderFrameItem(this.innerElements[r].cloneNode(!0));i.appendChild(n);}for(var s=0;s<this.innerElements.length;s++){var l=this.buildSliderFrameItem(this.innerElements[s]);i.appendChild(l);}if(this.config.loop)for(var o=0;o<this.perPage;o++){var a=this.buildSliderFrameItem(this.innerElements[o].cloneNode(!0));i.appendChild(a);}this.sliderFrame.appendChild(i),this.selector.innerHTML="",this.selector.appendChild(this.sliderFrame),this.slideToCurrent();}},{key:"buildSliderFrameItem",value:function(e){var t=document.createElement("div");return t.style.cssFloat=this.config.rtl?"right":"left",t.style.float=this.config.rtl?"right":"left",t.style.width=(this.config.loop?100/(this.innerElements.length+2*this.perPage):100/this.innerElements.length)+"%",t.appendChild(e),t}},{key:"resolveSlidesNumber",value:function(){if("number"==typeof this.config.perPage)this.perPage=this.config.perPage;else if("object"===n(this.config.perPage)){this.perPage=1;for(var e in this.config.perPage)window.innerWidth>=e&&(this.perPage=this.config.perPage[e]);}}},{key:"prev",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t=arguments[1];if(!(this.innerElements.length<=this.perPage)){var i=this.currentSlide;if(this.config.loop){if(this.currentSlide-e<0){this.disableTransition();var r=this.currentSlide+this.innerElements.length,n=this.perPage,s=r+n,l=(this.config.rtl?1:-1)*s*(this.selectorWidth/this.perPage),o=this.config.draggable?this.drag.endX-this.drag.startX:0;this.sliderFrame.style[this.transformProperty]="translate3d("+(l+o)+"px, 0, 0)",this.currentSlide=r-e;}else this.currentSlide=this.currentSlide-e;}else this.currentSlide=Math.max(this.currentSlide-e,0);i!==this.currentSlide&&(this.slideToCurrent(this.config.loop),this.config.onChange.call(this),t&&t.call(this));}}},{key:"next",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t=arguments[1];if(!(this.innerElements.length<=this.perPage)){var i=this.currentSlide;if(this.config.loop){if(this.currentSlide+e>this.innerElements.length-this.perPage){this.disableTransition();var r=this.currentSlide-this.innerElements.length,n=this.perPage,s=r+n,l=(this.config.rtl?1:-1)*s*(this.selectorWidth/this.perPage),o=this.config.draggable?this.drag.endX-this.drag.startX:0;this.sliderFrame.style[this.transformProperty]="translate3d("+(l+o)+"px, 0, 0)",this.currentSlide=r+e;}else this.currentSlide=this.currentSlide+e;}else this.currentSlide=Math.min(this.currentSlide+e,this.innerElements.length-this.perPage);i!==this.currentSlide&&(this.slideToCurrent(this.config.loop),this.config.onChange.call(this),t&&t.call(this));}}},{key:"disableTransition",value:function(){this.sliderFrame.style.webkitTransition="all 0ms "+this.config.easing,this.sliderFrame.style.transition="all 0ms "+this.config.easing;}},{key:"enableTransition",value:function(){this.sliderFrame.style.webkitTransition="all "+this.config.duration+"ms "+this.config.easing,this.sliderFrame.style.transition="all "+this.config.duration+"ms "+this.config.easing;}},{key:"goTo",value:function(e,t){if(!(this.innerElements.length<=this.perPage)){var i=this.currentSlide;this.currentSlide=this.config.loop?e%this.innerElements.length:Math.min(Math.max(e,0),this.innerElements.length-this.perPage),i!==this.currentSlide&&(this.slideToCurrent(),this.config.onChange.call(this),t&&t.call(this));}}},{key:"slideToCurrent",value:function(e){var t=this,i=this.config.loop?this.currentSlide+this.perPage:this.currentSlide,r=(this.config.rtl?1:-1)*i*(this.selectorWidth/this.perPage);e?requestAnimationFrame(function(){requestAnimationFrame(function(){t.enableTransition(),t.sliderFrame.style[t.transformProperty]="translate3d("+r+"px, 0, 0)";});}):this.sliderFrame.style[this.transformProperty]="translate3d("+r+"px, 0, 0)";}},{key:"updateAfterDrag",value:function(){var e=(this.config.rtl?-1:1)*(this.drag.endX-this.drag.startX),t=Math.abs(e),i=this.config.multipleDrag?Math.ceil(t/(this.selectorWidth/this.perPage)):1,r=e>0&&this.currentSlide-i<0,n=e<0&&this.currentSlide+i>this.innerElements.length-this.perPage;e>0&&t>this.config.threshold&&this.innerElements.length>this.perPage?this.prev(i):e<0&&t>this.config.threshold&&this.innerElements.length>this.perPage&&this.next(i),this.slideToCurrent(r||n);}},{key:"resizeHandler",value:function(){this.resolveSlidesNumber(),this.currentSlide+this.perPage>this.innerElements.length&&(this.currentSlide=this.innerElements.length<=this.perPage?0:this.innerElements.length-this.perPage),this.selectorWidth=this.selector.offsetWidth,this.buildSliderFrame();}},{key:"clearDrag",value:function(){this.drag={startX:0,endX:0,startY:0,letItGo:null,preventClick:this.drag.preventClick};}},{key:"touchstartHandler",value:function(e){-1!==["TEXTAREA","OPTION","INPUT","SELECT"].indexOf(e.target.nodeName)||(e.stopPropagation(),this.pointerDown=!0,this.drag.startX=e.touches[0].pageX,this.drag.startY=e.touches[0].pageY);}},{key:"touchendHandler",value:function(e){e.stopPropagation(),this.pointerDown=!1,this.enableTransition(),this.drag.endX&&this.updateAfterDrag(),this.clearDrag();}},{key:"touchmoveHandler",value:function(e){if(e.stopPropagation(),null===this.drag.letItGo&&(this.drag.letItGo=Math.abs(this.drag.startY-e.touches[0].pageY)<Math.abs(this.drag.startX-e.touches[0].pageX)),this.pointerDown&&this.drag.letItGo){e.preventDefault(),this.drag.endX=e.touches[0].pageX,this.sliderFrame.style.webkitTransition="all 0ms "+this.config.easing,this.sliderFrame.style.transition="all 0ms "+this.config.easing;var t=this.config.loop?this.currentSlide+this.perPage:this.currentSlide,i=t*(this.selectorWidth/this.perPage),r=this.drag.endX-this.drag.startX,n=this.config.rtl?i+r:i-r;this.sliderFrame.style[this.transformProperty]="translate3d("+(this.config.rtl?1:-1)*n+"px, 0, 0)";}}},{key:"mousedownHandler",value:function(e){-1!==["TEXTAREA","OPTION","INPUT","SELECT"].indexOf(e.target.nodeName)||(e.preventDefault(),e.stopPropagation(),this.pointerDown=!0,this.drag.startX=e.pageX);}},{key:"mouseupHandler",value:function(e){e.stopPropagation(),this.pointerDown=!1,this.selector.style.cursor="-webkit-grab",this.enableTransition(),this.drag.endX&&this.updateAfterDrag(),this.clearDrag();}},{key:"mousemoveHandler",value:function(e){if(e.preventDefault(),this.pointerDown){"A"===e.target.nodeName&&(this.drag.preventClick=!0),this.drag.endX=e.pageX,this.selector.style.cursor="-webkit-grabbing",this.sliderFrame.style.webkitTransition="all 0ms "+this.config.easing,this.sliderFrame.style.transition="all 0ms "+this.config.easing;var t=this.config.loop?this.currentSlide+this.perPage:this.currentSlide,i=t*(this.selectorWidth/this.perPage),r=this.drag.endX-this.drag.startX,n=this.config.rtl?i+r:i-r;this.sliderFrame.style[this.transformProperty]="translate3d("+(this.config.rtl?1:-1)*n+"px, 0, 0)";}}},{key:"mouseleaveHandler",value:function(e){this.pointerDown&&(this.pointerDown=!1,this.selector.style.cursor="-webkit-grab",this.drag.endX=e.pageX,this.drag.preventClick=!1,this.enableTransition(),this.updateAfterDrag(),this.clearDrag());}},{key:"clickHandler",value:function(e){this.drag.preventClick&&e.preventDefault(),this.drag.preventClick=!1;}},{key:"remove",value:function(e,t){if(e<0||e>=this.innerElements.length)throw new Error("Item to remove doesn't exist 😭");var i=e<this.currentSlide,r=this.currentSlide+this.perPage-1===e;(i||r)&&this.currentSlide--,this.innerElements.splice(e,1),this.buildSliderFrame(),t&&t.call(this);}},{key:"insert",value:function(e,t,i){if(t<0||t>this.innerElements.length+1)throw new Error("Unable to inset it at this index 😭");if(-1!==this.innerElements.indexOf(e))throw new Error("The same item in a carousel? Really? Nope 😭");var r=t<=this.currentSlide>0&&this.innerElements.length;this.currentSlide=r?this.currentSlide+1:this.currentSlide,this.innerElements.splice(t,0,e),this.buildSliderFrame(),i&&i.call(this);}},{key:"prepend",value:function(e,t){this.insert(e,0),t&&t.call(this);}},{key:"append",value:function(e,t){this.insert(e,this.innerElements.length+1),t&&t.call(this);}},{key:"destroy",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments[1];if(this.detachEvents(),this.selector.style.cursor="auto",e){for(var i=document.createDocumentFragment(),r=0;r<this.innerElements.length;r++)i.appendChild(this.innerElements[r]);this.selector.innerHTML="",this.selector.appendChild(i),this.selector.removeAttribute("style");}t&&t.call(this);}}],[{key:"mergeSettings",value:function(e){var t={selector:".siema",duration:200,easing:"ease-out",perPage:1,startIndex:0,draggable:!0,multipleDrag:!0,threshold:20,loop:!1,rtl:!1,onInit:function(){},onChange:function(){}},i=e;for(var r in i)t[r]=i[r];return t}},{key:"webkitOrNot",value:function(){return "string"==typeof document.documentElement.style.transform?"transform":"WebkitTransform"}}]),e}();t.default=l,e.exports=t.default;}])});
}(siema_min, siema_min.exports));

const Siema = /*@__PURE__*/getDefaultExportFromCjs(siema_min.exports);

const InsGallery = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.didLoad = createEvent(this, "didLoad", 7);
        this.imgAlt = undefined;
        this.imgTitle = undefined;
        this.zoomable = undefined;
        this.slidable = undefined;
        this.withIndicator = undefined;
        this.thumbnailLayout = "inline";
    }
    insUpdateSrcHandler(e) {
        let i = this.thumbs.indexOf(e.target);
        let img = e.detail.image;
        if (this.slidable && !this.zoomable) {
            this.updateSlide(i, img);
        }
        else
            this.updateSrc(img, i);
    }
    updateSrc(img, i) {
        if (i !== undefined)
            this.setProgress(i);
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
        this.el.classList.add('is-loading');
    }
    setDefaultImg() {
        let selector = '.ins-gallery_current-image img';
        this.imgEl = this.el.querySelector(selector);
        this.thumbs[0].activate();
        this.updateSrc(this.thumbs[0].image);
    }
    setProgress(i) {
        this.progress.innerHTML = `${i + 1} / ${this.thumbs.length}`;
    }
    componentDidLoad() {
        if (this.slidable && !this.zoomable)
            this.initSlider();
        if (this.thumbnailLayout === "slider" || this.slidable)
            this.initSliderThumbs();
        this.progress = this.el.querySelector('.ins-gallery_progress');
        this.setProgress(0);
        this.setDefaultImg();
        this.didLoad.emit();
    }
    onSlideHandler() {
        let i = this.slider.currentSlide;
        this.thumbs[i].activate();
        this.sliderThumbs.goTo(i);
        this.updateSlideImg(i, this.thumbs[i].image);
        this.setProgress(i);
    }
    initSlider() {
        let sliderEl = this.el.querySelector('.ins-gallery_slider');
        this.slides = this.el.querySelectorAll('.ins-gallery_slide img');
        this.slider = new Siema({
            selector: sliderEl,
            onChange: () => this.onSlideHandler()
        });
    }
    initSliderThumbs() {
        let thumbnails = this.el.querySelector(`.ins-gallery_thumbnails`);
        let perPage = this.calculateThumbnailsPerPage(thumbnails);
        this.sliderThumbs = new Siema({
            selector: thumbnails,
            perPage
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
            1200: this.calculateViewport(1200, viewport, wrapperWidth, thumbnailWidth),
            900: this.calculateViewport(900, viewport, wrapperWidth, thumbnailWidth),
            700: this.calculateViewport(700, viewport, wrapperWidth, thumbnailWidth),
            400: this.calculateViewport(400, viewport, wrapperWidth, thumbnailWidth),
            300: this.calculateViewport(300, viewport, wrapperWidth, thumbnailWidth)
        };
        return this.viewports;
    }
    onLoadHandler() {
        this.el.classList.remove('is-loading');
        if (this.zoomable)
            this.imageZoom();
    }
    imageZoom() {
        let lens, result, cx, cy, pEl, margin = 0;
        result = this.el.querySelector('.ins-gallery_current-image .ins-gallery_zoom');
        lens = this.el.querySelector('.ins-gallery_current-image .ins-gallery_lens');
        pEl = this.imgEl.parentElement;
        /* Calculate margins */
        if (pEl.offsetWidth > this.imgEl.offsetWidth) {
            margin = (pEl.offsetWidth - this.imgEl.offsetWidth) / 2;
            lens.style.left = margin + "px";
        }
        /* Update lens width and height to be 25% of pEL (4x zoom) */
        lens.style.width = this.imgEl.offsetWidth * .25 + 'px';
        lens.style.height = this.imgEl.offsetHeight * .25 + 'px';
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
            return { x: x, y: y };
        };
        let moveLens = (e) => {
            var pos, x, y;
            /* show zoom element */
            result.classList.add('zooming');
            /* calculate margins */
            if (pEl.offsetWidth > this.imgEl.offsetWidth) {
                margin = (pEl.offsetWidth - this.imgEl.offsetWidth) / 2;
            }
            else
                margin = 0;
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
            lens.style.left = (margin + x) + "px";
            lens.style.top = y + "px";
            /* Display what the lens "sees": */
            result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
        };
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
    generateSliders() {
        return (h("div", { class: "ins-gallery_slide" }, h("img", { src: "", alt: this.imgAlt, title: this.imgTitle, onLoad: () => this.onLoadHandler() })));
    }
    generateImage() {
        let nodes = this.el.querySelectorAll('ins-gallery-image');
        this.thumbs = Array.from(nodes);
        if (this.slidable && !this.zoomable) {
            return (h("div", { class: "ins-gallery_slider" }, this.thumbs.map(() => this.generateSliders())));
        }
        return (h("img", { src: "", alt: this.imgAlt, title: this.imgTitle, onLoad: () => this.onLoadHandler() }));
    }
    prevSlideThumb() {
        this.sliderThumbs.prev();
    }
    nextSlideThumb() {
        this.sliderThumbs.next();
    }
    generateThumbs() {
        if (this.thumbnailLayout === "slider") {
            return (h("div", { class: "ins-gallery_thumb-slider" }, h("div", { class: "ins-gallery_thumbnails" }, h("slot", null)), h("div", { class: "ins-gallery_thumb-slider-prev", onClick: () => this.prevSlideThumb() }, h("div", { class: "ins-gallery_prev-arrow" })), h("div", { class: "ins-gallery_thumb-slider-next", onClick: () => this.nextSlideThumb() }, h("div", { class: "ins-gallery_next-arrow" }))));
        }
        return (h("div", { class: "ins-gallery_thumbnails" }, h("slot", null)));
    }
    render() {
        return (h("div", { key: '673f751c3777113ea01b4a1d67513ef0f67bb490', class: `ins-gallery
        ${this.zoomable ? 'zoomable' : ''}
        ${this.withIndicator ? 'with-indicator' : ''}` }, h("div", { key: '3c8dff952920b3d73ef399d8c9182b91ae28b21b', class: "ins-gallery_current-image" }, h("div", { key: '56d0a21222c6119320c81bcc231393df68e17c71', class: "spinner" }), h("div", { key: '07c29d2c4a84281e920754613a1f8bc297db028e', class: "ins-gallery_progress" }), h("div", { key: '28fd466139158192e0011dbeef91f4dbba5989a9', class: "ins-gallery_lens" }), this.generateImage(), h("div", { key: 'f23e06d61f22022c6f09000284a9197bfb58e93c', class: "ins-gallery_zoom" })), this.generateThumbs()));
    }
    get el() { return getElement(this); }
};

export { InsGallery as ins_gallery };

//# sourceMappingURL=ins-gallery.entry.js.map