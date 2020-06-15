import {Component, Prop} from "@stencil/core";

@Component({ tag: "ins-tags-button" })
export class insTagsButton {
  @Prop() color: string = 'blue';
  @Prop() label: string;
  @Prop() size: string;
  @Prop() textTransform: string;
  @Prop() solid: boolean;
  @Prop() outlined: boolean;


  render() {
    return (
      <div
        class={`tag-btn ${this.size ? 'size--' + this.size : ''}
                ${this.solid ? 'mdc-button--unelevated' : ''}
                ${this.outlined ? 'mdc-button--outlined' : ''}
                ${this.textTransform ? 'text-transform--' + this.textTransform : ''}
                ${this.color} mdc-button`}>
        <div class={`tag-btn__label`}>
          {this.label}
        </div>
      </div>
    );
  }
}
