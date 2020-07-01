import { h, Component, Prop, Event, State, EventEmitter, Element } from "@stencil/core";

@Component({ tag: 'ins-textarea' })
export class InsTextarea {
  @Element() insTextareaEl: HTMLElement;

  @Event() oninput: EventEmitter;
  @Event() valueChange: EventEmitter;

  @Prop({mutable: true}) placeholder: string;
  @Prop({mutable: true}) name: string;
  @Prop({mutable: true}) label: string;
  @Prop({mutable: true}) value: string;
  @Prop({mutable: true}) errorMessage: string;
  @Prop({mutable: true}) maxlength: string = "";
  @Prop({mutable: true}) hasError: boolean = false;
  @Prop({mutable: true}) readonly: boolean = false;
  @Prop({mutable: true}) disabled: boolean = false;
  @Prop({mutable: true}) required: boolean = false;
  @State() activeLabel: boolean;

  onTextareaHandler(event){
    let x = event.which || event.keyCode;

    this.oninput.emit({
      value: event.target.value,
      keyCode: x
    });

    this.valueChange.emit(event.target.value);
  }

  activateLabel() {
    this.activeLabel = true;
  }

  deactivateLabel() {
    this.activeLabel = false;
  }

  componentDidLoad(){
    let textarea = this.insTextareaEl.querySelector('textarea');
    textarea.addEventListener('keyup', e => {this.onTextareaHandler(e)});
    textarea.addEventListener('focus', () => {this.activateLabel()});
    textarea.addEventListener('blur', () => {this.deactivateLabel()});
  }

  render(){
    return (
      <div class={`ins-textarea-wrap ins-form-field-wrap ${this.hasError ? 'is-invalid' : ''}`}>

        <div class="ins-ta">
          {this.label ? 
            <label class={`ins-form-label 
              ${this.disabled ? 'disabled' : ''} 
              ${this.activeLabel ? 'active' : ''}`}>
                
              {this.label}
            </label> 
          : '' }
          
          <textarea
            class="ins-textarea-field ins-form-field"
            name={this.name}
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
        </div>

      </div>
    )
  }
}
