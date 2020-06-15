import { h, Component, Event, EventEmitter, Prop, State, Element, Method } from "@stencil/core";

@Component({ tag: 'ins-instances-item' })
export class InsInstancesItem {
  @Element() el: HTMLElement;
  @Event() routeInstance: EventEmitter;
  @Event() activeSubItem: EventEmitter;
  @Prop({ mutable: true }) logoLink: string = "";
  @Prop({ mutable: true }) instance: string = "";
  @Prop({ mutable: true }) instanceLink: string = "";
  @Prop({ mutable: true }) withSubItem: boolean = false;

  @State() subItemState: boolean;

  routeInstanceHandler(){
    this.routeInstance.emit({
      instance: this.instance,
      logoLink: this.logoLink,
      withSubItem: this.withSubItem
    });

    this.subItemState = true;
  }

  emitActiveSubItem() {
    this.activeSubItem.emit();
    this.subItemState = false;
  }

  @Method()
  val(attr, value) {
    let data = {
      logoLink: this.logoLink,
      instance: this.instance,
      instanceLink: this.instanceLink,
      withSubItem: this.withSubItem,
    };

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

  render(){
    return (
      <div class={`ins-instances-item-wrap ${this.subItemState ? 'sub-item-active' : ''}`}>
        <a href={this.instanceLink} onClick={() => this.routeInstanceHandler()} class="ins-instances-item">
          <div class="logo-wrap">
            <img src={this.logoLink ? this.logoLink : 'http://ins-styleguide.s3-website-us-west-2.amazonaws.com/assets/images/insites_logo_icon.svg'} />
          </div>
          <span class="instance-label">{this.instance ? this.instance : 'Label'}</span>
          <i class="icon-chevron-right"></i>
        </a>
        {this.withSubItem ? (
          <div class="instance-sub-item__container">
            <a onClick={() => this.emitActiveSubItem()}>
              <i class="fas icon-chevron-left"></i>
              <span>{this.instance}</span>
            </a>
            <slot />
          </div>
        ) : (
          ""
        )}
      </div>
    )
  }
}
