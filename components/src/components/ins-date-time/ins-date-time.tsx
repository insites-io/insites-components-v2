import { h, Component, Element, Prop, Event, EventEmitter, Method } from "@stencil/core";
import flatpickr from "flatpickr";

@Component({
  tag: 'ins-date-time',
  styleUrl: '../../../node_modules/flatpickr/dist/flatpickr.min.css'
})
export class InsDateTime {
  @Element() insDateTimeEl: HTMLElement;
  @Event() insInput: EventEmitter;
  @Event() insValueChange: EventEmitter;
  @Event() didLoad: EventEmitter;
  @Prop() hasLoad: string;

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
  @Prop({mutable:true}) minTime: string = "";
  @Prop({mutable:true}) maxTime: string = "";
  @Prop({mutable: true}) errorMessage: string = "";
  @Prop({ mutable: true }) icon: string = "";
  @Prop({ mutable: true }) mode: string = "";
  @Prop({ mutable: true }) inline: boolean = false;
  @Prop({mutable: true}) tooltip: string = "";

  pickerInstance: any;
  locFormat: any;
  locNoMeridiem: any;

  @Method()
  async setValue(value){
    this.value = value;
    this.insValueChange.emit(this.value);
  }

  @Method()
  async getValue(){
    return this.value
  }

  @Method()
  async formatDate(date){
    return this.pickerInstance.formatDate(date, this.locFormat);
  }

  componentWillLoad(){
    this.checkFormat();
  }

  componentDidLoad(){
    this.initInsDateTime();
    this.didLoad.emit();
    if (this.hasLoad && window["Insites"]){
      let func = window["Insites"].methods[this.hasLoad];
      if (func) func(this.insDateTimeEl);
    }
  }

  componentWillUpdate(){
    this.checkFormat();
  }

  componentDidUpdate(){
    this.updateInstance();
  }

  checkFormat(){
    this.locNoMeridiem = this.noMeridiem;

    if (this.mode === "timepicker"){
      this.locFormat = this.noMeridiem ? 'H:i' : 'h:i K';
    } else {
      this.locFormat = this.format
        ? this.format
        : `Y-m-d${this.checkTimeFormat()}`;
    }
  }

  checkTimeFormat(){
    return this.mode !== "datepicker"
      ? this.locNoMeridiem ? ' H:i' : ' h:i K'
      : "";
  }

  updateInstance(){
    let updatedFormat = this.updateFormat();

    this.pickerInstance.set("inline", this.inline);
    this.pickerInstance.set("enableTime", (this.mode !== "datepicker"));
    this.pickerInstance.set("noCalendar", (this.mode === "timepicker"));
    this.pickerInstance.set("dateFormat", updatedFormat);
    this.pickerInstance.set("time_24hr", this.locNoMeridiem);
    this.pickerInstance.set("minDate", this.minDate);
    this.pickerInstance.set("maxDate", this.maxDate);
    this.pickerInstance.set("minTime", this.minTime);
    this.pickerInstance.set("maxTime", this.maxTime);
    this.pickerInstance.set("onChange", this.insInputHandler.bind(this));
    this.pickerInstance.setDate(this.value);
  }

  initInsDateTime(){
    let updatedFormat = this.updateFormat();
    let inputEl = this.insDateTimeEl.querySelector('input');
    let wrapper = this.insDateTimeEl.querySelector('.ins-date-time-wrap') as any;

    this.pickerInstance = flatpickr(inputEl, {
      inline: this.inline,
      enableTime: (this.mode !== "datepicker"),
      noCalendar: (this.mode === "timepicker"),
      dateFormat: updatedFormat,
      time_24hr: this.locNoMeridiem,
      minDate: this.minDate,
      maxDate: this.maxDate,
      minTime: this.minTime,
      maxTime: this.maxTime,
      onChange: this.insInputHandler.bind(this),
      appendTo: wrapper,
      defaultDate: this.value,
      onReady() {
        if (this.mode !== "datepicker") this.showTimeInput = true;
      }
    });
  }

  insInputHandler(selected_dates, date_string) {
    this.value = date_string;
    this.insInput.emit({
      label: this.label,
      name: this.name,
      selected_dates,
      date_string
    });
    this.insValueChange.emit(date_string);
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
    let split = this.locFormat.split(" ");
    if (split[1] === "HH:mm"){
      this.locNoMeridiem = true;
    }
    if (this.mode === "timepicker") return this.locFormat;
    switch(split[0]){
      case "MM/DD/YYYY": return `m/d/Y${this.checkTimeFormat()}`;
      case "DD/MM/YYYY": return `d/m/Y${this.checkTimeFormat()}`;
      case "YYYY/MM/DD": return `Y/m/d${this.checkTimeFormat()}`;
      case "MM.DD.YYYY": return `m.d.Y${this.checkTimeFormat()}`;
      case "DD.MM.YYYY": return `d.m.Y${this.checkTimeFormat()}`;
      case "YYYY.MM.DD": return `Y.m.d${this.checkTimeFormat()}`;
      case "MM-DD-YYYY": return `m-d-Y${this.checkTimeFormat()}`;
      case "DD-MM-YYYY": return `d-m-Y${this.checkTimeFormat()}`;
      case "YYYY-MM-DD": return `Y-m-d${this.checkTimeFormat()}`;
      default: return this.locFormat
    }
  }

	render() {
    return (
      <div class={`ins-date-time-wrap ins-form-field-wrap
        ${this.disabled ? 'disabled' : ''}
        ${this.readonly ? 'readonly' : ''}
        ${this.hasError ? 'is-invalid' : ''}`}>

        { this.label || this.tooltip ?
          <label htmlFor={this.name}
            class={`ins-form-label
              ${this.disabled ? 'disabled' : ''}`}>
            {this.label}

            {this.tooltip
              ? <ins-input-tooltip content={this.tooltip}></ins-input-tooltip>
              : ''
            }
          </label>
        : ''}

        <div class="ins-date-time-wrap_input">
          <input type="text" class="ins-form-field"
            name={this.name}
            placeholder={this.placeholder}
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
