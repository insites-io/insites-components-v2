import { h, Component } from "@stencil/core";

@Component({ tag: 'ins-accordion-item-heading' })

export class InsAccordionItemHeading {
  render() {
    return <div><slot /></div>
  }
}
