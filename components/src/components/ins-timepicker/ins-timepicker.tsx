import { h, Component, Prop, Element, Event, EventEmitter, State } from "@stencil/core";

declare var $;

@Component({ tag: 'ins-timepicker' })

export class insTimePicker {
  @Element() insTimePickerEl: HTMLElement;

  @Event() oninput: EventEmitter;
  @Event() onblur: EventEmitter;
  @Event() valueChange: EventEmitter;


  @Prop({mutable: true}) fieldId: string = "";
  @Prop({mutable: true}) errorMessage: string = "";
  @Prop({mutable: true}) required: boolean = false;
  @Prop({mutable: true}) icon: string = "";
  @Prop({mutable: true}) name: string;
  @Prop({mutable: true}) value: any;
  @Prop({mutable: true}) label: string;
  @Prop({mutable: true}) format: string = "h:i A";
  @Prop({mutable: true}) placeholder: string = "h:i A";
  @Prop({mutable: true}) disabled: boolean = false;
  @Prop({mutable: true}) readonly: boolean = false;
  @Prop({mutable: true}) hasError: boolean = false;

  @State() labelActive: boolean = false;

  componentDidLoad(){
    this.setInitialTime();
  }

  eventHandler(e, hasError, errorMessage){
    this.hasError = this.required ? true : hasError;
    this.errorMessage = this.required ? "Time is required" : errorMessage;
    this.broadcastEvent(e.target.value);
  }

  onBlurHandler(e){
    this.labelActive = false;
    if (this.required && e.target.value === ""
      && !this.disabled && !this.readonly){
      this.hasError = true;
      this.errorMessage = `${this.label ? this.label : 'Time'} is required`;
      this.broadcastEvent("");
    } else {
      this.hasError = false;
      this.errorMessage = "";
    }
  }

  broadcastEvent(value){
    this.oninput.emit({
      hasError: this.hasError,
      errorMessage: this.errorMessage,
      value
    });

    this.valueChange.emit(value);
  }

  setInitialTime(){
    let insInputEl = this.insTimePickerEl.querySelector('input');
    let optionsWrapEl = this.insTimePickerEl.querySelector('.ins-timepicker_options-wrap');
    let options: any = {
      scrollDefault : 'now',
      timeFormat: this.format,
      appendTo: $(optionsWrapEl)
    }

    $(insInputEl)
      .timepicker(options)

      .on('timeFormatError', e => {
        this.eventHandler(e, true, "Invalid Time");
      })

      .on('changeTime', e => {
        this.eventHandler(e, false, "");
      });

    if (this.value) {
      $(insInputEl).timepicker('setTime', this.value);
    }
  }
  activateLabel(){
    this.labelActive = true;
  }

	render() {
    return (
      <div class={`ins-timepicker ${this.hasError ? 'is-invalid' : ''}`}>

        { this.label ?
            <label htmlFor={this.name}
              class={`
                ${this.disabled ? 'disabled' : ''}
                ${this.labelActive ? 'active' : ''}
              `}>

              {this.label}
            </label>
        : ''}
        <div class="ins-timepicker-wrap">
          <input type="text" class="ins-timepicker_time" placeholder={this.placeholder}
            name={this.name}
            onBlur={ e => this.onBlurHandler(e) }
            onFocus={() => this.activateLabel() }
            disabled={this.disabled || this.readonly}/>

          { this.icon
            ? <i class={this.label ? this.icon + ' with-label' : this.icon}></i>
            : ''}
          </div>

        <div class={ `${this.hasError ? 'has-error' :''} ins-timepicker_options-wrap`}></div>

        { this.hasError ?
          <div class="ins-form-error">
            {this.errorMessage}
          </div>
        : ''}
      </div>
    );
	}
}
