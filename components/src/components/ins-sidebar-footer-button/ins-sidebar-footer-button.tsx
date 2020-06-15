import { h, Component, Prop, Method, Event, EventEmitter } from "@stencil/core";

@Component({ tag: 'ins-sidebar-footer-button' })
export class InsSidebarFooterButton {
  @Event() insSidebarFooterButtonEvent: EventEmitter;
  @Prop({ mutable: true }) icon: string = '';
  @Prop({ mutable: true }) open: string = '';
  @Method()
  insSidebarFooterButtonOnClick(event){
    this.insSidebarFooterButtonEvent.emit(event);
  }

  @Method()
  val(attr, value) {
    let data = {
      icon: this.icon
    }
    if (attr && typeof attr == "object" && !value) {
      // console.log('this is json');
    }
    else if (attr && !value) {
      return this[attr];
    }
    else if (attr && value) {
      this[attr] = value;
    }
    else {
      return data;
    }
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
