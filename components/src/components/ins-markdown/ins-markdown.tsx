import { h, Component, Element, Prop, Event, EventEmitter } from "@stencil/core";
import marked from "marked";

@Component({ tag: "ins-markdown" })
export class InsMarkdown {
  @Element() insMarkdownEl: HTMLElement;
  @Event() didLoad: EventEmitter;
  @Prop() hasLoad: string;
  @Prop({ mutable: true }) label: string = "";
  @Prop({ mutable: true }) value: string = "";

  setMarkdownValue() {
    this.insMarkdownEl.querySelector('.markdown').innerHTML = marked(this.value);
  }

  componentDidLoad() {
    this.setMarkdownValue();
    this.didLoad.emit();
    if (this.hasLoad && window["Insites"]){
      let func = window["Insites"].methods[this.hasLoad];
      if (func) func(this.insMarkdownEl);
    }
  }

  componentDidUpdate() {
    this.setMarkdownValue();
  }

  render() {
    return (
      <div>
        <div class="ins-label">{this.label}</div>
        <div class="markdown"></div>
      </div>
    )
  }
}
