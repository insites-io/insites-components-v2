import { h, Component, Prop, Element, Method, Event, EventEmitter } from '@stencil/core';
import intlTelInput from "intl-tel-input";

@Component({
  tag: 'ins-input-tel',
  styleUrls: ["../../../node_modules/intl-tel-input/build/css/intlTelInput.min.css"]
})

export class InsInputTel {
  @Element() insInputTelEl: HTMLElement;
  @Event() insInput: EventEmitter;
  @Event() insValueChange: EventEmitter;
  @Event() didLoad: EventEmitter;
  @Prop() hasLoad: string;

  @Prop({ mutable: true }) label: string = "";
  @Prop({ mutable: true }) areacodePlaceholder: string = "";
  @Prop({ mutable: true }) areacodeValue: string = "";
  @Prop({ mutable: true }) phonenumPlaceholder: string = "";
  @Prop({ mutable: true }) phonenumValue: string = "";
  @Prop({ mutable: true }) countryCode: string = "61";
  @Prop({ mutable: true }) areaCode: string = "";
  @Prop({ mutable: true }) phoneNumber: string = "";
  @Prop({ mutable: true }) errorMessage: string = "";
  @Prop({ mutable: true }) required: boolean;
  @Prop({ mutable: true }) hasError: boolean;
  @Prop({ mutable: true }) disabled: boolean;
  @Prop({ mutable: true }) readonly: boolean;
  @Prop({ mutable: true }) noAreacode: boolean;

  responsiveView: boolean;
  activeLabel: boolean;
  dropdownIsOpen: boolean = false;
  _phone: any;
  _areaCode: any;
  _phoneNumber: any;
  _label: any;
  _iti: any;

  componentDidLoad() {
    this._phone = this.insInputTelEl.querySelector('.phone');
    this._areaCode = this.insInputTelEl.querySelector('.area-code');
    this._phoneNumber = this.insInputTelEl.querySelector('.phone-number');
    this._label = this.insInputTelEl.querySelector('label');

    this.initintTel();
    this.initKeyPressEvents();
    this.initFocusEvents();
    this.initBlurEvents();

    if (this.countryCode){
      this.setCountryCode(`+${this.countryCode}`);
    }

    this.didLoad.emit();
    if (this.hasLoad && window["Insites"]){
      let func = window["Insites"].methods[this.hasLoad];
      if (func) func(this.insInputTelEl);
    }
  }

  initBlurEvents(){
    this._phoneNumber.addEventListener('blur', this.deactivateLabel.bind(this));
    this._areaCode.addEventListener('blur', this.deactivateLabel.bind(this));
  }

  initFocusEvents(){
    this._phoneNumber.addEventListener('focus', this.activateLabel.bind(this));
    this._areaCode.addEventListener('focus', this.activateLabel.bind(this));
  }

  initKeyPressEvents(){
    this._areaCode.addEventListener('keyup', e => this.validateValue(e, 5, 'area_code'));
    this._phoneNumber.addEventListener('keyup', e => this.validateValue(e, 13, 'phone_number'));
  }

  validateValue(event, maxChars, field){
    let evt = event as any;
    let value = evt.target.value.replace(/[^\d.]/g, '');

    if ((event.which < 48 || event.which > 57)
        && (event.which !== 8 && event.which !== 9 && event.which !== 32)) {
        event.preventDefault();
    }

    if (value.length > maxChars) {
      value = value.substr(0, maxChars).replace(/[^\d.]/g, '');
    }

    evt.target.value = value;
    this.insInput.emit({ field, value });
    this.insValueChange.emit(this.getValue());
  }

  initintTel() {
    this._iti = intlTelInput(this._phone, {
      autoPlaceholder: "off",
      initialCountry: "au",
      preferredCountries: ['au'],
      separateDialCode: true
    });

    this._phone.addEventListener("countrychange", async () => {
      let data = await this.getCountryData();
      this.countryCode = data.dialCode;
      this.insInput.emit({
        field: 'country_code',
        value: data
      })
      this.insValueChange.emit(this.getValue());
    });

    this._phone.addEventListener("open:countrydropdown", () => {
      this.activateLabel();
      this.dropdownIsOpen = true;
    });

    this._phone.addEventListener("close:countrydropdown", () => {
      this.dropdownIsOpen = false;

      if (this._phoneNumber !== document.activeElement
        && this._areaCode !== document.activeElement){
        this.deactivateLabel();
      }
    });

    this.insInputTelEl.querySelector('.iti__arrow').className = "icon-caret-down";
  }

  @Method()
  async getValue(){
    let value = `+${this.countryCode}`
    if (!this.noAreacode){
      value += this.areacodeValue;
    }
    value += this.phonenumValue;
    return value
  }

  @Method()
  async getValues(){
    return {
      country_code: this._iti.getSelectedCountryData().dialCode,
      area_code: this._areaCode.value,
      phone_number: this._phoneNumber.value
    }
  }

  @Method()
  async getCountryData() {
    return this._iti.getSelectedCountryData();
  }

  @Method()
  async setCountry(country) {
    this._iti.setCountry(country);
  }

  @Method()
  async setCountryCode(code) {
    this._iti.setNumber(code);
  }

  activateLabel() {
    if (this.readonly || this.disabled) return;
    this._label.classList.add('active');
  }

  deactivateLabel() {
    if (this.readonly || this.disabled) return;
    this._label.classList.remove('active');
  }

  render() {
    return (
      <div class={`ins-input-tel-wrap ins-form-field-wrap
        ${this.hasError ? 'is-invalid':''}
        ${this.responsiveView ? 'responsive' : ''}
        ${this.noAreacode ? 'no-areacode' : ''}
        ${this.readonly ? 'read-only' : ''} `}>

        <label class="ins-form-label">{this.label}</label>

        <div class="row-col-container">

          <div class="col-container column-1">
            <input type="tel" class="phone ins-form-field"
              disabled={this.disabled}
              readonly={this.readonly} />
          </div>

          <div class="col-container column-2">

            <input
              type="text"
              class="ins-form-field area-code"
              name={this.areaCode}
              placeholder={this.areacodePlaceholder}
              value={this.areacodeValue}
              required={this.required ? true : false}
              disabled={this.disabled} readonly={this.readonly} />
          </div>

          <div class="col-container column-3">
            <input
              type="text"
              class="ins-form-field phone-number"
              name={this.phoneNumber}
              placeholder={this.phonenumPlaceholder}
              value={this.phonenumValue}
              disabled={this.disabled} readonly={this.readonly} />
          </div>

        </div>

        {this.hasError ?
          <div class="ins-form-error">
            {this.errorMessage}
          </div>
        : ''}
      </div>
    );
  }
}
