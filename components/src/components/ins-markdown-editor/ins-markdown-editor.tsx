import { h, Component, Element, Prop, Method, State, Event, EventEmitter } from "@stencil/core";
declare var SimpleMDE;

@Component({ tag: "ins-markdown-editor" })
export class InsMarkdownEditor {
  @Element() insMarkdownEditorEl: HTMLElement;
  @Event() valueChange: EventEmitter;

  @State() editor: any;

  @Prop({ mutable: true }) label: string = "";
  @Prop({ mutable: true }) value: string = "";
  @Prop({ mutable: true }) name: string = "";
  @Prop({ mutable: true }) required: boolean;
  @Prop({ mutable: true }) readonly: boolean;
  @Prop({ mutable: true }) errorMessage: string = "";
  @Prop({ mutable: true }) hasError: boolean;

  @Method()
  val() {
    return this.editor.value();
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
      this.valueChange.emit(this.editor.value());
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
    this.editor = new SimpleMDE({
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
  }

  render() {
    return (
      <div class={`ins-markdown-editor ${this.hasError ? 'is-invalid' : ''}`}>
        <label>{`${this.label}${this.required ? ' *' : ''}`}</label>
        <textarea
          name={this.name}
          class="markdown-editor">
        </textarea>
        {this.hasError ?
          <div class="ins-form-error">
            {this.errorMessage ? this.errorMessage : `${this.label} field is required`}
          </div>
        : ''}
      </div>
    )
  }
}
