import { h, Component, Prop } from "@stencil/core";

@Component({ tag: 'ins-dropdown' })
export class InsDropdown {
  @Prop({mutable: true}) label: string = "Dropdown";
  @Prop({mutable: true}) lined: boolean = false;

  render() {
    return (
      <div class={`ins-dropdown ${this.lined ? "lined":""}`}>
        <div class="ins-dropdown_label">
          { this.label }

          <i class="icon-angle-down"></i>
        </div>

        <div class="ins-dropdown_menu">
          <div class="ins-dropdown_menu-card">
            <slot />
          </div>
        </div>
      </div>
    );
  }
}
