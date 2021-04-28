import { h, Component, Element, State, Prop, Method, Event, EventEmitter } from "@stencil/core";
import CodeMirror from "codemirror";

// addons
import "codemirror/addon/search/search";
import "codemirror/addon/display/fullscreen";
import "codemirror/addon/display/autorefresh";

// modes
import "codemirror/mode/css/css";
import "codemirror/mode/htmlembedded/htmlembedded";
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/markdown/markdown";
import "codemirror/mode/python/python";
import "codemirror/mode/vue/vue";
import "codemirror/mode/xml/xml";
import "codemirror/mode/yaml/yaml";

@Component({
	tag: 'ins-code-editor',
	styleUrl: './ins-code-editor.scss'
})

export class InsCodeEditor {
	@Element() insCodeEditorEl: HTMLElement;
	@Event() insBlur: EventEmitter;
	@Event() insInput: EventEmitter;
	@Event() insValueChange: EventEmitter;
	@Event() didLoad: EventEmitter;
  @Prop() hasLoad: string;

	@Prop({ mutable: true }) label: string = "";
	@Prop({ mutable: true }) value: string = "";
	@Prop({ mutable: true }) name: string = "";
	@Prop({ mutable: true }) theme: string = "";
	@Prop({ mutable: true }) mode: string = "htmlmixed";
	@Prop({ mutable: true }) readonly: boolean = false;
	@Prop({ mutable: true }) disableLineNumbers: boolean = false;
	@Prop({ mutable: true }) hasError: boolean = false;
	@Prop({ mutable: true }) errorMessage: string = "";
  @Prop({mutable: true}) tooltip: string = "";

	/*@State()*/ codeMirrorEl: any;
	@State() activeLabel: boolean = false;

	@Method()
	async val() {
		return this.codeMirrorEl.getValue();
	}

	@Method()
	async getValue() {
		return this.codeMirrorEl.getValue();
	}

	@Method()
	async refresh() {
		this.codeMirrorEl.refresh();
	}

	@Method()
	async reset() {
		this.codeMirrorEl.setValue('');
  }

	@Method()
	async setValue(value) {
		this.codeMirrorEl.setValue(value);
    this.insValueChange.emit(this.codeMirrorEl.getValue());
	}

	@Method()
	async beautify() {
    if (this.codeMirrorEl.autoFormatRange){
      this.codeMirrorEl.autoFormatRange(
        { line: 0, ch: 0 },
        { line: this.codeMirrorEl.getValue().split('\n').length, ch: 0 });
    }
		this.codeMirrorEl.setSelection({ line: 1, ch: 0 });
	}

	componentDidLoad() {
    let textarea = this.insCodeEditorEl.querySelector('.codemirror');
    this.codeMirrorEl = CodeMirror.fromTextArea(textarea, {
      autoRefresh: true,
      lineNumbers: !this.disableLineNumbers,
      lineWrapping: true,
      mode: this.mode,
      extraKeys: {
        "Alt-F": "findPersistent",
        "F10": el => {
          el.setOption("fullScreen", !el.getOption("fullScreen"));
        }
      },
      readOnly: this.readonly
    });

    CodeMirror.commands["selectAll"](this.codeMirrorEl);
    this.setEvents();
    this.hideCursor();

    let wrap = this.insCodeEditorEl.querySelector('.CodeMirror-wrap');

    wrap.addEventListener('mouseover', () => {
      wrap.classList.add('fullscreen-help');

      setTimeout(() => {
        wrap.classList.remove('fullscreen-help');
      }, 5000);
    });

    wrap.addEventListener('mouseout', () => {
      wrap.classList.remove('fullscreen-help');
    });

    this.refresh();

    this.didLoad.emit();
    if (this.hasLoad && window["Insites"]){
      let func = window["Insites"].methods[this.hasLoad];
      if (func) func(this.insCodeEditorEl);
    }
	}

	showCursor() {
		let el = this.insCodeEditorEl.querySelector('.CodeMirror-cursor');

		if (el) {
			el.setAttribute("style", "visibility: visible");
		}
	}

	hideCursor() {
		let el = this.insCodeEditorEl.querySelector('.CodeMirror-cursor');

		if (el) {
			el.setAttribute("style", "visibility: hidden");
		}
	}

	setEvents() {
		if (this.theme) {
			this.codeMirrorEl.setOption("theme", this.theme);
		}

		if (this.value) {
			this.codeMirrorEl.setValue(this.value);
		}

		this.codeMirrorEl.on('focus', () => {
			this.showCursor();
			this.activateLabel();
		});

		this.codeMirrorEl.on('change', async () => {
			this.insInput.emit({
				value: await this.val()
			});

      this.insValueChange.emit(this.codeMirrorEl.getValue());
		});

		this.codeMirrorEl.on('blur', async () => {
			this.deactivateLabel();
			this.hideCursor();

			this.insBlur.emit({
				value: await this.val()
			});
		});
	}

	activateLabel() {
		this.activeLabel = true;
	}

	deactivateLabel() {
		this.activeLabel = false;
	}

	render() {
		return (
			<div class="ins-code-editor">
				<div class={(this.hasError ? 'has-error ' : '') + (this.readonly ? 'readonly ' : '') + (this.activeLabel ? 'active' : '')}>

          { this.label || this.tooltip ?
            <label>
              {this.label}

              {this.tooltip
                ? <ins-input-tooltip content={this.tooltip}></ins-input-tooltip>
                : ''
              }
            </label>
          : '' }

					<textarea name={this.name} class="codemirror">
					</textarea>
					<div class="ins-form-error">
						{this.errorMessage}
					</div>
				</div>
			</div>
		)
	}
}
