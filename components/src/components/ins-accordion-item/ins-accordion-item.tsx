import { h, Component, Element, Prop, Method } from "@stencil/core";

@Component({ tag: 'ins-accordion-item' })
export class InsAccordionItem {
  @Element() insAccordionItemEl: HTMLElement;
  @Prop({ mutable: true }) heading: string = "Heading";
  @Prop({ mutable: true }) icon: string;
  @Prop({ mutable: true }) link: string;
  @Prop({ mutable: true }) linkTarget: string = "_blank";
  @Prop({ mutable: true }) active: boolean = false;
  @Prop({ mutable: true }) disabled: boolean = false;
  @Prop({ mutable: true }) arrowActivated: boolean = false;

  @Prop({ mutable: true }) openIcon: string = "icon-angle-down";
  @Prop({ mutable: true }) closeIcon: string = "icon-angle-up";

  wrapper: any; body: any;

  componentDidLoad(){
    this.wrapper = this.insAccordionItemEl.querySelector('.ins-accordion-item');
    this.body = this.insAccordionItemEl.querySelector('.ins-accordion-item_content');
    if (this.active) this.toggle();
  }

  renderHeading(){
    if (!this.heading) return ""
    return <span class="heading">{this.heading}</span>
  }

  renderHeadingLink(){
    if (!this.heading) return ""
    return (
      <a class="heading" target={this.linkTarget}
        href={this.link} title={this.heading}>

        {this.heading}
      </a>
    )
  }

  @Method()
  async udpateScrollHeight(height){
    let newHeight = this.body.scrollHeight + height;
    this.body.style.maxHeight = newHeight + "px";

    let parent = this.insAccordionItemEl.parentElement.closest('ins-accordion-item') as any;
    if (parent) parent.udpateScrollHeight(newHeight);
  }

  @Method()
  async toggle(){
    let height = this.body.scrollHeight;

    if (this.body.style.maxHeight) {
      this.wrapper.classList.remove("open");
      this.wrapper.classList.add("closed");
      this.body.style.maxHeight = null;
    } else {
      this.wrapper.classList.remove("closed");
      this.wrapper.classList.add("open");
      this.body.style.maxHeight = height + "px";
    }

    let parent = this.insAccordionItemEl.parentElement.closest('ins-accordion-item') as any;
    console.log('height', height)
    if (parent) parent.udpateScrollHeight(height || 0);
  }

  render() {
    return (
      <div class={`ins-accordion-item closed
        ${this.arrowActivated ? 'arrow-activated' : ''}`}>

        <div class={`ins-accordion-item_header ${this.disabled ? 'disabled':''}`}>

          <div class="inner-head" onClick={() => this.toggle()}>
            {this.icon ? <span class={`icon ${this.icon}`}></span> : "" }

            {this.link
              ? this.renderHeadingLink()
              : this.renderHeading() }

            <div class="ins-accordion-item_header_caret-wrap">
              <span class={`open-icon ${this.openIcon}`}></span>
              <span class={`close-icon ${this.closeIcon}`}></span>
            </div>
         </div>
        </div>

        <div class="ins-accordion-item_content will-show">
          <div class="inner-content">
            <slot />
          </div>
        </div>
      </div>
    )
  }
}
