import { h, Component, Prop, Event, EventEmitter, Element, Method } from "@stencil/core";

@Component({
  tag: 'ins-gallery-thumbnail'
})
export class InsGalleryThumbnail {
  @Element() el: HTMLElement;
  @Event() insUpdateSrc: EventEmitter;

  @Prop({ mutable: true }) source: string;
  @Prop({ mutable: true }) actual: string;
  @Prop({ mutable: true }) imgAlt: string;
  @Prop({ mutable: true }) imgTitle: string;
  @Prop({ mutable: true }) default: boolean;

  clickHandler(){
    this.activate();
    this.insUpdateSrc.emit({
      source: this.source,
      actual: this.actual
    });
  }

  @Method()
  async activate(){
    let parent = this.el.closest('ins-gallery');
    let thumbs = parent.querySelectorAll('ins-gallery-thumbnail');
    for (let i = 0; i < thumbs.length; i++){
      await thumbs[i].deactivate();
    }
    this.el.classList.add('active');
    return true;
  }

  @Method()
  async deactivate(){
    this.el.classList.remove('active');
    return true;
  }

  componentDidLoad(){
    if (this.default) this.clickHandler();
  }

  render() {
    return (
      <div class="ins-gallery-thumbnail" onClick={() => { this.clickHandler() }}>
        <img src={this.source} alt={this.imgAlt} title={this.imgTitle} />
      </div>
    );
  }
}
