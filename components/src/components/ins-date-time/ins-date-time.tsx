import { h, Component, Element, Prop, State, Event, EventEmitter } from "@stencil/core";
import flatpickr from "flatpickr";

@Component({ tag: 'ins-date-time' })
export class InsDateTime {
  @Element() insDateTimeEl: HTMLElement;
  @Event() onpick: EventEmitter;
  @Event() valueChange: EventEmitter;

  @Prop({mutable:true}) noMeridiem: boolean = false;
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
  @Prop({mutable: true}) errorMessage: string = "";
  @Prop({ mutable: true }) icon: string = "";

  @State() pickerInstance: any;

  componentDidLoad(){
    this.format = this.format
      ? this.format
      : `Y-m-d ${this.noMeridiem ? 'H:i' : 'h:i K'}`;
    this.initInsDateTime();
  }

  initInsDateTime(){
    let updatedFormat = this.updateFormat();
    let inputEl = this.insDateTimeEl.querySelector('input');
    let wrapper = this.insDateTimeEl.querySelector('.ins-date-time-wrap') as any;

    this.pickerInstance = flatpickr(inputEl, {
      enableTime: true,
      dateFormat: updatedFormat,
      time_24hr: this.noMeridiem,
      minDate: this.minDate,
      maxDate: this.maxDate,
      onChange: this.onPickHandler.bind(this),
      appendTo: wrapper
    });
  }

  onPickHandler(selected_dates, date_string){
    this.value = date_string;
    this.onpick.emit({label: this.label, selected_dates, date_string});
    this.valueChange.emit(date_string);
  }

  activateLabel(){
    if (!this.readonly && !this.disabled){
      let labelEl = this.insDateTimeEl.querySelector('label');
      if (labelEl) labelEl.classList.add('active');
    }
  }
  onblurHandler(){
    let labelEl = this.insDateTimeEl.querySelector('label');
    if (labelEl) labelEl.classList.remove('active')
  }

  updateFormat(){
    let split = this.format.split(" ");
    if (split[1] === "HH:mm"){
      this.noMeridiem = true;
    }
    switch(split[0]){
      case "MM/DD/YYYY": return `m/d/Y ${this.noMeridiem ? "H:i" : 'h:i K'}`;
      case "DD/MM/YYYY": return `d/m/Y ${this.noMeridiem ? "H:i" : 'h:i K'}`;
      case "YYYY/MM/DD": return `Y/m/d ${this.noMeridiem ? "H:i" : 'h:i K'}`;
      case "MM.DD.YYYY": return `m.d.Y ${this.noMeridiem ? "H:i" : 'h:i K'}`;
      case "DD.MM.YYYY": return `d.m.Y ${this.noMeridiem ? "H:i" : 'h:i K'}`;
      case "YYYY.MM.DD": return `Y.m.d ${this.noMeridiem ? "H:i" : 'h:i K'}`;
      case "MM-DD-YYYY": return `m-d-Y ${this.noMeridiem ? "H:i" : 'h:i K'}`;
      case "DD-MM-YYYY": return `d-m-Y ${this.noMeridiem ? "H:i" : 'h:i K'}`;
      case "YYYY-MM-DD": return `Y-m-d ${this.noMeridiem ? "H:i" : 'h:i K'}`;
      default: return this.format
    }
  }

	render() {
    return (
      <div class={`ins-date-time-wrap ins-form-field-wrap ${this.hasError ? 'is-invalid' : ''}`}>
        { this.label ?
            <label htmlFor={this.name}
              class={`ins-form-label
                ${this.disabled ? 'disabled' : ''}`}>
              {this.label}
            </label>
        : ''}

        <input type="text" class="ins-form-field"
          name={this.name}
          placeholder={this.placeholder}
          value={this.value}
          onFocus={() => this.activateLabel()}
          onBlur={() => this.onblurHandler()}
          disabled={this.disabled || this.readonly} />

        {this.icon ? <i class={this.label ? this.icon + ' with-label' : this.icon}></i> : ''}

        { this.hasError ?
          <div class="ins-form-error">
            {this.errorMessage}
          </div>
        : ''}
      </div>
    )
	}
}
