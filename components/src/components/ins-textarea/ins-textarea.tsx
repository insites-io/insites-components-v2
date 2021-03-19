import { h, Component, Prop, Event, State, EventEmitter, Element } from "@stencil/core";

@Component({ tag: 'ins-textarea' })
export class InsTextarea {
  @Element() insTextareaEl: HTMLElement;

  @Event() insInput: EventEmitter;
  @Event() insValueChange: EventEmitter;
  @Event() didLoad: EventEmitter;
  @Prop() hasLoad: string;

  @Prop({mutable: true}) placeholder: string;
  @Prop({mutable: true}) name: string;
  @Prop({mutable: true}) label: string;
  @Prop({mutable: true}) value: string;
  @Prop({mutable: true}) errorMessage: string;
  @Prop({mutable: true}) maxlength: string = "";
  @Prop({mutable: true}) counter: string = "";
  @Prop({mutable: true}) hasError: boolean = false;
  @Prop({mutable: true}) readonly: boolean = false;
  @Prop({mutable: true}) disabled: boolean = false;
  @Prop({mutable: true}) required: boolean = false;
  @Prop({mutable: true}) tooltip: string = "";

  @State() activeLabel: boolean;
  @State() charCount: string = "0";

  onTextareaHandler(event){
    let x = event.which || event.keyCode;
    this.value = event.target.value;
    
    this.insInput.emit({
      value: event.target.value,
      keyCode: x
    });

    this.insValueChange.emit(event.target.value);
  }

  activateLabel() {
    this.activeLabel = true;
  }

  deactivateLabel() {
    this.activeLabel = false;
  }

  charCounter(){
    let current = this.value.length;
    let max = this.maxlength ? `/ ${this.maxlength}` : "";
    return `${current}${max}`;
  }

  componentWillUpdate(){
    if (this.counter) this.charCount = this.charCounter();
  }

  componentWillLoad(){
    if (this.counter){

      let max = +this.maxlength;
      if (this.counter === "decreasing" && max){
        this.charCounter = () => {
          let left = max - (this.value ? this.value.length : 0)
          return `${left} characters left`;
        }
      }

      this.charCount = this.charCounter();
    }
  }


  componentDidLoad(){
    this.didLoad.emit();
    if (this.hasLoad && window["Insites"]){
      let func = window["Insites"].methods[this.hasLoad];
      if (func) func(this.insTextareaEl);
    }
  }

  render(){
    return (
      <div class={`ins-textarea-wrap ins-form-field-wrap ${this.hasError ? 'is-invalid' : ''}`}>

        <div class={`ins-ta ${ this.counter ? 'with-counter' : ''}`}>
          {this.label || this.tooltip ?
            <label class={`ins-form-label
              ${this.disabled ? 'disabled' : ''}
              ${this.activeLabel ? 'active' : ''}`}>

              {this.label}

              {this.tooltip
                ? <ins-input-tooltip content={this.tooltip}></ins-input-tooltip>
                : ''
              }
            </label>
          : '' }

          <textarea
            class="ins-textarea-field ins-form-field"
            name={this.name}
            onKeyUp={e => this.onTextareaHandler(e)}
            onFocus={() => this.activateLabel()}
            onBlur={() => this.deactivateLabel()}
            placeholder={this.placeholder}
            value={this.value}
            disabled={this.disabled}
            readonly={this.readonly}
            required={this.required}
            maxlength={this.maxlength}>
          </textarea>

          {this.hasError ?
            <div class="ins-form-error">
              {this.errorMessage}
            </div>
          : ''}

          {this.counter ?
            <div class="ins-textarea-counter">
              { this.charCount }
            </div>
          : ''}

        </div>

      </div>
    )
  }
}
