import { h, Component, Element, Prop, State, Event, EventEmitter } from "@stencil/core";
import flatpickr from "flatpickr";

@Component({ tag: "ins-datepicker" })
export class InsDatePicker {
  @Element() insDatepickerEl: HTMLElement;
  @Event() onDateChange: EventEmitter;
  @Event() valueChange: EventEmitter;

  @Prop({mutable:true}) disabled: boolean = false;
  @Prop({mutable:true}) readonly: boolean = false;
  @Prop({mutable: true}) hasError: boolean = false;

  @Prop({mutable:true}) label: string;
  @Prop({mutable:true}) name: string;
  @Prop({mutable:true}) format: string;
  @Prop({mutable:true}) value: string = "";
  @Prop({mutable:true}) placeholder: string = "";
  @Prop({mutable:true}) minDate: string = "";
  @Prop({mutable:true}) maxDate: string = "";
  @Prop({mutable:true}) icon: string = "";
  @Prop({mutable: true}) errorMessage: string = "";

  @State() pickerInstance: any;

  componentDidLoad() {
    this.setInsDatePicker();
  }

  setInsDatePicker() {
    this.format = this.format
      ? this.format
      : `Y-m-d`;
    this.initInsDatePicker();
  }

  initInsDatePicker(){
    let updatedFormat = this.updateFormat();
    let inputEl = this.insDatepickerEl.querySelector('input');
    let wrapper = this.insDatepickerEl.querySelector('.ins-datepicker-wrap') as any;

    this.pickerInstance = flatpickr(inputEl, {
      dateFormat: updatedFormat,
      minDate: this.minDate,
      maxDate: this.maxDate,
      onChange: this.onPickHandler.bind(this),
      appendTo: wrapper
    });
  }

  onblurHandler(){
    let labelEl = this.insDatepickerEl.querySelector('label');
    if (labelEl) labelEl.classList.remove('active')
  }

  onPickHandler(selected_dates, value){
    this.value = value;
    this.onDateChange.emit({label: this.label, selected_dates, value});
    this.valueChange.emit(value);
  }

  activateLabel(){
    if (!this.readonly && !this.disabled){
      let labelEl = this.insDatepickerEl.querySelector('label');
      if (labelEl) labelEl.classList.add('active')
    }
  }

  updateFormat(){
    let split = this.format.split(" ");
    switch(split[0]){
      case "MM/DD/YYYY": return `m/d/Y`;
      case "DD/MM/YYYY": return `d/m/Y`;
      case "YYYY/MM/DD": return `Y/m/d`;
      case "MM.DD.YYYY": return `m.d.Y`;
      case "DD.MM.YYYY": return `d.m.Y`;
      case "YYYY.MM.DD": return `Y.m.d`;
      case "MM-DD-YYYY": return `m-d-Y`;
      case "DD-MM-YYYY": return `d-m-Y`;
      case "YYYY-MM-DD": return `Y-m-d`;
      default: return this.format
    }
  }

	render() {
    return (
      <div class={`ins-datepicker-wrap ins-form-field-wrap ${this.hasError ? 'is-invalid' : ''}`}>
        { this.label ?
            <label htmlFor={this.name}
              class={`ins-form-label ${this.disabled ? 'disabled' : ''}`}>
              {this.label}
            </label>
        : ''}
        <div class="input-wrap">
          <input type="text" class="ins-form-field"
            name={this.name}
            placeholder={this.placeholder}
            value={this.value}
            onFocus={() => this.activateLabel()}
            onBlur={() => this.onblurHandler()}
            disabled={this.disabled || this.readonly} />

          {this.icon ? <i class={this.label ? this.icon + ' with-label' : this.icon}></i> : ''}
        </div>
        { this.hasError ?
          <div class="ins-form-error">
            {this.errorMessage}
          </div>
        : ''}
      </div>
    )
	}
}
