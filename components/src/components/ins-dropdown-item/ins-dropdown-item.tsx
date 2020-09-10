import { h, Component, Prop } from "@stencil/core";

@Component({ tag: 'ins-dropdown-item' })
export class InsDropdown {
  @Prop({mutable: true}) label: string = "";
  @Prop({mutable: true}) link: string = "";
  @Prop({mutable: true}) target: string = "_self";
  @Prop({mutable: true}) linkTitle: string = "";
  @Prop({mutable: true}) submenu: boolean = false;

  renderSubmenu(){
    return (
      <div class="ins-dropdown-item submenu">
        <div class="ins-dropdown-item_label">
          { this.label }
          <i class="icon-angle-right"></i>
        </div>

        <div class="ins-dropdown-item_submenu">
          <div class="ins-dropdown-item_submenu-card">
            <slot />
          </div>
        </div>
      </div>
    )
  }

  render() {
    if (!this.label) return ""
    if (this.submenu) return this.renderSubmenu();

    return (
      <a class={`ins-dropdown-item`} href={this.link}
        target={this.target} title={this.linkTitle}>

        { this.label }
      </a>
    );
  }
}
