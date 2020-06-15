import { h, Component, Element, Prop } from "@stencil/core";

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

  render() {
    return (
      <div class={`ins-accordion-item
        ${this.active ? 'open':''}
        ${this.arrowActivated ? 'arrow-activated' : ''}`}>
        <div class={`ins-accordion-item_header ${this.disabled ? 'disabled':''}`}>

          <div class="inner-head">
            {this.icon ? <span class={`icon ${this.icon}`}></span> : "" }

            {this.link
              ? this.renderHeadingLink()
              : this.renderHeading() }

            <div class="ins-accordion-item_header_caret-wrap">
              <span class="icon-angle-down"></span>
              <span class="icon-angle-up"></span>
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
