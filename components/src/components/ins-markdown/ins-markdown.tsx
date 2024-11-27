import { h, Component, Element, Prop, Event, EventEmitter } from "@stencil/core";
import marked from "marked";

@Component({ tag: "ins-markdown" })
export class InsMarkdown {
  @Element() insMarkdownEl: HTMLElement;
  @Event() didLoad: EventEmitter;
  @Prop() hasLoad: string;
  @Prop({ mutable: true }) label: string = "";
  @Prop({ mutable: true }) value: string = "";
  @Prop({ mutable: true }) replaceLineBreaks: boolean;
  @Prop({ mutable: true }) load: boolean = false;
  @Prop({ mutable: true }) checkLoad: boolean = false;

  setMarkdownValue() {
    this.insMarkdownEl.querySelector('.markdown').innerHTML = this.replaceLineBreaks ? marked.parse(this.value, {
      breaks: true,
      gfm: true
    }) : marked.parse(this.value);
  }

  componentDidLoad() {
    this.setMarkdownValue();
    if (this.checkLoad) this.load = true;
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