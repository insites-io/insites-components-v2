import { h, Component, Prop, Event, EventEmitter, Element } from "@stencil/core";
import rangeSlider from "rangeslider-pure";
// plugin API reference https://www.npmjs.com/package/rangeslider-pure

@Component({
  tag: 'ins-input-slider',
  styleUrls: ['../../../node_modules/rangeslider-pure/dist/range-slider.css']
})
export class InsInputSlider {
  @Element() el: HTMLElement;

  @Event() insSlide: EventEmitter;
  @Event() insSlideStart: EventEmitter;
  @Event() insSlideEnd: EventEmitter;
  @Event() insValueChange: EventEmitter;
  @Event() didLoad: EventEmitter;
  @Prop() hasLoad: string;

  @Prop({mutable: true}) name: string;
  @Prop({mutable: true}) label: string;
  @Prop({mutable: true}) value: any = 0;
  @Prop({mutable: true}) position: string = "right";

  @Prop({mutable: true}) min: number = 0;
  @Prop({mutable: true}) max: number;
  @Prop({mutable: true}) step: number = 1;

  @Prop({mutable: true}) errorMessage: string;
  @Prop({mutable: true}) hasError: boolean = false;
  @Prop({mutable: true}) disabled: boolean = false;
  @Prop({mutable: true}) sliderOnly: boolean = false;

  inputEl: any;
  tooltip: any;
  sliderEl: any;
  labelInput: any;

  componentDidLoad(){
    this.initSlider();
    this.initTooltip();
    this.initLabelInput();
    this.didLoad.emit();
    if (this.hasLoad && window["Insites"]){
      let func = window["Insites"].methods[this.hasLoad];
      if (func) func(this.el);
    }
  }

  componentDidUpdate(){
    this.triggerUpdate();
  }

  emitAction(where?){
    let prop = `insSlide${where || ""}`;
    this[prop].emit({
      action: prop,
      label: this.label,
      value: this.value
    });
  }

  triggerUpdate(){
    this.sliderEl.update({
      min : this.min,
      max : this.max,
      step : this.step,
      value : this.value
    }, true);
  }

  initSlider(){
    this.inputEl = this.el.querySelector('input[type="range"]');
    this.sliderEl = new rangeSlider(this.inputEl, {
      onSlideStart: () => {
        this.emitAction('Start');
      },
      onSlide: value => {
        this.tooltip.textContent = value;
        this.emitAction()
      },
      onSlideEnd: value => {
        this.value = value;
        this.emitAction('End');
        this.insValueChange.emit(this.value)
      }
    });
  }

  initTooltip(){
    const handleEl = this.sliderEl.handle;
    this.tooltip = document.createElement('div');
    this.tooltip.classList.add('ins-input-slider_tooltip');
    this.tooltip.textContent = this.sliderEl.value;
    handleEl.appendChild(this.tooltip);
  }

  initLabelInput(){
    if (this.sliderOnly) return;
    this.labelInput = this.el.querySelector('label input[type="number"]');
    this.labelInput.addEventListener('change', e => {
      this.value = e.target.value;
      this.triggerUpdate();
      this.insValueChange.emit(this.value)
    })

  }

  renderLabelInput(){
    return (
      <label class={`ins-input-slider_label
         ${this.label ? "" : "no-label"}`}>

        {this.label}

        <input type="number" class="ins-input-slider_label-input"
          min={this.min} max={this.max} step={this.step}
          value={this.value || this.min} disabled={this.disabled} />
      </label>
    )
  }

  render(){
    if (!this.max) return(<div>Please set the max attribute to render ins-input-slider</div>)

    return (
      <div class={`ins-input-slider ${this.position}
        ${this.disabled ? 'disabled' : ''}
        ${this.sliderOnly ? 'slider-only' : ''}`}>

        {(this.position === "left" || this.position === "top") && !this.sliderOnly
          ? this.renderLabelInput()
          : "" }

        { this.sliderOnly ? "" : <span class="ins-input-slider_min">{ this.min }</span> }

        <input type="range"
          min={this.min} max={this.max} step={this.step}
          disabled={this.disabled} name={this.name}
          value={this.value || this.min} />

        { this.sliderOnly ? "" : <span class="ins-input-slider_max">{ this.max }</span> }

        {(this.position === "right" || this.position === "bottom") && !this.sliderOnly
          ? this.renderLabelInput()
          : "" }

        {this.hasError ?
          <div class="ins-form-error">
            {this.errorMessage}
          </div>
        : ''}
      </div>
    )
  }
}
