import { h, Component, Prop, Event, EventEmitter, Element } from "@stencil/core";

@Component({ tag: "ins-radio" })
export class InsRadio {
  @Element() insRadioEl: HTMLElement;
  @Event() insCheck: EventEmitter;
  @Event() insValueChange: EventEmitter;
  @Event() didLoad: EventEmitter;
  @Prop() hasLoad: string;

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

  componentDidLoad(){
    this.didLoad.emit();
    if (this.hasLoad && window["Insites"]){
      let func = window["Insites"].methods[this.hasLoad];
      if (func) func(this.insRadioEl);
    }
  }

  componentWillUpdate(){
    if (this.value === this.staticValue){
      this.localChecked = true;
    } else this.localChecked = false;
  }

  onSelectHandler(){
    this.insCheck.emit({
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
