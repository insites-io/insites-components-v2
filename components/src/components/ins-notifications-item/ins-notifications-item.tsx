import { h, Component, Prop, Element } from "@stencil/core";

@Component({ tag: 'ins-notifications-item' })
export class InsNotificationsItem {
  @Element() InsNotificationsItemEl: HTMLElement;

  @Prop({mutable:true}) eventType: string;
  @Prop({mutable:true}) heading: string;
  @Prop({mutable:true}) duration: string;
  @Prop({mutable:true}) desc: string;
  @Prop({mutable:true}) icon: string;
  @Prop({mutable:true}) status: string;
  @Prop({mutable:true}) link: string;
  @Prop({mutable:true}) linkLabel: string;

  render() {
    return (
      <div class="ins-notifications-item-wrap">

        <div class={'ins-niw-status-wrap ' + this.status}>
          <i class={this.icon}></i>
        </div>
        <h2>{this.eventType}</h2>
        {this.heading ?
        <h3>
          {this.heading}

          <span class="ins-niw-duration-wrap">
            {this.duration}
          </span>
        </h3> :
        <span class="ins-niw-duration-wrap">
          {this.duration}
        </span>}

        {this.desc ?
        <p>
          {this.desc}
          {this.link ?
          <a href={this.link}>{this.linkLabel}</a> : ''}
        </p> : this.link ?
        <p><a href={this.link} class="link-only">{this.linkLabel}</a></p> : '' }
      </div>
    )
  }
}
