import { h, Component, Prop } from "@stencil/core";

@Component({ tag: 'ins-card' })
export class InsCard {
  @Prop({mutable:true}) steady: boolean;
  @Prop({mutable:true}) noPadding: boolean;
  @Prop({mutable:true}) outlined: boolean;

  render() {
    return (
      <div class={`ins-card-wrap
        ${this.steady ? 'steady' : ''}
        ${this.outlined ? 'outlined' : ''}
        ${this.noPadding ? 'no-padding' : ''}`}>
        <slot />
      </div>
    )
  }
}
