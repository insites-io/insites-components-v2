import { h, Component } from "@stencil/core";

@Component({ tag: 'ins-content' })
export class InsContent {
  insSidebarEl;

  componentWillLoad(){
    this.insSidebarEl = document.querySelector('ins-sidebar');
  }

  mouseEnterHandler(){
    let insAdminEl = document.querySelector('ins-admin');
    let submenuWrapEls = document.querySelectorAll('ins-sidebar-item') as any;

    if (insAdminEl.className.includes('mini')){
      for (let i = 0; i < submenuWrapEls.length; ++i) {
        submenuWrapEls[i].hideSubMenu();
      }
    }
  }

  render() {
    return (
      <div class={`content ${this.insSidebarEl ? '' : 'no-sidebar'}`}
        onMouseEnter={() => this.mouseEnterHandler()}>

        <slot />
      </div>
    )
  }
}
