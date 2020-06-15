import { h, Component, Prop } from "@stencil/core";

@Component({ tag: "ins-title" })
export class insTitle {
  @Prop() label: string;
  @Prop() class: string;

  render() {
    return (
      <div class="ins-title-wrapper">
        <h1 class={`title-${this.class}`}>{this.label}</h1>
      </div>
    );
  }
}
