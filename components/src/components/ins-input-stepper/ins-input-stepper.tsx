import { h, Component, Prop, Event, EventEmitter, Element } from "@stencil/core";

@Component({ tag: 'ins-input-stepper' })
export class InsStepper {
  @Element() el: HTMLElement;
  @Event() insBlur: EventEmitter;
  // @Event() insInput: EventEmitter;
  @Event() insValueChange: EventEmitter;
  @Event() didLoad: EventEmitter;
  @Prop() hasLoad: string;

  @Prop({ mutable: true }) label: string = "";
  @Prop({ mutable: true }) name: string = "";

  @Prop({ mutable: true }) step: string = "1";
  @Prop({ mutable: true }) min: string;
  @Prop({ mutable: true }) max: string;
  @Prop({ mutable: true }) value: string;

  @Prop({ mutable: true }) required: boolean = false;
  @Prop({ mutable: true }) disabled: boolean = false;
  @Prop({ mutable: true }) readonly: boolean = false;

  @Prop({ mutable: true }) hasError: boolean = false;
  @Prop({ mutable: true }) errorMessage: string = "";

  labelEl; inputEl; active;

  componentWillLoad(){
    console.log('componentWillLoad');
    this.value = this.validateInput(this.value);
  }

  componentDidLoad(){
    this.addClickOutside();
    this.bindEls();
  }

  componentWillUpdate(){
    this.value = this.validateInput(this.value);
  }

  componentDidUpdate(){
    this.bindEls();
  }

  bindEls(){
    this.labelEl = this.el.querySelector('.ins-form-label');
    this.inputEl = this.el.querySelector('.ins-input-stepper_input-wrap');
  }

  stepDown(){
    if (this.readonly || this.disabled) return false;
    let diff = Number(this.value) - Number(this.step);
    this.value = this.validateInput(diff);
  }

  validateInput(input){
    let num = Number(input);
    if (!num && num !== 0) return "0";
    if (this.min && num < Number(this.min)) return this.min;
    if (this.max && num > Number(this.max)) return this.max;
    return input;
  }

  stepUp(){
    if (this.readonly || this.disabled) return false;
    let sum = Number(this.value) + Number(this.step);
    this.value = this.validateInput(sum);
  }

  activateLabel(){
    if (!this.readonly && !this.disabled){
      this.active = true;
      if (this.labelEl) this.labelEl.classList.add('active');
      if (this.inputEl) this.inputEl.classList.add('active');
    }
  }

  deactivateLabel(){
    this.active = false;
    if (this.labelEl) this.labelEl.classList.remove('active');
    if (this.inputEl) this.inputEl.classList.remove('active');
  }

  // onInputHandler(event){
  //   let x = event.which || event.keyCode;
  //   this.insInput.emit({
  //     value: event.target.value,
  //     validated: this.value,
  //     keyCode: x
  //   });
  // }

  insBlurHandler(event){
    console.log('blurred')
    let keyCode = event.which || event.keyCode;
    let value = this.validateInput(event.target.value);
    event.target.value = value;
    this.insBlur.emit({ value, keyCode });
    this.deactivateLabel();
    this.value = value;
  }

  addClickOutside(){
    window.addEventListener("click", e => {
      let target = e.target as any;
      let closest = target.closest("ins-input-stepper")

      if (closest !== this.el) {
        this.deactivateLabel();
      }
    });
  }

  render() {
    return (
      <div class={`ins-input-stepper ins-form-field-wrap
        ${this.hasError ? 'is-invalid' : ''}
        ${this.readonly ? 'readonly': ''}
        ${this.disabled ? 'disabled': ''}`}>

        { this.label ?
          <label htmlFor={this.name}
            class={`ins-form-label
              ${this.disabled ? 'disabled' : ''}`}>

            {this.label}
          </label>
        : ''}

        <div class="ins-input-stepper_input-wrap"
          onClick={() => this.activateLabel()}>

          <div class="ins-input-stepper_minus"
            onClick={() => this.stepDown()}>
            <i class="icon-minus"></i>
          </div>

          <div class="ins-input-stepper_input">
            <input type="number"
              step={this.step}
              min={this.min}
              max={this.max}
              name={this.name}
              value={this.value}
              required={this.required}
              disabled={this.disabled}
              readonly={this.readonly}
              onFocus={() => this.activateLabel()}
              onBlur={e => this.insBlurHandler(e)}
              // onKeyUp={e => this.onInputHandler(e)}
              // onInput={e => this.inputChanged(e)}
/>
          </div>

          <div class="ins-input-stepper_plus"
            onClick={() => this.stepUp()}>
            <i class="icon-plus"></i>
          </div>

        </div>

        { this.hasError ?
          <div class="ins-form-error">
            {this.errorMessage}
          </div>
        : ''}
      </div>
    );
  }
}
