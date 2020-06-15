import { h, Component, Prop, Element } from "@stencil/core";

@Component({ tag: 'ins-accordion-link' })
export class InsAccordionLink {
  @Element() insAccLinkEl: HTMLElement;

  @Prop({ mutable: true }) link: string = "";
  @Prop({ mutable: true }) linkTitle: string = "";
  @Prop({ mutable: true }) linkTarget: string = "_blank";
  @Prop({ mutable: true }) label: string = "";
  @Prop({ mutable: true }) icon: string = "";
  @Prop({ mutable: true }) active: boolean = false;
  @Prop({ mutable: true }) disabled: boolean = false;

  componentDidLoad(){
    this.checkSiblings();
  }

  componentDidUpdate(){
    this.checkSiblings();
  }

  checkSiblings(){
    let wrap = this.insAccLinkEl.querySelector('.ins-accordion-link');
    if (this.insAccLinkEl.nextElementSibling){
      let next = this.insAccLinkEl.nextElementSibling;
      if (next.nodeName === "INS-ACCORDION" && next.hasAttribute('menu')){
        wrap.classList.add('before')
      }
    }

    if (this.insAccLinkEl.previousElementSibling){
      let prev = this.insAccLinkEl.previousElementSibling;
      if (prev.nodeName === "INS-ACCORDION" && prev.hasAttribute('menu')){
        wrap.classList.add('after')
      }
    }
  }

  render() {
    return (
      <div class={`ins-accordion-link
        ${this.active ? 'active': ''}
        ${this.disabled ? 'disabled': ''}`}>

        <a class="ins-accordion-link_link" href={this.link}
          target={this.linkTarget} title={this.linkTitle}>

          <span class={`ins-accordion-link_icon ${this.icon}`}></span>
          <span>{this.label}</span>
        </a>
      </div>
    );
  }
}
