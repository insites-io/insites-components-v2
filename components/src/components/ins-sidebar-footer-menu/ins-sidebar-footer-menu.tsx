import { h, Component, Prop, State, Method } from "@stencil/core";

@Component({ tag: 'ins-sidebar-footer-menu' })
export class InsSidebarFooterMenu {

  @Prop({mutable:true}) icon: string = 'icon-settings-1';
  @Prop({mutable:true}) label: string = 'Settings';
  @State() menuToggled: boolean = false;

  @Method()
  async toggleMenu(){
    this.menuToggled = !this.menuToggled;
  }

  @Method()
  async hideMenu(){
    this.menuToggled = false;
  }

  @Method()
  async showMenu(){
    this.menuToggled = true;
  }

  mouseLeaveHandler(){
    let insAdminEl = document.querySelector('ins-admin');
    if (insAdminEl.className.includes('mini')){
      this.hideMenu();
    }
  }

  render() {
    if (this.icon) {
      return (
        <div class="ins-sidebar-footer-item-wrap">
          <button class="ins-sfiw-button" onClick={() => this.toggleMenu()}>
            { this.icon ?
            <i class={`ins-sfiw-button-icon ${this.icon}`}></i> : ''}
          </button>
          <div class={`menu-item-wrap ${this.menuToggled ? 'visible' : ''} `}
            onMouseLeave={() => this.mouseLeaveHandler()}>
            <button class="ins-sfiw-button-back" onClick={() => this.toggleMenu()}>
              <i class="fas icon-chevron-left"></i>
              <span class="ins-sfiw-button-label">{this.label ? this.label : 'Back'}</span>
            </button>
            <slot />
          </div>
        </div>
      )
    }
  }
}
