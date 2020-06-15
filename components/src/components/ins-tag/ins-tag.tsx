import { Component, Prop, Element } from "@stencil/core";

@Component({ tag: 'ins-tag' })

export class InsTag {
  @Element() InsTagEl: HTMLElement;
  @Prop({ mutable: true }) label: string;
  @Prop({ mutable: true }) color: string;
  @Prop({ mutable: true }) icon: string;
  @Prop({ mutable: true }) light: boolean = true; // v2 style - light, pastel color
  @Prop({ mutable: true }) fontInherit: boolean = false;
  @Prop({ mutable: true }) fontColor: string;
  @Prop({ mutable: true }) backgroundColor: string;

  componentDidLoad() {
    this.addColorStyles();
  }

  componentDidUpdate() {
    this.addColorStyles();
  }

  addColorStyles() {
    let insTag = this.InsTagEl.querySelector('.ins-tag');
    if (insTag) {
      // font-color
      if (this.fontColor && this.fontColor[0] === '#') {
        if (insTag) {
          insTag['style'].color = this.fontColor;
        }
      }
      // background-color
      if (this.backgroundColor && this.backgroundColor[0] === '#') {
        if (insTag) {
          insTag['style']['background-color'] = this.backgroundColor;
        }
      }
    }
  }

  render() {
    return (
      <span class={`ins-tag ${this.light ? 'light' : ''} ${this.color} ${this.fontInherit ? 'font-inherit' : ''}`}>{this.icon ? <span class={this.icon}></span>: ''}{this.label}</span>
    )
  }
}
