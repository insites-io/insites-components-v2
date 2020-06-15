import { h, Component, Prop, Event, EventEmitter, Method, State } from "@stencil/core";

@Component({ tag: 'ins-select-option' })

export class InsSelectOption {
  @Event() insSelectOptionClicked: EventEmitter;
  @Event() defaultEvent: EventEmitter;
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

  @Method()
  val(attr, value) {
    let data = {
      label: this.label,
      value: this.value,
      disabled: this.disabled,
      default: this.default
    }
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

  @Method() activate(){
    this.activated = true;
  }

  @Method() deactivate(){
    this.activated = false;
  }

  @Method() hideOption(){
    this.hidden = true;
  }

  @Method() showOption(){
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
