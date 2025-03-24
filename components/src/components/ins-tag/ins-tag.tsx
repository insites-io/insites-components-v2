import { h, Component, Prop, Element } from "@stencil/core";

@Component({ tag: 'ins-tag' })
export class InsTag {
  @Element() InsTagEl: HTMLElement;
  @Prop({ mutable: true }) label: string;
  @Prop({ mutable: true }) color: string;
  @Prop({ mutable: true }) icon: string;
  @Prop({ mutable: true }) light: boolean = true;
  @Prop({ mutable: true }) fontInherit: boolean = false;
  @Prop({ mutable: true }) fontColor: string;
  @Prop({ mutable: true }) backgroundColor: string;
  @Prop({ mutable: true }) outlined: boolean = false;
  @Prop({ mutable: true }) outlineColor: string;

  componentDidLoad() {
    this.addColorStyles();
  }

  componentDidUpdate() {
    this.addColorStyles();
  }

  addColorStyles() {
    let insTag = this.InsTagEl.querySelector('.ins-tag');
    if (insTag) {

      if (this.fontColor && this.fontColor[0] === '#') {
        if (insTag) {
          insTag['style'].color = this.fontColor;
        }
      }

      if (this.backgroundColor && this.backgroundColor[0] === '#') {
        if (insTag) {
          insTag['style']['background-color'] = this.backgroundColor;
        }
      }

      if (this.outlined && this.outlineColor && this.outlineColor[0] === '#') {
        if (insTag) {
          insTag['style']['outline'] = `1px solid ${this.outlineColor}`;
        }
      }
    }
  }

  render() {
    return (
      <span class={`ins-tag
        ${this.outlined ? 'outlined' : ''}
        ${this.light ? 'light' : ''}
        ${this.color} ${this.fontInherit ? 'font-inherit' : ''}`}>

        { this.icon
          ? <span class={this.icon}></span>
          : ''}

        {this.label}
      </span>
    )
  }
}
