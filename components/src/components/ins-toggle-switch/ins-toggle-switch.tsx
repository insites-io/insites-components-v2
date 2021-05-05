import { h, Component, Prop, Event, EventEmitter, Element, Method } from "@stencil/core";

@Component({ tag: "ins-toggle-switch" })
export class InsToggleSwitch {
  @Element() insToggleSwitchEl: HTMLElement
  @Event() insToggle: EventEmitter;
  @Event() insValueChange: EventEmitter;
  @Event() didLoad: EventEmitter;
  @Prop() hasLoad: string;

  @Prop({mutable: true}) name: string;
  @Prop({mutable: true}) checked: boolean;
  @Prop({mutable: true}) value: string;
  @Prop({mutable: true}) trueValue: string = "";
  @Prop({mutable: true}) falseValue: string = "";
  @Prop({mutable: true}) label: string;
  @Prop({mutable: true}) disabled: boolean;

  @Prop({mutable: true}) enabledLabel: string;
  @Prop({mutable: true}) disabledLabel: string;
  @Prop({mutable: true}) tooltip: string = "";


  @Method()
  async setValue(value, trueValue, falseValue){
    this.value = value;
    this.trueValue = trueValue;
    this.falseValue = falseValue;
  }

  @Method()
  async updateCheckState(state){
    this.checked = state;
    this.emitEvents();
  }

  @Method()
  async getValue(){
    return {
      value: this.value,
      trueValue: this.trueValue,
      falseValue: this.falseValue
    }
  }

  componentDidLoad(){
    this.didLoad.emit();
    if (this.hasLoad && window["Insites"]){
      let func = window["Insites"].methods[this.hasLoad];
      if (func) func(this.insToggleSwitchEl);
    }
  }

  onCheckHandler(){
    this.checked = !this.checked;
    this.emitEvents();
  }

  emitEvents(){
    this.insToggle.emit({
      checked: this.checked,
      value: this.value
    });

    let toEmit = this.value;

    if (this.checked && this.trueValue){
      toEmit = this.trueValue;
    } else if (!this.checked && this.falseValue){
      toEmit = this.falseValue;
    }

    this.insValueChange.emit(toEmit);
  }

  constructLabel(){
    if (this.checked){
      return this.enabledLabel ? this.enabledLabel : this.label;
    }
    return this.disabledLabel ? this.disabledLabel : this.label;
  }

  render() {
    return (
      <div class={`v-switch ${this.disabled ? 'disabled':''}`}>
        <label class="ins-switch">
          <input type="checkbox" checked={this.checked}
            name={this.name}
            onChange={() => this.onCheckHandler()}
            disabled={this.disabled} />

          <span class="ins-slider round"><i></i></span>
          <span class="ins-label">{this.constructLabel()}</span>
        </label>

        {this.tooltip
          ? <ins-input-tooltip content={this.tooltip}></ins-input-tooltip>
          : ''
        }
      </div>
    );
  }
}
