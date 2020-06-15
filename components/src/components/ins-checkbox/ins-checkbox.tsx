import { h, Component, Prop, Event, EventEmitter, Method } from "@stencil/core";

@Component({ tag: "ins-checkbox" })
export class InsCheckbox {
  @Event() onCheckInsCheckbox: EventEmitter;
  @Event() valueChange: EventEmitter;

  @Prop({mutable: true}) checked: boolean;
  @Prop({mutable: true}) disabled: boolean;
  @Prop({mutable: true}) value: string;
  @Prop({mutable: true}) trueValue: string = "";
  @Prop({mutable: true}) falseValue: string = "";
  @Prop({mutable: true}) label: string;
  @Prop({mutable: true}) name: string = "";

  onCheckHandler(){
    this.checked = !this.checked;
    this.onCheckInsCheckbox.emit({
      name: this.name,
      checked: this.checked,
      value: this.value,
      trueValue: this.trueValue,
      falseValue: this.falseValue
    });

    let toEmit = this.value;

    if (this.checked && this.trueValue){
      toEmit = this.trueValue;
    } else if (!this.checked && this.falseValue){
      toEmit = this.falseValue;
    }

    this.valueChange.emit(toEmit);
  }

  @Method()
  updateCheckState(state){
    this.checked = state;
  }

  render() {
    return (
      <div class="ins-checkbox-wrap">
        <label>
          <input type="checkbox"
            name={this.name ? this.name : ''}
            disabled={this.disabled}
            class="ripple-check"
            onChange={() => this.onCheckHandler()}
            checked={this.checked}
            value={this.value}
            true-value={this.trueValue}
            false-value={this.falseValue} />

          { this.label ? <span>{this.label}</span> : '' }
        </label>
      </div>
    )
  }
}
