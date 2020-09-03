import { h, Component, Element, Method, Prop } from "@stencil/core";

@Component({ tag: 'ins-steps' })
export class InsSteps {
  @Element() el: HTMLElement;
  @Prop({ mutable: true }) indicator: string = "";
  @Prop({ mutable: true }) inline: boolean = false;

  steps; current = 0;

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

  moveStep(){
    this.steps
  }

  @Method()
  async setStep(i){
    for (let l = 0; l < this.steps.length; l++){
      this.steps[l].active = false;
    }

    this.current = i - 1;
    this.steps[this.current].active = true;
    return { currentStep: this.steps[this.current] }
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
    let previousStep = this.steps[this.current];
    previousStep.complete = true;
    previousStep.active = false;

    if (sum >= this.steps.length) {
      return { currentStep: this.steps[sum] };
    }

    this.current = sum;
    this.steps[sum].active = true;

    return {
      previousStep, currentStep: this.steps[sum]
    }
  }

  @Method()
  async prev(){
    let diff = this.current - 1;
    if (diff < 0) return false;

    let previousStep = this.steps[this.current];
    previousStep.active = false;

    this.current = diff;
    this.steps[diff].active = true;

    return {
      previousStep, currentStep: this.steps[diff]
    }
  }

  @Method()
  async getAllSteps(){
    return Array.from(this.el.querySelectorAll('ins-step'));
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
