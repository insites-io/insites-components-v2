import { h, Component, Prop, Event, EventEmitter, Method } from "@stencil/core";

@Component({ tag: "ins-instances-sub-item" })
export class InsInstancesSubItem {
  @Event() routeInstanceSubItem: EventEmitter;
  @Prop({ mutable: true }) instance: string = "";
  @Prop({ mutable: true }) link: string = "";

  routeInstanceSubItemHandler(){
    this.routeInstanceSubItem.emit({
      instance: this.instance,
      link: this.link
    });
  }

  @Method()
  val(attr, value) {
    let data = {
      instance: this.instance,
      link: this.link,
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

  render() {
    return (
      <div class="ins-instance-sub-item">
        <a href={this.link} onClick={() => this.routeInstanceSubItemHandler()}>
          <span class="instance-sub-item-label">{this.instance ? this.instance : 'Label' }</span>
        </a>
      </div>
    );
  }
}
