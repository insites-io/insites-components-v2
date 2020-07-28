import { h, Component, Element, Prop, Event, EventEmitter } from "@stencil/core";

@Component({ tag: 'ins-timepicker' })
export class InsTimepicker {

  @Element() insTimepickerEl: HTMLElement;
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
  @Prop({mutable:true}) value: string = "";
  @Prop({mutable:true}) placeholder: string = "";
  @Prop({mutable:true}) minTime: string = "";
  @Prop({mutable:true}) maxTime: string = "";
  @Prop({mutable: true}) errorMessage: string = "";
  @Prop({ mutable: true }) icon: string = "";

  componentDidLoad(){
    this.didLoad.emit();
    if (this.hasLoad && window["Insites"]){
      let func = window["Insites"].methods[this.hasLoad];
      if (func) func(this.insTimepickerEl);
    }
  }

	render() {
    return (
    <ins-date-time mode="timepicker"
      disabled={this.disabled}
      readonly={this.readonly}
      hasError={this.hasError}
      label={this.label}
      name={this.name}
      value={this.value}
      placeholder={this.placeholder}
      min-time={this.minTime}
      max-time={this.maxTime}
      icon={this.icon}
      error-message={this.errorMessage}
      onInsInput={e => this.insInput.emit(e.detail)}
      onInsValueChange={e => this.insValueChange.emit(e.detail)}>
    </ins-date-time>
    )
	}
}
