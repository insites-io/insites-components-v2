import { h, Component, Element, Prop, Method, Event, EventEmitter } from "@stencil/core";
import "../../assets/js/simplemde.min.js";

@Component({
  tag: "ins-markdown-editor",
  styleUrl: "../../../node_modules/simplemde/dist/simplemde.min.css"
})
export class InsMarkdownEditor {
  @Element() insMarkdownEditorEl: HTMLElement;
  @Event() insValueChange: EventEmitter;
  @Event() didLoad: EventEmitter;
  @Prop() hasLoad: string;

  editor: any;

  @Prop({ mutable: true }) label: string = "";
  @Prop({ mutable: true }) value: string = "";
  @Prop({ mutable: true }) name: string = "";
  @Prop({ mutable: true }) required: boolean;
  @Prop({ mutable: true }) readonly: boolean;
  @Prop({ mutable: true }) errorMessage: string = "";
  @Prop({ mutable: true }) hasError: boolean;
  @Prop({mutable: true}) tooltip: string = "";

  @Method()
  async val() {
    return this.editor.value();
  }

  @Method()
  async reset(){
     this.value = "";
     this.editor.value("");
   }

  @Method()
  async setValue(value) {
    this.value = value;
    this.editor.value(value);
  }

  activeState() {
    this.insMarkdownEditorEl.querySelector('label').classList.add('active');
    this.insMarkdownEditorEl.querySelector('.ins-markdown-editor').classList.add('active');
  }

  inactiveState() {
    this.insMarkdownEditorEl.querySelector('label').classList.remove('active');
    this.insMarkdownEditorEl.querySelector('.ins-markdown-editor').classList.remove('active');
  }

  readonlyState() {
    this.insMarkdownEditorEl.querySelector('label').classList.add('active');
    this.insMarkdownEditorEl.querySelector('.ins-markdown-editor').classList.add('active');
  }

  eventListeners() {
    this.editor.codemirror.on("focus", () => {
      this.activeState();
    });

    this.editor.codemirror.on("blur", () => {
      this.inactiveState();
    });

    this.editor.codemirror.on("change", () => {
      this.insValueChange.emit(this.editor.value());
    });
  }

  // componentDidUpdate(){
  //   this.editor.value(this.value);
  // }

  setHiddenIcons() {
    if (this.readonly) {
      return ['bold', 'italic', 'heading', 'quote', 'image', 'ordered-list', 'unordered-list', 'guide', 'link'];
    } else {
      return ['guide'];
    }
  }

  componentDidLoad() {
    this.editor = new window["SimpleMDE"]({
      element: this.insMarkdownEditorEl.querySelector('.markdown-editor'),
      spellChecker: false,
      status: false,
      hideIcons: this.setHiddenIcons()
    });

    this.eventListeners();
    this.editor.codemirror.options.readOnly = this.readonly;
    if (this.value) {
      this.editor.value(this.value);
    }

    this.didLoad.emit();
    if (this.hasLoad && window["Insites"]){
      let func = window["Insites"].methods[this.hasLoad];
      if (func) func(this.insMarkdownEditorEl);
    }
  }

  render() {
    return (
      <div class={`ins-markdown-editor ins-form-field-wrap ${this.hasError ? 'is-invalid' : ''}`}>
        { this.label || this.tooltip ?
          <label class="ins-form-label">
            {this.label}

            {this.tooltip
              ? <ins-input-tooltip content={this.tooltip}></ins-input-tooltip>
              : ''
            }
          </label>
        : '' }

        <div class="markdown-editor-wrap ins-form-field">
          <textarea name={this.name} class="markdown-editor"></textarea>
          {this.hasError ?
            <div class="ins-form-error">
              {this.errorMessage ? this.errorMessage : `${this.label} field is required`}
            </div>
          : ''}
        </div>
      </div>
    )
  }
}
