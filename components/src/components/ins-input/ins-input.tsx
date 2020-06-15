import { h, Component, Prop, Watch, Event, EventEmitter, Method, Element } from "@stencil/core";

@Component({ tag: 'ins-input' })
export class InsInput {
  @Element() el: HTMLElement;
  @Event() oninput: EventEmitter;
  @Event() onblur: EventEmitter;
  @Event() valueChange: EventEmitter;

  @Prop({mutable: true}) placeholder: string = "";
  @Prop({mutable: true}) value: string = "";
  @Prop({mutable: true}) label: string = "";
  @Prop({mutable: true}) name: string = "";
  @Prop({mutable: true}) field: string = 'text';
  @Prop({mutable: true}) fieldId: string = "";
  @Prop({mutable: true}) errorMessage: string = "";
  @Prop({mutable: true}) maxlength: string = "";
  @Prop({mutable: true}) min: string = "";
  @Prop({mutable: true}) max: string = "";
  @Prop({mutable: true}) step: string = "";
  @Prop({mutable: true}) required: boolean = false;
  @Prop({mutable: true}) icon: string = "";
  @Prop({mutable: true}) disabled: boolean = false;
  @Prop({mutable: true}) readonly: boolean = false;
  @Prop({mutable: true}) hasError: boolean = false;
  @Prop({mutable: true}) activated: boolean = false;

  @Watch('value')
  valueChanged(){
    const inputEl = this.el.querySelector('input');
    if (inputEl.value !== this.value) {
      inputEl.value = this.value;
    }
  }

  oninputHandler(event){
    let x = event.which || event.keyCode;
    this.oninput.emit({
      value: event.target.value,
      keyCode: x
    });
  }

  onblurHandler(event){
    let x = event.which || event.keyCode;
    this.onblur.emit({
      value: event.target.value,
      keyCode: x
    });
    this.deactivateLabel();
  }

  inputChanged(ev: any) {
    let val = ev.target && ev.target.value;
    this.value = val;
    this.valueChange.emit(this.value);
  }

  @Method()
  val(attr, value) {
    let data = {
      placeholder: this.placeholder,
      value: this.value,
      label: this.label,
      name: this.name,
      field: this.field,
      fieldId: this.fieldId,
      errorMessage: this.errorMessage,
      required: this.required,
      icon: this.icon,
      disabled: this.disabled,
      readonly: this.readonly
    }
    if (attr && typeof attr == "object" && !value) {
      // console.log('this is json');
    } else if (attr && !value) {
      return this[attr];
    } else if (attr && value) {
      this[attr] = value;
    } else {
      return data;
    }
  }

  activateLabel(){
    if (!this.readonly && !this.disabled){
      this.activated = true
    }
  }

  deactivateLabel(){
    this.activated = false
  }

  render(){
    return (
      <div class="ins-input-wrap">
        <div class={`ins-sw-in ${this.hasError ? 'is-invalid' : ''}`}>
          { this.label ?
              <label htmlFor={this.name}
                class={`
                  ${this.disabled ? 'disabled' : ''}
                  ${this.activated ? 'active':''}
                `}>

                {this.label}
              </label>
          : ''}
          <div class="input-wrap">
            <input type={this.field}
              id={this.fieldId ? this.fieldId : null}
              name={this.name}
              placeholder={this.placeholder}
              value={this.value}
              required={this.required}
              onKeyUp={e => this.oninputHandler(e)}
              onInput={this.inputChanged.bind(this)}
              onFocus={() => this.activateLabel()}
              onBlur={e => this.onblurHandler(e)}
              class="ins-form-field"
              disabled={this.disabled}
              maxlength={this.maxlength}
              readonly={this.readonly}
              min={this.min}
              max={this.max}
              step={this.step} />

            {this.icon ? <i class={this.label ? this.icon + ' with-label' : this.icon}></i> : ''}
          </div>
          { this.hasError ?
            <div class="ins-form-error">
              {this.errorMessage}
            </div>
          : ''}

        </div>
      </div>
    )
  }
}
