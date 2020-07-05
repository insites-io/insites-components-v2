import { h, Component, Prop, Event, EventEmitter, Method, State } from "@stencil/core";

@Component({ tag: 'ins-select-option' })

export class InsSelectOption {
  @Event() insSelectOptionClicked: EventEmitter;

  @Prop({mutable: true}) label: string = 'Option';
  @Prop({mutable: true}) value: string = '';
  @Prop({mutable: true}) disabled: boolean = false;
  @Prop({mutable: true}) default: boolean = false;

  @State() activated: boolean;
  @State() hidden: boolean;

  insSelectOptionClickHandler(){
    if (!this.disabled){
      this.insSelectOptionClicked.emit({
        value: this.value,
        label: this.label,
      });
    }
  }

  @Method() async activate(){
    this.activated = true;
  }

  @Method() async deactivate(){
    this.activated = false;
  }

  @Method() async hideOption(){
    this.hidden = true;
  }

  @Method() async showOption(){
    this.hidden = false;
  }

	render() {
    return (
      <div class={`
        ins-select-option-wrap
        ${this.activated ? 'selected': ''}
        ${this.hidden ? 'hidden': ''}
        ${this.disabled ? 'disabled': ''} `}
        onClick={() => this.insSelectOptionClickHandler()}>
        {this.label}
      </div>
    );
	}
}
