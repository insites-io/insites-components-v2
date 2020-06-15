import { h, Component, Element, Prop, Method, Event, EventEmitter } from "@stencil/core";
import Accordion from "../../assets/accordion/src/accordion";

@Component({ tag: 'ins-accordion' })
export class InsAccordion {
  @Element() insAccordionEl: HTMLElement;
  @Event() toggle: EventEmitter;
  @Prop({ mutable: true }) defaultOpen: number = 0;
  @Prop({ mutable: true }) menu: boolean = false;

  accordion: any;
  componentDidLoad(){
    let nested = this.isNested();
    if (!nested) this.initAccordion();
  }

  componentDidUpdate(){
    let nested = this.isNested();
    if (!nested) this.initAccordion();
  }

  isNested(){
    return this.insAccordionEl.parentElement.closest('ins-accordion');
  }

  @Method()
  initAccordion(){
    let acc = this.insAccordionEl.querySelector('.ins-accordion');
    let accEls = this.insAccordionEl.querySelectorAll('.ins-accordion ins-accordion') as any;
    this.accordion = new Accordion(acc, {
      onToggle: this.toggleHandler.bind(this)
    });

    acc.classList.add('loaded')
    for (let i = 0; i < accEls.length; i++){
      accEls[i].initAccordion();
    }
  }

  toggleHandler(menu, open){
    let action = open ? 'open' : 'close';
    this.toggle.emit({ menu, action});
  }

  render() {
    return (
      <div class={`ins-accordion ${this.menu ? 'menu':''}`}>
        <slot />
      </div>
    );
  }
}
