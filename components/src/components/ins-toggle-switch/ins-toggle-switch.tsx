import { h, Component, Prop, Event, EventEmitter} from "@stencil/core";

@Component({ tag: "ins-toggle-switch" })
export class InsToggleSwitch {
  @Event() insToggle: EventEmitter;
  @Event() insValueChange: EventEmitter;

  @Prop({mutable: true}) name: string;
  @Prop({mutable: true}) checked: boolean;
  @Prop({mutable: true}) value: string;
  @Prop({mutable: true}) trueValue: string = "";
  @Prop({mutable: true}) falseValue: string = "";
  @Prop({mutable: true}) label: string;
  @Prop({mutable: true}) disabled: boolean;

  onCheckHandler() {
    this.checked = !this.checked;
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

  render() {
    return (
      <div class={`v-switch ${this.disabled ? 'disabled':''}`}>
        <label class="ins-switch">
          <input type="checkbox" checked={this.checked}
            name={this.name}
            onChange={() => this.onCheckHandler()}
            disabled={this.disabled} />

          <span class="ins-slider round"><i></i></span>
          <span class="ins-label">{this.label}</span>
        </label>
      </div>
    );
  }
}
