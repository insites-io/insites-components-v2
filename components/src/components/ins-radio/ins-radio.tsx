import { h, Component, Prop, Event, EventEmitter } from "@stencil/core";

@Component({ tag: "ins-radio" })
export class InsRadio {
  @Event() insSelect: EventEmitter;
  @Event() insValueChange: EventEmitter;

  @Prop({mutable:true}) checked: boolean;
  @Prop({mutable:true}) disabled: boolean;
  @Prop({mutable:true}) value: any;
  @Prop({mutable:true}) staticValue: any;
  @Prop({mutable:true}) name: any;
  @Prop({mutable:true}) label: any;

  localChecked: boolean = false;

  componentWillLoad(){
    if (this.checked) this.localChecked = true;
  }

  componentWillUpdate(){
    if (this.value === this.staticValue){
      this.localChecked = true;
    } else this.localChecked = false;
  }

  onSelectHandler(){
    this.insSelect.emit({
      name: this.name,
      value: this.value,
    });
    
    if (this.staticValue){
      this.insValueChange.emit(this.staticValue);
    } else this.insValueChange.emit(this.value);
  }

  render() {
    return (
      <div class="ins-radio ins-radio-checkbox">
        <label>
          <input class="ripple-check radio"
            onChange={() => this.onSelectHandler()}
            type="radio"
            value={this.staticValue ? this.staticValue : this.value}
            name={this.name}
            disabled={this.disabled}
            checked={this.localChecked} />

          <span>{this.label}</span>
        </label>
      </div>
    );
  }
}
