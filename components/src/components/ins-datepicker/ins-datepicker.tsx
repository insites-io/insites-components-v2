import { h, Component, Element, Prop, Event, EventEmitter } from "@stencil/core";

@Component({ tag: "ins-datepicker" })
export class InsDatePicker {
  @Element() insDatepickerEl: HTMLElement;
  @Event() insInput: EventEmitter;
  @Event() insValueChange: EventEmitter;
  @Event() didLoad: EventEmitter;
  @Prop() hasLoad: string;

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

  componentDidLoad(){
    this.didLoad.emit();
    if (this.hasLoad && window["Insites"]){
      let func = window["Insites"].methods[this.hasLoad];
      if (func) func(this.insDatepickerEl);
    }
  }

	render() {
    return (
    <ins-date-time mode="datepicker"
      disabled={this.disabled}
      readonly={this.readonly}
      hasError={this.hasError}
      label={this.label}
      name={this.name}
      format={this.format}
      value={this.value}
      placeholder={this.placeholder}
      min-date={this.minDate}
      max-date={this.maxDate}
      icon={this.icon}
      error-message={this.errorMessage}
      onInsInput={e => this.insInput.emit(e.detail)}
      onInsValueChange={e => this.insValueChange.emit(e.detail)}>
    </ins-date-time>
    )
	}
}
