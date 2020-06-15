import { h, Component, Prop, Element, Event, EventEmitter } from "@stencil/core";

@Component({ tag: 'ins-checkbox-card' })
export class InsCheckboxCard {
  @Element() insCardEl: HTMLElement;
  @Event() onClickInsCheckboxCard: EventEmitter;
  @Event() valueChange: EventEmitter;

  @Prop({mutable:true}) noPadding: boolean;
  @Prop({mutable:true}) tabOrder: string = '0';
  @Prop({mutable:true}) selected: boolean;
  @Prop({mutable:true}) disabled: boolean;
  @Prop({mutable:true}) selectedColor: string;
  @Prop({mutable:true}) value: string;
  @Prop({mutable:true}) label: string;
  @Prop({mutable:true}) name: string;

  addColorStyles(){
    let insCardWrap = this.insCardEl.querySelector('.ins-checkbox-card-wrap');
    if (this.selected && this.selectedColor[0] === '#'){

      if (insCardWrap){
        insCardWrap.setAttribute('style', `border-color:${this.selectedColor}`);

        let selectedWrap = insCardWrap.querySelector('.selected-wrap');
        selectedWrap.setAttribute('style', `background-color:${this.selectedColor}`);
      }
    } else {
      insCardWrap.removeAttribute('style');
    }
  }

  onClickInsCheckboxCardHandler(){
    this.onClickInsCheckboxCard.emit({
      label: this.label,
      value: this.value
    });
    this.valueChange.emit(this.value);
  }

  keyPressHandler(e){
    if (e.keyCode === 13){
      this.onClickInsCheckboxCardHandler()
    }
  }

  componentDidLoad(){
    this.addColorStyles()
  }

  componentDidUpdate(){
    this.addColorStyles()
  }

  render() {
    return (
      <div class={`ins-checkbox-card-wrap
        ${this.noPadding ? 'no-padding' : ''}
        ${this.disabled ? 'disabled' : ''}
        ${this.selected ? 'selected':''}
        ${this.selectedColor ? this.selectedColor : ''}`}
        tabindex={this.tabOrder}
        onClick={() => this.onClickInsCheckboxCardHandler()}
        onKeyPress={e => this.keyPressHandler(e)}>
        {this.selected ? <div class="icon-check-2 selected-wrap"></div>: ''}

        <slot />

        <input type="checkbox" class="ins-checkbox-card-input"
          name={this.name} value={this.value} />
      </div>
    )
  }
}
