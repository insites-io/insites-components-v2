import { h, Component, Prop, Element } from "@stencil/core";
import tippy from 'tippy.js';

@Component({
  tag: 'ins-input-tooltip',
  styleUrl: './ins-input-tooltip.scss'
})
export class InsBackdrop {
  @Element() el: HTMLElement;
  @Prop({mutable: true}) content: string = "";

  componentDidLoad(){
    let tooltipEl = this.el.querySelector('.ins-input-tooltip') as HTMLElement;
    tippy(tooltipEl, {
      content: this.content,
      allowHTML: true,
      hideOnClick: true,
      trigger: 'click',
      interactive: true
    });
  }

  render() {
    return (<span class={`ins-input-tooltip`}>?</span>);
  }
}
