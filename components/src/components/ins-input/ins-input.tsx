import { h, Component, Prop, Event, EventEmitter, Element, Method } from "@stencil/core";

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

  @Prop({mutable: true}) unitRight: string = "";
  @Prop({mutable: true}) unitLeft: string = "";

  @Prop({mutable: true}) tooltip: string = "";

  invalidHexColor: string = "";

  @Method()
  async setValue(value){
    this.value = value;
    this.insValueChange.emit(this.value);
  }

  @Method()
  async getValue(){
    return this.value;
  }

  componentDidLoad(){
    this.adjustInputPadding();
    this.didLoad.emit();
    if (this.hasLoad && window["Insites"]){
      let func = window["Insites"].methods[this.hasLoad];
      if (func) func(this.el);
    }
  }

  adjustInputPadding(){
    let input = this.el.querySelector('input');
    if (this.unitRight){
      let rightEl = this.el.querySelector('.unit-right') as any;
      let padding = rightEl.offsetWidth + 20;
      if (this.icon) padding = padding + 20;
      input.style.paddingRight = padding + 'px';
    }

    if (this.unitLeft){
      let leftEl = this.el.querySelector('.unit-left') as any;
      let padding = leftEl.offsetWidth + 16;
      input.style.paddingLeft = padding + 'px';
    }
  }

  onInputHandler(event){
    let value = event.target.value;
    let keyCode = event.which || event.keyCode;
    this.insInput.emit({ value, keyCode });
  }

  insBlurHandler(event){
    const value = event.target.value;
    const keyCode = event.which || event.keyCode;

    this.insBlur.emit({ value, keyCode });
    this.deactivateLabel();

    if (this.field === 'color') this.validateHexColor(value);
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

  colorHandler(e){
    this.validateHexColor(e.target.value);
    this.onInputHandler(e);
    this.inputChanged(e);
  }

  validateHexColor(color){
    if (!color) return this.invalidHexColor = "";

    const valid = color.match(/^#[0-9A-F]{6}$/i);
    if (valid) this.invalidHexColor = "";
    else this.invalidHexColor = "Invalid hex color.";
  }

  render(){
    return (
      <div class={`ins-input-wrap ins-form-field-wrap
        ${this.hasError || this.invalidHexColor ? 'is-invalid' : ''}
        ${this.icon ? "has-icon":""}
        ${this.field === 'color' ? "has-color":""}
        ${this.unitLeft ? "has-unit-left":""}
        ${this.unitRight ? "has-unit-right":""}`}>

        { this.label || this.tooltip?
          <label htmlFor={this.name}
            class={`ins-form-label
              ${this.disabled ? 'disabled' : ''}
              ${this.activated ? 'active':''}`}>

            {this.label}

            {this.tooltip
              ? <ins-input-tooltip content={this.tooltip}></ins-input-tooltip>
              : ''
            }

          </label>
        : ''}

        <div class="input-wrap">

          {this.unitLeft
            ? <div class="unit-left">
                { this.unitLeft }
              </div>
            : "" }

          <input class="ins-form-field"
            id={this.fieldId ? this.fieldId : null}
            type={this.field !== 'color' ? this.field : 'text'}
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

          {this.unitRight
            ? <div class="unit-right">
                { this.unitRight }
              </div>
            : "" }

          {this.icon ?
            <i title={this.iconTitle}
              onClick={() => this.onIconClickHandler()}
              class={`icon-wrap
                ${this.label ? this.icon + ' with-label' : this.icon}
                ${this.iconEvent ? 'hover' :''}`}>
            </i>
          : ''}

          {this.field === 'color' ?
            <input type="color" 
              class="ins-form-field color"
              value={this.value}
              disabled={this.disabled || this.readonly}
              onInput={e => this.colorHandler(e)} 
            />
          : ''}

        </div>

        { this.hasError || this.invalidHexColor ?
          <div class="ins-form-error">
            { this.invalidHexColor ? this.invalidHexColor : this.errorMessage }
          </div>
        : ''}

      </div>
    )
  }
}
