import { h, Component } from "@stencil/core";

@Component({ tag: 'ins-page' })
export class InsPage {
  render() {
    return (<div class="ins-page-wrap"><slot /></div>);
  }
}
