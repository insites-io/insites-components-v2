import { h, Component, Prop, Element, Event, EventEmitter } from "@stencil/core";
// , Prop, Element, Event, EventEmitter, Listen, Method

@Component({
  tag: 'ins-alert-box'
})

export class InsAlertBox {
  @Element() insAlertBoxEl: HTMLElement;
  @Event() didLoad: EventEmitter;

  @Prop ({ mutable: true }) type: string = "primary";
  @Prop ({ mutable: true }) closeIcon: string = "icon-close";
  @Prop ({ mutable: true }) noCloseButton: boolean = false;
  @Prop ({ mutable: true }) load: boolean = false;
  @Prop ({ mutable: true }) checkLoad: boolean = false;

  close(event) {
    event.target.parentElement.style.opacity = "0";
    setTimeout(() => {
      event.target.parentElement.style.display = "none";
    }, 600);
  }

  componentDidLoad() {
    if (this.checkLoad) this.load = true;
    this.didLoad.emit();
  }

  render() {
    return (
      <div class="ins-alert-box">
        <div class={`alert-box ${this.type}`}>
          {!this.noCloseButton ?
            <span
              class={`alert-close ${this.closeIcon}`}
              onClick={this.close}></span>
          : ''}
          <slot />
        </div>
      </div>
    )
  }
}
