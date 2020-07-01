import { h, Component, Element, Method, Prop, Event, EventEmitter, Watch } from "@stencil/core";

@Component({ tag: 'ins-tab-item' })
export class InsTabItem {

  @Element() InsTabItemEl: HTMLElement;
  @Event() tabItemError: EventEmitter;
  @Event() tabItemDisableToggled: EventEmitter;

  @Prop({ mutable: true }) active: boolean;
  @Prop({ mutable: true }) label: string = "";
  @Prop({ mutable: true }) icon: string = "";
  @Prop({ mutable: true }) noPadding: boolean;
  @Prop({ mutable: true }) disabled: boolean;
  @Prop({ mutable: true }) hasError: boolean;

  @Method()
  async deactivate() {
    this.active = false;
  }

  @Method()
  async activate() {
    this.active = true;
  }

  @Watch('hasError')
  watchHandler() {
    this.tabItemError.emit(this.hasError);
  }

  @Watch('disabled')
  disabledWatcher() {
    this.tabItemDisableToggled.emit(this.disabled);
  }

  render() {
    return (
      <div class={`${this.noPadding ? 'no-padding' : ''}${this.active ? ' active' : ''}`}>
        <slot />
      </div>
    )
  }
}
