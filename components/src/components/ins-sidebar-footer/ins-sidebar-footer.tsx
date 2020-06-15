import { h, Component, Element } from "@stencil/core";

@Component({ tag: 'ins-sidebar-footer' })
export class InsSidebarFooter {
  @Element() InsSidebarFooter: HTMLElement;

  componentDidLoad(){
    let items = this.InsSidebarFooter.querySelectorAll('.ins-sidebar-footer-item-wrap') as any;
    for (let i = 0; i < items.length; i++) {
      items[i].style.width = `${100 / items.length}%`;
    }
  }

  render() {
    return (
      <div class="ins-sidebar-footer-wrap">
        <slot />
      </div>
    )
  }
}
