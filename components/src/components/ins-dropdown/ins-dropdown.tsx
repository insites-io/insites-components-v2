import { h, Component, Prop } from "@stencil/core";

@Component({ tag: 'ins-dropdown' })
export class InsDropdown {
  @Prop({mutable: true}) label: string = "Dropdown";
  @Prop({mutable: true}) lined: boolean = false;

  @Prop({mutable: true}) link: string = "";
  @Prop({mutable: true}) target: string = "_self";
  @Prop({mutable: true}) linkTitle: string = "";

  render() {
    return (
      <div class={`ins-dropdown ${this.lined ? "lined":""}`}>
        <div class="ins-dropdown_label">
          { this.link
            ? <a href={ this.link } target={this.target} title={this.linkTitle}>
                { this.label }
              </a>
            : <span>{ this.label }</span>
          }

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
