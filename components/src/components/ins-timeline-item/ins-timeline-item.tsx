
import { h, Component, Element, Prop } from '@stencil/core';

@Component({ tag: "ins-timeline-item" })
export class InsTimelineItem {
  @Element() insTimelineItem: HTMLElement;
  @Prop({ mutable: true }) icon: string;
  @Prop({ mutable: true }) color: string;
  @Prop({ mutable: true }) solid: boolean = false;
  @Prop({ mutable: true }) heading: string;
  @Prop({ mutable: true }) datetime: string;
  @Prop({ mutable: true }) inline: boolean = true;

  render() {
    return (
      <div class="ins-timeline-item-wrap">
        <div class={`ins-icon-wrap ${!this.icon ? 'no-icon' : ''} ${this.color ? this.color: ''} ${this.solid ? 'solid' : ''}`}>
          {this.icon ? <span class={this.icon}></span> : ''}
        </div>
        <div class="ins-timeline-body">
          <div class={`ins-timeline-content ${this.inline ? 'inline-content' : ''}`}>
            {this.heading ?
              <div class="ins-timeline-heading">
                <h6>{this.heading}</h6>
              </div>
              : ''}
              <slot name="content" />
            {this.datetime ?
              <div class="ins-timeline-datetime">
                <p>{this.datetime}</p>
              </div> : ''}
          </div>
          <div class={`ins-timeline-actions ${this.inline ? 'inline-content' : ''}`}>
            <slot name="actions" />
          </div>
        </div>
      </div>
    )
  }
}
