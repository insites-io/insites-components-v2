import { h, Component, Prop } from "@stencil/core";

@Component({ tag: 'ins-backdrop' })
export class InsBackdrop {
  @Prop({mutable: true}) light: boolean = false;
  render() {
    return (<div class={`ins-backdrop-wrap ${this.light ? 'light':''}`}></div>);
  }
}
