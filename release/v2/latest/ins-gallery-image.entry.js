import { r as registerInstance, a as createEvent, h, g as getElement } from './index-5ef45688.js';

const InsGalleryThumbnail = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.insGalleryUpdate = createEvent(this, "insGalleryUpdate", 7);
        this.thumbnail = undefined;
        this.image = undefined;
        this.imgAlt = undefined;
        this.imgTitle = undefined;
    }
    // @Prop({ mutable: true }) default: boolean;
    // TODO:
    // Shape: square, circle
    // empty source handler will render a bullet like UI
    clickHandler() {
        this.activate();
        this.insGalleryUpdate.emit({
            thumbnail: this.thumbnail,
            image: this.image
        });
    }
    async activate() {
        let parent = this.el.closest('ins-gallery');
        let thumbs = parent.querySelectorAll('ins-gallery-image');
        for (let i = 0; i < thumbs.length; i++) {
            await thumbs[i].deactivate();
        }
        this.el.classList.add('active');
        return true;
    }
    async deactivate() {
        this.el.classList.remove('active');
        return true;
    }
    // componentDidLoad(){
    //   if (this.default) this.clickHandler();
    // }
    render() {
        return (h("div", { key: '135aa676db307f7cabb1ac4668678b49ff42fbf3', class: "ins-gallery-image", onClick: () => { this.clickHandler(); } }, h("img", { key: '5bf56d94bf8863f9c7030ac7cce190d8992651c3', src: this.thumbnail, alt: this.imgAlt, title: this.imgTitle })));
    }
    get el() { return getElement(this); }
};

export { InsGalleryThumbnail as ins_gallery_image };

//# sourceMappingURL=ins-gallery-image.entry.js.map