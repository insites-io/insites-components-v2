import { h, Component, Element, Method, Prop, Listen, Event, EventEmitter } from "@stencil/core";

@Component({ tag: 'ins-steps' })
export class InsSteps {
  @Element() el: HTMLElement;
  @Event() insClick: EventEmitter;
  @Prop({ mutable: true }) indicator: string = "";
  @Prop({ mutable: true }) inline: boolean = false;
  @Prop({ mutable: true }) clickable: boolean = false;

  steps; current = 0;

  @Listen('insStepClick')
  insStepClicked(e){
    if (!this.clickable) return false;

    let step = e.target;
    for (let i = 0; i < this.steps.length; i++){
      this.steps[i].active = false;
      if (this.steps[i] === step){
        this.emitEvent(step, i);
      }
    }
  }

  emitEvent(currentStep, i){
    let previousStep = this.steps[this.current];
    this.current = i;
    this.steps[i].active = true;
    this.insClick.emit({
      start: i === 0,
      end: i === (this.steps.length - 1),
      previousStep, currentStep
    });
  }

  setIndicators(){
    if (this.indicator && this.indicator === "number"){
      for (let i = 0; i < this.steps.length; i++){
        if (!this.steps[i].icon)
          this.steps[i].indicator = i + 1;
      }
    }
  }

  setDefault(){
    let hasActive = false;
    for (let i = 0; i < this.steps.length; i++){
      if (this.steps[i].active){
        hasActive = true;
        break;
      }
    }

    if (!hasActive) this.steps[0].active = true;
  }

  componentDidLoad(){
    this.steps = this.el.querySelectorAll('ins-step');
    this.setIndicators();
    this.setDefault();
  }

  @Method()
  async setStep(i){
    for (let l = 0; l < this.steps.length; l++){
      this.steps[l].active = false;
    }

    let previousStep = this.steps[this.current];
    this.current = i - 1;
    this.steps[this.current].active = true;

    return { previousStep, currentStep: this.steps[this.current] }
  }

  @Method()
  async finish(){
    for (let l = 0; l < this.steps.length; l++){
      this.steps[l].complete = true;
      this.steps[l].active = false;
    }
    return true;
  }

  @Method()
  async next(){
    let sum = this.current + 1;
    let end = (sum + 1) === this.steps.length;
    let previousStep = this.steps[this.current];
    previousStep.complete = true;
    previousStep.active = false;

    if (sum >= this.steps.length) {
      return {
        end,
        previousStep: this.steps[this.current - 1],
        currentStep: previousStep,
      }
    }

    this.current = sum;
    this.steps[sum].active = true;

    return {
      end, previousStep, currentStep: this.steps[sum]
    }
  }

  @Method()
  async prev(){
    let diff = this.current - 1;
    if (diff < 0) return {
      start: true,
      previousStep: this.steps[this.current + 1],
      currentStep: this.steps[this.current]
    };

    let previousStep = this.steps[this.current];
    previousStep.active = false;

    this.current = diff;
    this.steps[diff].active = true;

    return {
      start: diff === 0,
      previousStep,
      currentStep: this.steps[diff]
    }
  }

  @Method()
  async getAllSteps(){
    return this.steps;
  }

  @Method()
  async reset(){
    let total = this.steps.length;
    for (let i = 0; i < total; i ++){
      this.steps[i].complete = false;
      this.steps[i].active = false;
      this.steps[i].hasError = false;
    }
    this.steps[0].active = true;
    return true;
  }

  render() {
    return (
      <div class={`ins-steps
        ${this.inline ? "ins-steps_inline" : ""}`}>
        <slot />
      </div>
    );
  }
}
