import { Component, Prop, Element, State, Method, Event, EventEmitter } from '@stencil/core';
declare var $

@Component({ tag: 'ins-input-tel' })

export class InsInputTel {
  @Element() insInputTelEl: HTMLElement;
  @Event() insInputTelChange: EventEmitter;
  @Event() valueChange: EventEmitter;

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
  @State() responsiveView: boolean;
  @State() activeLabel: boolean;
  @State() dropdownIsOpen: boolean = false;
  @State() _areaCode: any;
  @State() _phoneNumber: any;
  @State() _label: any;

  @Method()
  val(attr, value) {
    let data = {
      label: this.label,
      areacodePlaceholder: this.areacodePlaceholder,
      areacodeValue: this.areacodeValue,
      phonenumPlaceholder: this.phonenumPlaceholder,
      phonenumValue: this.phonenumValue,
      countryCode: this.countryCode,
      areaCode: this.areaCode,
      phoneNumber: this.phoneNumber,
      errorMessage: this.errorMessage,
      required: this.required,
      hasError: this.hasError,
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

  componentDidLoad() {
    if ((window as any).$) {
      this._areaCode = this.insInputTelEl.querySelector('.area-code');
      this._phoneNumber = this.insInputTelEl.querySelector('.phone-number');
      this._label = this.insInputTelEl.querySelector('label');

      this.initintTel();
      this.initKeyUpEvents();
      this.initFocusEvents();
      this.initBlurEvents();
    }

    if (this.countryCode){
      this.setCountryCode(`+${this.countryCode}`);
    }
  }

  initBlurEvents(){
    let self = this;
    $(this._phoneNumber).on('blur', () => {
      setTimeout(() => {
        if (!$(this._areaCode).is(':focus') && !self.dropdownIsOpen) {
          self.deactivateLabel();
        }
      });
    });

    $(this._areaCode).on('blur', () => {
      setTimeout(() => {
        if (!$(this._phoneNumber).is(':focus') && !self.dropdownIsOpen) {
          self.deactivateLabel();
        }
      });
    });
  }

  initFocusEvents(){
    let self = this;
    $(this._phoneNumber).on('focus', self.activateLabel.bind(self));
    $(this._areaCode).on('focus', self.activateLabel.bind(self));
  }

  initKeyUpEvents(){

    let self = this;
    let _input = $(".row-col-container .ins-form-field");

    _input.on("keyup", function (event) {
      $(this).val($(this).val().replace(/[^\d].+/, ""));

      if ((event.which < 48 || event.which > 57)) {
        event.preventDefault();
      }
    });

    $(this._areaCode).keyup(function () {
      var maxChars = 5;
      if ($(this).val().length > maxChars) {
        $(this).val($(this).val().substr(0, maxChars));
      }

      self.areacodeValue = $(this).val();
      self.insInputTelChange.emit({
        field: 'area_code',
        value: $(this).val()
      });
      self.valueChange.emit(self.getValue());
    });

    $(this._phoneNumber).keyup(function () {
      var maxChars = 10;
      if ($(this).val().length > maxChars) {
        $(this).val($(this).val().substr(0, maxChars));
      }

      self.phonenumValue = $(this).val();
      self.insInputTelChange.emit({
        field: 'phone_number',
        value: $(this).val()
      });
      self.valueChange.emit(self.getValue());
    });
  }

  initintTel() {
    let phone = this.insInputTelEl.querySelector('.phone');

    $(phone).intlTelInput({
      autoPlaceholder: "off",
      initialCountry: "au",
      preferredCountries: ['au'],
      separateDialCode: true
    });

    $(phone).on("countrychange", () => {
      let data = this.getCountryData();

      this.countryCode = data.dialCode;
      this.insInputTelChange.emit({
        field: 'country_code',
        value: data
      });
      this.valueChange.emit(this.getValue());
    });

    $(phone).on("open:countrydropdown", () => {
      this.activateLabel();
      this.dropdownIsOpen = true;
    });

    $(phone).on("close:countrydropdown", () => {
      this.dropdownIsOpen = false;

      if (!$(this._phoneNumber).is(':focus') && !$(this._areaCode).is(':focus')){
        this.deactivateLabel();
      }
    });

    this.insInputTelEl.querySelector('.iti-arrow').className = "icon-caret-down";
  }

  @Method()
  getValue(){
    let value = `+${this.countryCode}`
    if (!this.noAreacode){
      value += this.areacodeValue;
    }
    value += this.phonenumValue;
    return value
  }

  @Method()
  getCountryData() {
    if ((window as any).$) {
      let phone = this.insInputTelEl.querySelector('.phone');
      return $(phone).intlTelInput('getSelectedCountryData');
    }
  }

  @Method()
  setCountry(country) {
    if ((window as any).$) {
      let phone = this.insInputTelEl.querySelector('.phone');
      $(phone).intlTelInput('setCountry', country);
    }
  }

  @Method()
  setCountryCode(code) {
    if ((window as any).$) {
      let phone = this.insInputTelEl.querySelector('.phone');
      $(phone).intlTelInput('setNumber', code);
    }
  }

  isNumberOnly(event) {
    event = (event) ? event : window.event;
    let _charCode = (event.which) ? event.which : event.keyCode;

    if (_charCode > 31 && (_charCode < 48 || _charCode > 57)) {
      return false
    }
    return true;
  }

  activateLabel() {
    this._label.classList.add('active');
  }

  deactivateLabel() {
    this._label.classList.remove('active');
  }

  render() {
    return (
      <div class={`ins-input-tel-wrap
        ${this.hasError ? 'is-invalid':''}
        ${this.responsiveView ? 'responsive' : ''}
        ${this.noAreacode ? 'no-areacode' : ''}
        ${this.readonly ? 'read-only' : ''} `}>

        <label>{this.label}</label>

        <div class="row-col-container clearfix">
          <div class="col-container column-1">
            <input type="tel" class="phone" disabled={this.disabled} readonly={this.readonly} />
          </div>

          <div class="col-container column-2">

            <input
              type="text"
              class="ins-form-field area-code"
              name={this.areaCode}
              placeholder={this.areacodePlaceholder}
              value={this.areacodeValue}
              onKeyPress={e => this.isNumberOnly(e)}
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
              onKeyPress={e => this.isNumberOnly(e)}
              disabled={this.disabled} readonly={this.readonly} />
          </div>

          {this.hasError ?
            <div class="ins-form-error">
              {this.errorMessage}
            </div>
          : ''}
        </div>
      </div>
    );
  }
}
