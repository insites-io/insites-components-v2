import { h, Component, Prop, Method, Event, EventEmitter } from "@stencil/core";

@Component({ tag: 'ins-sidebar-footer-button' })
export class InsSidebarFooterButton {
  @Event() insSidebarFooterButtonEvent: EventEmitter;
  @Prop({ mutable: true }) icon: string = '';
  @Prop({ mutable: true }) open: string = '';

  @Method()
  async insSidebarFooterButtonOnClick(event){
    this.insSidebarFooterButtonEvent.emit(event);
  }

  render() {
    if (this.icon) {
      return (
        <div class="ins-sidebar-footer-item-wrap">
          <button class="ins-sfiw-button"
            onClick={event => this.insSidebarFooterButtonOnClick(event)}>

            { this.icon ?
            <i class={`ins-sfiw-button-icon ${this.icon}`}></i> : ''}
          </button>
        </div>
      )
    }
  }
}
