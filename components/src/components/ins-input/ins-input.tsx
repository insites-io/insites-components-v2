import { h, Component, Prop, Event, EventEmitter, Element } from "@stencil/core";

@Component({ tag: 'ins-input' })
export class InsInput {
  @Element() el: HTMLElement;
  @Event() insInput: EventEmitter;
  @Event() insBlur: EventEmitter;
  @Event() insIconClick: EventEmitter;
  @Event() insValueChange: EventEmitter;
  @Event() didLoad: EventEmitter;
  @Prop() hasLoad: string;

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
  @Prop({mutable: true}) iconEvent: boolean = false;
  @Prop({mutable: true}) iconTitle: string = "";
  @Prop({mutable: true}) disabled: boolean = false;
  @Prop({mutable: true}) readonly: boolean = false;
  @Prop({mutable: true}) hasError: boolean = false;
  @Prop({mutable: true}) activated: boolean = false;

  componentDidLoad(){
    this.didLoad.emit();
    if (this.hasLoad && window["Insites"]){
      let func = window["Insites"].methods[this.hasLoad];
      if (func) func(this.el);
    }
  }

  onInputHandler(event){
    let x = event.which || event.keyCode;
    this.insInput.emit({
      value: event.target.value,
      keyCode: x
    });
  }

  insBlurHandler(event){
    let x = event.which || event.keyCode;
    this.insBlur.emit({
      value: event.target.value,
      keyCode: x
    });
    this.deactivateLabel();
  }

  inputChanged(ev: any) {
    let val = ev.target && ev.target.value;
    this.value = val;
    this.insValueChange.emit(this.value);
  }

  onIconClickHandler() {
    if(this.iconEvent) {
      this.insIconClick.emit({
          target: this.el,
          value: this.value
      });
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
      <div class={`${this.hasError ? 'is-invalid' : ''} ins-input-wrap ins-form-field-wrap`}>
        { this.label ?
          <label htmlFor={this.name}
            class={`ins-form-label
              ${this.disabled ? 'disabled' : ''}
              ${this.activated ? 'active':''}`}>

            {this.label}
          </label>
        : ''}

        <div class="input-wrap">

          <input class="ins-form-field"
            id={this.fieldId ? this.fieldId : null}
            type={this.field}
            name={this.name}
            placeholder={this.placeholder}
            value={this.value}
            required={this.required}
            onKeyUp={e => this.onInputHandler(e)}
            onInput={this.inputChanged.bind(this)}
            onFocus={() => this.activateLabel()}
            onBlur={e => this.insBlurHandler(e)}
            disabled={this.disabled}
            maxlength={this.maxlength}
            readonly={this.readonly}
            min={this.min}
            max={this.max}
            step={this.step} />

          {this.icon ?
            <i title={this.iconTitle}
              onClick={() => this.onIconClickHandler()}
              class={`icon-wrap
                ${this.label ? this.icon + ' with-label' : this.icon}
                ${this.iconEvent ? 'hover' :''}`}>
            </i>
          : ''}

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
