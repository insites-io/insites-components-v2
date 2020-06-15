import { h, Component, Element, Prop } from "@stencil/core";
import marked from "marked";

@Component({ tag: "ins-markdown" })
export class InsMarkdown {
  @Element() insMarkdownEl: HTMLElement;
  @Prop({ mutable: true }) label: string = "";
  @Prop({ mutable: true }) value: string = "";

  setMarkdownValue() {
    this.insMarkdownEl.querySelector('.markdown').innerHTML = marked(this.value);
  }

  componentDidLoad() {
    this.setMarkdownValue();
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
