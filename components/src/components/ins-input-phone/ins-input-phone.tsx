import { h, Component, Prop, Element, Method, State, Event, EventEmitter } from '@stencil/core';
import intlTelInput from "intl-tel-input";

@Component({
  tag: 'ins-input-phone',
  styleUrls: ["../../../node_modules/intl-tel-input/build/css/intlTelInput.min.css"]
})

export class InsInputPhone {
  @Element() el: HTMLElement;
  @Event() insInput: EventEmitter;
  @Event() insValueChange: EventEmitter;
  @Event() insValidation: EventEmitter;
  @Event() didLoad: EventEmitter;
  @Prop() hasLoad: string;

  @Prop({ mutable: true }) label: string = "";
  @Prop({ mutable: true }) value: string = "";
  @Prop({ mutable: true }) placeholder: string = "";
  @Prop({ mutable: true }) errorMessage: string = "";
  @Prop({ mutable: true }) validate: boolean;
  @Prop({ mutable: true }) required: boolean;
  @Prop({ mutable: true }) hasError: boolean;
  @Prop({ mutable: true }) disabled: boolean;
  @Prop({ mutable: true }) readonly: boolean;
  @Prop({ mutable: true }) tooltip: string = "";

  @Prop({ mutable: true }) fieldId: string = "";
  @Prop({ mutable: true }) name: string = "";

  @State() activated: boolean = false;

  _iti: any;
  _errorMessage: string;

  @Method()
  async getValue(){
    return this.value
  }

  async setValue(value){
    this.value = value;
  }

  componentDidLoad() {
    this._errorMessage = this.errorMessage;
    this.initintTel();
    this.didLoad.emit();
    if (this.hasLoad && window["Insites"]){
      let func = window["Insites"].methods[this.hasLoad];
      if (func) func(this.el);
    }
  }

  initintTel() {
    let input = this.el.querySelector('.ins-form-field');
    this._iti = intlTelInput(input, {
      utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.12/js/utils.min.js",
      initialCountry: "au",
      preferredCountries: ['au']
    });
  }

  blurHandler(e){
    this.activated = false;
    this.value = e.target.value;

    if (!this.validate){
      this.insValueChange.emit(this.value);
    } else this.validateHandler();
  }

  validateHandler(){
    if (!this.value && this.required){
      this.hasError = true;
      this.errorMessage = this._errorMessage
        ? this._errorMessage
        : "Required field.";

    } else if (this.value){
      this.hasError = !this._iti.isValidNumber();
      this.errorMessage = "Invalid number.";
    } else {
      this.hasError = false;
    }

    this.insValidation.emit({
      hasError: this.hasError,
      errorMessage: this.errorMessage
    })
  }

  activateLabel(){
    if (!this.readonly && !this.disabled){
      this.activated = true
    }
  }

  render() {
    return (
      <div class={`ins-input-phone-wrap ins-form-field-wrap
        ${this.hasError ? 'is-invalid':''}
        ${this.readonly ? 'read-only' : ''} `}>

        {this.label || this.tooltip?
          <label htmlFor={this.name}
            class={`ins-form-label
              ${this.disabled ? 'disabled' : ''}
              ${this.activated ? 'active':''}`}>

            {this.label}

            {this.tooltip
              ? <ins-input-tooltip
                  content={this.tooltip}>
                </ins-input-tooltip>

              : ''
            }

          </label>
        : ''}

        <input class="ins-form-field"
          id={this.fieldId ? this.fieldId : null}
          type="tel"
          name={this.name}
          value={this.value}
          placeholder={this.placeholder}
          required={this.required}
          disabled={this.disabled}
          readonly={this.readonly}
          onFocus={() => this.activateLabel()}
          onBlur={e => this.blurHandler(e)} />

        {this.hasError ?
          <div class="ins-form-error">
            {this.errorMessage}
          </div>
        : ''}
      </div>
    );
  }
}
