import { h, Component, Prop } from "@stencil/core";

@Component({ tag: 'ins-styleguide' })
export class InsStyleguide {
  @Prop({ mutable: true }) label: string = '';

  render() {
    return (
      <div class="ins-styleguide-wrap">
        <div class="ins-styleguide-label-wrap">
          {this.label}
        </div>
        <div class="ins-styleguide-cont">
          <div class="ins-styleguide-actual-slot-wrap">
            <slot name="actual" />
          </div>
          <div class="ins-styleguide-code-slot-wrap">
            <slot name="code" />
          </div>
        </div>
      </div>
    )
  }
}
