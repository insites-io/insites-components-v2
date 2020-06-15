import { h, Component, Prop, Element } from "@stencil/core";

@Component({ tag: 'ins-progress-bar' })
export class InsProgressBar {
  @Element() el: HTMLElement;

  @Prop({mutable: true}) text: string = "";
  @Prop({mutable: true}) progress: number = 0;
  @Prop({mutable: true}) total: number = 1;
  @Prop({mutable: true}) hidden: boolean = false;

  progressEl: any;

  componentDidLoad(){
    this.progressEl = this.el.querySelector('.progress')
    this.calculateProgress()
  }

  componentDidUpdate(){
    this.calculateProgress()
  }

  calculateProgress(){
    let totalWidth = (this.progress / this.total) * 100;
    this.progressEl.style.width = `${totalWidth}%`;
  }

  render() {
    return (
      <div class={`ins-progress-bar ${this.hidden ? "hidden":""}`}>

        <div class="text">{this.text}</div>
        <div class="progress"></div>

      </div>
    );
  }
}
